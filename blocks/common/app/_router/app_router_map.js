modules.define('router'
    , ['jquery', 'ember', 'q', 'leaflet', 'config']
    , function (provide, $, Ember, Q, leaflet, config, router) {

        router.map = function () {

            // Route
            this.app.MapRoute = Ember.Route.extend({
                setupController: function (controller) {

                    if (controller.get('isLoggedIn')) {
                        Ember.run.scheduleOnce('afterRender', this, function () {

                            Q(leaflet($('#map'))).then(function (map) {
                                controller.set('map', map);

                                // Периодически определять местоположение
                                setInterval(function () {
                                    map.locate({ setView: false });
                                }, config.locationInterval);

                                // Исходное позиционирование карты и обработчики поступления координат
                                map.locate({ setView: true, maxZoom: 13 })
                                    .on('locationfound'
                                        , controller.get('onLocationFound')
                                        , controller)
                                    .on('locationerror'
                                        , controller.get('onLocationError')
                                        , controller);
                            }
                            // TODO не удалось создать карту
                            , function () {});
                        });
                    }
                },
                actions: {
                    willTransition: function () {
                        var map = this.controller.get('map');
                        if ('object' === typeof map) {
                            map.remove();
                            this.controller.set('map', undefined);
                        }
                    }
                }
            });

            // Controller
            this.app.MapController = Ember.Controller.extend({
                needs: ['application'],

                isLoggedIn: Ember.computed.readOnly('controllers.application.isLoggedIn'),
                isConnectionLost: Ember.computed.alias('controllers.application.isConnectionLost'),
                location: Ember.computed.alias('controllers.application.location'),

                map: undefined,
                // Поступившие данные
                data: Ember.computed.readOnly('controllers.application.data'),
                // Маркеры, созданные на основе данных
                markers: {},

                /**
                 * Сохраняет текущую позицию, полученую от leaflet.
                 * @param location
                 */
                onLocationFound: function (location) {
                    this.set('location', {
                        lat: location.latitude,
                        lon: location.longitude
                    });
                },
                /**
                 * Устанавливает в качестве позиции координаты центра карты, а если она
                 * не позиционирована (начальное состояние), - дефолтные координаты.
                 */
                onLocationError: function () {
                    var map = this.get('map'),
                        location;
                    try {
                        location = this.get('map').getCenter();
                        this.set('location', { lat: location.lat, lon: location.lng });
                    } catch (e) {
                        map.setView(config.defaultLocation, map.getZoom() || 11);
                        this.set('location', config.defaultLocation);
                    }
                },
                /**
                 * Отрисовывает данные на карте
                 */
                onData: function() {
                    var map = this.get('map'),
                        markers = this.get('markers'),
                        marker,
                        data;

                    if (!map) return;
                    try {
                        data = JSON.parse(this.get('data'));
                    } catch (e) {
                        data = [];
                    }
                    if (markers) {
                        map.removeLayer(markers);
                    }
                    markers = new L.FeatureGroup();
                    data.forEach(function (item) {
                        marker = L.marker(item, {
                            clickable: false,
                            keyboard: false,
                            title: item.id
                        });
                        markers.addLayer(marker);
                    });
                    map.addLayer(markers);
                    this.set('markers', markers);

                }.observes('data')
            });

            return this;
        };
        provide(router);
        return this;
    });