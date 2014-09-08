(function() {
    var initTime = Date.now();

    setTimeout(function() {
        // Загрузить бандлы ember, jquery, leaflet
        modules.require(['loader', 'config'], function(loader, config) {
            loader([config.bundle.jquery, config.bundle.ember], 'ember');
            loader(config.bundle.leaflet, 'leaflet');
        });

        modules.require(['app', 'storage'], function(app, storage) {
            storage.fixTime('init-time', initTime);
            app.init();
        });
    }, 0);
}).call(this);
