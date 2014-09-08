modules.define('page', function (provide) {

    provide(klass({
        /**
         * Конструктор
         * @param {String} platform Целевая платформа: desktop, mobile, tablet и т.п.
         * @param {String} page Имя страницы (в данном проекте одна страница - index).
         */
        initialize: function (platform, page) {
            this._platform = platform;
            this._page = page;
        },
        /**
         * Формирует обертку над контентом страницы (теги head, body).
         * Вызывается из метода getBemjson, который уникален для каждой страницы.
         * @returns {Object} BEMJSON
         */
        _getPage: function () {
            return Q({
                block: 'page',
                title: 'Whelly',
                head: [
                    { elem: 'meta', attrs: { name: 'keywords', content: 'whelly' }},
                    { elem: 'meta', attrs: { name: 'description', content: 'Whelly test' }},
                    { elem: 'meta', attrs: {
                        name: 'viewport',
                        content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
                    }}
                ],
                styles: [
                    { elem: 'css', url: 'http://fonts.googleapis.com/css?family=Source+Sans+Pro:400,700|Open+Sans:300italic,400,300,700'},
                    { elem: 'css', url: 'http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.css'},
                    { elem: 'css', url: this._getStaticPath('css')}
                ],
                scripts: [
                    { elem: 'js', url: this._getStaticPath('js')},
                    { elem: 'js', url: '/counter.js'}
                ]
            });
        },
        /**
         * Возвращает путь к статическим файлам css или js.
         * Путь зависит от целевой платформы и запрошенной страницы.
         * @param {String} fileType Тип файла - `css` или `js`
         * @returns {string}
         * @private
         */
        _getStaticPath: function (fileType) {
            return [''
                , this._platform
                , this._page
                , '_' + this._page
            ].join('/') + '.' + fileType;
        }
    }));
});
