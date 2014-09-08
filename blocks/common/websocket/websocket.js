modules.define('websocket'
        , ['loader', 'config']
        , function(provide, loader, params) {

    if ('function' === typeof WebSocket) {
        provide(WebSocket);
    } else if ('function' === typeof MozWebSocket) {
        provide(MozWebSocket);
    } else {
        loader(params.bundle.websocket, function () {
            WEB_SOCKET_SWF_LOCATION = params.bundle.websocketSwf;
            provide(WebSocket);
        })
    }
});
