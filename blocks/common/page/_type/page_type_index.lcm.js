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
