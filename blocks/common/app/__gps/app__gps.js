modules.define('gps', ['q', 'config'], function (provide, Q, config) {

    /**
     * Возвращает предустановленные кооринаты.
     * TODO: Вместо этого можно делать запрос к геолокационному сервису,
     * TODO: чтобы определять примерное положение по IP подсети.
     * @returns {{lat: number, lon: number}}
     */
    function fallback () {
        return { lat: 55.373703, lon: 37.474764 };
    }

    provide({
        getPos: function () {
            var defer = Q.defer();
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (pos) {
                    if (pos.coords.latitude && pos.coords.longitude) {
                        defer.resolve({
                            lat: pos.coords.latitude,
                            lon: pos.coords.longitude
                        })
                    } else {
                        defer.reject();
                    }
                });
            } else {
                defer.reject();
            }
            return defer.promise.timeout(config.gpsTimeout)
                .fail(function (e) {
                    return fallback();
                })
                .then(function (pos) {
                    return JSON.stringify(pos);
                });
        }
    });
});
