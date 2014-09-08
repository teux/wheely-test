modules.define('app'
    , ['loader', 'config', 'storage', 'websocket']
    , function (provide, loader, config, storage, WebSocket) {
        provide({
            init: function () {
                var isRefresh = storage.getTime('stop-time') + config.refreshTimeout > Date.now(),
                    query = {
                        username: storage.get('username'),
                        password: storage.get('password')
                    };

                // Открыть сокет пока грузятся бандлы или создать пустой сокет,
                // если пользователь не был авторизован или разорвал соединение
                config._sockPromise = isRefresh && query.username && query.password ?
                    new WebSocket(config.websocket.url(query))
                    : new WebSocket();

                loader.ready('ember', function () {
                    modules.require(['ember', 'hbs', 'router']
                        , function (Ember, hbs, router) {

                            var isDev = config.env === 'development',
                                options = {
                                    LOG_TRANSITIONS: isDev,
                                    LOG_BINDINGS: isDev,
                                    LOG_VERSION: isDev
                                };

                            hbs.init();
                            router.init(Ember.Application.create(options))
                                .application()
                                .index()
                                .login()
                                .map();
                        });
                });
            }
        });
    }
);
