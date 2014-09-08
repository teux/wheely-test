modules.define('websocket'
    , ['config', 'check-auth', 'q', 'config']
    , function (provide, config, checkAuth, Q, config, WebSocket) {

        /**
         * Конструкутор обертки над сокетом. Создает сокет и подключает обработчики.
         * Вместо обертки возвращается промис, заполняемый оберткой в будущем.
         *
         * @param {String} url Адрес ws-сервера.
         * @returns {Promise} Промис, который заполняется по готовности сокета
         *   или отвергается при невозможности соединения.
         * @constructor
         */
        function WS(url) {
            if (!(this instanceof WS)) return new WS(url);

            this._timeout = config.websocket.timeout;
            this._attemptDelay = config.websocket.attemptDelay;
            this._attemptId = 0;
            this._payload = undefined;
            this._socket = undefined;
            this._defer = undefined;
            this._timer = undefined;
            this.error = undefined;
            this.readyState = undefined;
            return this._open(url);
        }
        WS.prototype = {
            CONNECTING: 0,
            OPEN: 1,
            CLOSING: 2,
            CLOSED: 3,
            /**
             * Открывает соединение с указанным урлом. Если запрошенный URL
             * открыт, возвращает промис с текущей оберткой.
             * @param {String} url URL ws-сервера.
             * @returns {Promise}
             */
            open: function (url) {
                return this._url === url && this.readyState <= this.OPEN ?
                    Q.resolve(this)
                    : this._open(url);
            },
            /**
             * Останавливает попытки соединения, закрывает сокет, уведомляет
             * внешний код через событие и через промис.
             * @param {Error} [e] Причина закрытия.
             * @private
             */
            close: function (e) {
                if (this.readyState === this.CLOSED) return;

                this.readyState = this.CLOSED;
                clearTimeout(this._timer);
                this._closeSocket();

                if (e instanceof Error) {
                    this.error = e;
                    this._propogate('onerror', e);
                }
                this._propogate('onclose', 'close');
                if (this._defer) {
                    this._defer.reject(this);
                }
            },
            /**
             * Отправляет данные. Если сокет закрыт,
             * кеширует данные и переоткрывает сокет.
             * @param {*} data Произвольные данные.
             */
            send: function (data) {
                if (this.readyState === this.OPEN) {
                    this._socket.send(data);
                } else {
                    this._payload = data;
                    if (this.readyState !== this.CONNECTING) {
                        this._open(this._url);
                    }
                }
            },
            /**
             * Обработчик готовности сокета. Заполняет промис
             * и отправляет кешированные данные.
             * @param e
             * @private
             * @event
             */
            _onopen: function (e) {
                this.readyState = this.OPEN;
                if (this._payload) {
                    this.send(this._payload);
                    this._payload = undefined;
                }
                this._propogate('onopen', e);
                this._defer.resolve(this);
                clearTimeout(this._timer);
            },
            /**
             * Поддерживает открытый сокет. Делает паузу между попытками подключения.
             * Проверяет авторизацию после первой неудачной попытки. При отказе
             * в авторизации закрывает сокет.
             * @event
             */
            _onclose: function () {
                // Различаются два случая: неудачная попытка подключения
                // и потеря связи после успешного подключения. Во втором
                // случае таймер заводится вновь.
                if (this.readyState === this.OPEN) {
                    this._setTimer();
                }
                var auth = this._attemptId++ ?
                    Q.delay(this._attemptDelay) // не первая попытка подключения
                    : checkAuth(this._url);     // первая попытка - поверить авторизацию

                auth.done(this._openSocket.bind(this), this.close.bind(this));
            },
            /**
             * Проксирует события `onmessage` от сокета во внешний код.
             * @param e
             * @event
             */
            _onmessage: function (e) {
                this._propogate('onmessage', e);
            },
            /**
             * Ничего не делает, поскольку ошибки обрабатываются в `onclose`.
             * @event
             */
            _onerror: function (e) {
                if ('development' === config.env) {
                    console.log('Socket error:');
                    console.log(e);
                }
            },
            /**
             * Завтоди таймер, который по истечению срока закрывает сокет с ошибкой.
             * @private
             */
            _setTimer: function() {
                this._attemptId = 0;
                clearTimeout(this._timer);
                this._timer = setTimeout(function () {
                    this.close(new Error('timeout'));
                }.bind(this), this._timeout);
            },
            /**
             * Открывает сокет по требованию внешнего кода.
             * @param {String} url URL ws-сервера.
             * @returns {Promise} Промис, заполняемый по готовности сокета, отвергаемый
             *   по ошибкам и по таймауту. Заполняется ссылкой на текущий объект-обертку.
             * @private
             */
            _open: function (url) {
                this.readyState = this.CONNECTING;
                this._url = url;
                if (this._defer) {
                    this._defer.reject(this);
                }
                this._defer = Q.defer();
                this._setTimer();
                this._openSocket();
                return this._defer.promise;
            },
            /**
             * Создает сокет, подключает обработчики. Вызывается из `_open`
             * и может многократно вызываться для восстановления подключение.
             * При первой попытке заводит таймер.
             * @private
             */
            _openSocket: function () {
                if (this.readyState === this.CLOSED) return;
                this._closeSocket();
                this.readyState = this.CONNECTING;
                try {
                    this._socket = new WebSocket(this._url);
                    this._handlers(true);
                } catch (e) {
                    this.close(e);
                }
            },
            /**
             * Закрывает сокет, отключает обработчики.
             * @private
             */
            _closeSocket: function () {
                if (this._socket) {
                    this._handlers(false);
                    this._socket.close();
                }
            },
            /**
             * Подключает/отключает обработчики на сокете.
             * @param {Boolean} act Значении true - подключить, false - отключить.
             */
            _handlers: function (act) {
                var hrs = ['onopen', 'onmessage', 'onerror', 'onclose'];
                hrs.forEach(function (name) {
                    this._socket[name] = act ?
                        this['_' + name].bind(this)
                        : undefined;
                }, this);
            },
            /**
             * Вызывает обработчик, назначенный внешним кодом.
             * @param {String} name Имя обработчика.
             * @param {*} data Данные для обработчика.
             * @private
             */
            _propogate: function (name, data) {
                if ('function' === typeof this[name]) {
                    this[name].call(this, data);
                }
            }
        };
        provide(WS);
    });
