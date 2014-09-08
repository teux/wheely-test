modules.define('router'
    , ['jquery', 'ember', 'config', 'storage']
    , function (provide, $, Ember, config, storage, router) {

        router.application = function () {
            // Route
            this.app.ApplicationRoute = Ember.Route.extend({
                setupController: function (controller, model, e) {
                    if (!controller.get('initialRoute')) {
                        controller.set('initialRoute', e.targetName);
                    }
                    this.transitionTo('index');

                    // Сохранить время завершения приложения
                    $(window).unload(function () {
                        controller.get('socket').close();
                        storage.fixTime('stop-time');
                    });
                }
            });
            // Controller
            this.app.ApplicationController = Ember.Controller.extend({

                isLoggedIn: false,
                isConnectionLost: false,
                userName: undefined,
                password: undefined,
                location: undefined,
                socket: undefined,
                data: undefined,

                /**
                 * Подключает обработчики к сокету
                 */
                socketHandlers: function () {
                    var socket = this.get('socket');

                    /**
                     * Отправляет координаты при установке соединения.
                     * @event
                     */
                    socket.onopen = function () {
                        this.set('isConnectionLost', false);
                        this.get('sendLocation').call(this);
                    }.bind(this);

                    /**
                     * Принимает данные и реализует проверку соединения
                     * @event
                     */
                    socket.onmessage = function (e) {
                        this.set('data', e.data);
                        this.set('isConnectionLost', false);
                        clearTimeout(this.get('_timer'));
                        this.set('_timer', setTimeout(function() {
                                this.set('isConnectionLost', true)
                            }.bind(this)
                            , config.heartBitInterval)
                        );
                    }.bind(this);
                }.observes('socket'),

                /**
                 * Посылает координаты на сервер при периодическом поступлении из контроллера `map`.
                 */
                sendLocation: function () {
                    var location = JSON.stringify(this.get('location'));
                    if (location && this.get('isLoggedIn')) {
                        this.get('socket').send(location);
                    }
                }.observes('location')
            });
            return this;
        };
        provide(router);
    });
