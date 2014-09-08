/**
 * Запускает шаблонизатор BH из express-приложения. Реализует API,
 * через который express вызывает шаблонизаторы. Подключение к express:
 *
 *   this.engine('js', require(__dirname + '/../../lib/express-bh').__express);
 *
 * @param {String} path Путь к файлу с расширением html.js. Файл содержит
 *   исполняемый код шаблонизатора и шаблоны (создается автоматически
 *   во время сборки проекта).
 * @param {Object} options Объект с ключем `bemjson`.
 * @param {Function} fn Келбек (см. API express).
 * @private
 */
exports.__express = function(path, options, fn){
    if ('function' == typeof options) {
        fn = options;
        options = {};
    }
    try {
        fn(null, require(path).apply(options.bemjson));
    } catch (err) {
        fn(err);
    }
};
