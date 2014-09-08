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
