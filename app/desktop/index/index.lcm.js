/* begin: ../../../blocks/common/page/__init/page__init.lcm.js */
var modules = require('ym');
var klass = require('klass');
var Q = require('q');

/* end: ../../../blocks/common/page/__init/page__init.lcm.js */
/* begin: ../../../blocks/common/page/__controller/page__controller.lcm.js */
/**
 * Контроллер страницы. Выполняется в контексте приложения locomotive (express).
 */
module.exports = function (platform, page) {
    var renderer = this.render.bind(this, [platform, page, page].join('/'));

    modules.require('page', function (Page) {
        new Page(platform, page)
            .getBemjson()
            .done(renderer);
    });
};

/* end: ../../../blocks/common/page/__controller/page__controller.lcm.js */
/* begin: ../../../blocks/common/page/page.lcm.js */
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

/* end: ../../../blocks/common/page/page.lcm.js */
/* begin: ../../../blocks/common/page/_type/page_type_index.lcm.js */
modules.define('page', function (provide, Page) {

    provide(Page.extend({
        /**
         * Формирует контент страницы и возвращает BEMJSON через промис.
         * Промис дает возможность накидать контент асинхронно, например
         * сделать запрос и от полученных данных сформировать контент
         * (хотя для Ember это идеологически не верный способ, но могут
         * быть задачи авторизации и др.).
         * @returns {Promise}
         */
        'getBemjson': function () {
            return this._getPage()
                .then(function (page) {
                    page.content = [
                        { block: 'loader', cls: 'preinit', vars: 'large active' },
                        { block: 'bgimage', mods: { type: 'nice' }}
                    ];
                    return page;
                })
                .then(function (page) {
                    return { bemjson: page };
                });
        }
    }));
});

/* end: ../../../blocks/common/page/_type/page_type_index.lcm.js */