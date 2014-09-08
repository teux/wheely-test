modules.define('leaflet', ['loader'], function (provide, loader) {

    loader.ready('leaflet', function () {
        /**
         * Инициализирует карту на указанном элементе
         * @param {jQuery} node Дом-нода в jQuery-обертке.
         */
        provide(function (elem) {
            var map;
            if (elem.length) {
                map = L.map(elem[0]);
                L.tileLayer('http://toolserver.org/tiles/hikebike/{z}/{x}/{y}.png', {
                    attribution: 'Map data &copy; <a href="http://toolserver.org">toolserver</a>',
                    maxZoom: 18
                }).addTo(map);
            }
            if (map) {
                return map;
            } else {
                throw new Error();
            }
        });
    });
});
