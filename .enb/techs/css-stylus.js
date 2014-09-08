/**
 * css-stylus
 * ==========
 *
 * Собирает *css*-файлы вместе со *styl*-файлами по deps'ам, обрабатывает инклуды и ссылки,
 * сохраняет в виде `?.css`. Задействует nib и autoprfixer.
 *
 * **Опции**
 *
 * * *String* **target** — Результирующий таргет. По умолчанию `?.css`.
 * * *Object* **variables** — Дополнительные переменные окружения для `stylus`.
 * * *String* **filesTarget** — files-таргет, на основе которого получается список исходных файлов
 *   (его предоставляет технология `files`). По умолчанию — `?.files`.
 *
 * **Пример**
 *
 * ```javascript
 * nodeConfig.addTech(require('enb-stylus/techs/css-stylus'));
 * ```
 */
var path = require('path');
var Q = require('Q');
var stylus = require('stylus');
var autoprefixer = require('autoprefixer-stylus');
var CssPreprocessor = require('enb/lib/preprocess/css-preprocessor');

module.exports = require('enb/techs/css').buildFlow()
    .name('css-stylus')
    .defineOption('variables')
    .useFileList(['css', 'styl'])
    .builder(function (sourceFiles) {
        var _this = this;
        var defer = Q.defer();

        var css = sourceFiles.map(function (file) {
            var path = file.fullname;
            if (file.name.indexOf('.styl') !== -1) {
                return '/* ' + path + ':begin */\n' +
                    '@import "' + path + '";\n' +
                    '/* ' + path + ':end */\n';
            } else {
                return '@import "' + path + '";';
            }
        }).join('\n');

        var targetName = _this._target;
        var renderer = stylus(css)
            .define('url', stylus.url())
            .use(autoprefixer());

        if (this._variables) {
            var variables = this._variables;
            Object.keys(variables).forEach(function (key) {
                renderer.define(key, variables[key]);
            });
        }

        _this._configureRenderer(renderer)
            .render(function (err, css) {
                if (err) {
                    defer.reject(err);
                } else {
                    defer.resolve(css);
                }
            });

        return defer.promise.then(function (css) {
            return _this._processIncludes(css, _this.node.resolvePath(targetName));
        });
    })
    .methods({
        _configureRenderer: function (renderer) {
            var nib;
            try {
                nib = require('nib');
            } catch (e) {
                throw new Error(
                        'The technology "css-stylus" cannot be executed ' +
                        'because the npm module "nib" was not found.'
                );
            }
            renderer.use(nib());
            return renderer;
        },
        /**
         * Подключает функцию обработки урлов к препроцессору css.
         * Вызывается из базовой технологии `enb/techs/css`
         * @returns {CssPreprocessor}
         * @private
         */
        _getCssPreprocessor: function () {
            var preprocessCss = new CssPreprocessor();
            preprocessCss.setCssRelativeUrlBuilder(function (url, filename) {
                // TODO: замена относительных урлов к изображениям и шрифтам
                return url.replace(/^[./]+/, '/');
            });
            return preprocessCss;
        }
    })
    .createTech();
