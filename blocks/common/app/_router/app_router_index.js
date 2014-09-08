modules.define('router'
    , ['ember', 'q', 'config', 'storage']
    , function (provide, Ember, Q, config, storage, router) {

        router.index = function () {
            // Route
            this.app.IndexRoute = Ember.Route.extend({
                /**
                 * Ждет сокет (открыт или отказ), сохраняет его в контроллере приложения.
                 * Если сокет открыт сохраняет статус авторизации и имя пользователя.
                 */
                setupController: function (controller) {
                    controller.set('_preventTransition', true);

                    config._sockPromise
                        .then(function (socket) {
                            controller.set('socket', socket);
                            controller.set('isLoggedIn', true);
                            controller.set('userName', storage.get('username'));
                            controller.set('password', storage.get('password'));
                            return socket;
                        }
                        , function (socket) {
                            controller.set('socket', socket);
                            return socket;
                        })
                        .finally(function () {
                            // Как только сокет готов (fulfilled) разрешаем переходить на страницу,
                            // но автоматический переход только после паузы, чтобы не мелькал спин
                            controller.set('_preventTransition', false);
                            return Q.delay(storage.getTime('init-time') + config.spinMinTime - Date.now());
                        })
                        .done(function (socket) {
                            if (!controller.get('_preventTransition')) {
                                if (socket.readyState !== socket.OPEN
                                    || controller.get('initialRoute') === 'login') {
                                    controller.transitionToRoute('login');
                                } else {
                                    controller.transitionToRoute('map');
                                }
                            }
                        });
                },
                actions: {
                    willTransition: function (transition) {
                        if (this.controller.get('_preventTransition')) {
                            transition.abort();
                        } else {
                            this.controller.set('_preventTransition', true);
                            $('.preinit').removeClass('active');
                        }
                    }
                }
            });

            // Controller
            this.app.IndexController = Ember.Controller.extend({
                needs: ['application'],
                isLoggedIn: Ember.computed.alias('controllers.application.isLoggedIn'),
                userName: Ember.computed.alias('controllers.application.userName'),
                password: Ember.computed.alias('controllers.application.password'),
                socket: Ember.computed.alias('controllers.application.socket'),
                initialRoute: Ember.computed.readOnly('controllers.application.initialRoute'),
                _preventTransition: false
            });
            return this;
        };
        provide(router);
    });
