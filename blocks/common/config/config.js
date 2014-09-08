modules.define('config', function(provide){
    provide({
        // Интервал времени от завершения до нового старта приложения
        // который не считается разлогиниванием. Считается, что при таком
        // быстром перезапуске пользователь просто обновил страницу.
        refreshTimeout: 5000,

        // Минимальное время от начала инициализации до запуска приложения.
        // В течение этого времени показывается спин. Если выключить его
        // быстрее, возникает мелькание.
        spinMinTime: 2000,

        // Интервал повторения запросов на определение местоположения
        // С каждым определнием происходит отправка координат на сервер
        locationInterval: 20000,

        // Максимальное время ожидания очередного сообщения от сервера.
        heartBitInterval: 10000,

        // Дефолтное местоположение
        defaultLocation: [55.755768, 37.617671],

        // Пути к бандлам
        bundle: {
            ember: '/bundle/_ember.js',
            jquery: '/bundle/_jquery.2.1.1.js',
            websocket: '/bundle/_websocket.js',
            websocketSwf: '/bundle/WebSocketMain.swf',
            leaflet: 'http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.js'
        },

        // Параметры вебсокетов
        websocket: {
            server: "ws://mini-mdt.wheely.com:80",
            timeout: 5000,
            attemptDelay: 1000,
            /**
             * Возвращает url ws-сервера.
             * @param {Object} query Параметры запроса.
             * @returns {String} URL.
             */
            url: function url(query) {
                var sign = ~this.server.indexOf('?') ? '&' : '?';
                query = Object.keys(query).map(function(arg) {
                    return arg + '=' + query[arg]
                }).join('&');
                return [this.server, query].join(sign);
            }
        },

        // Параметры провеки авторизации
        checkAuth: {
            rootPath: '/hit',
            timeout: 1000
        }
    });
});
