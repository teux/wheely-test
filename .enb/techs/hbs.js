/**
 * hbs
 * ===
 *
 * Производит шаблоны Handlebars из BEMJSON: транслирует с помощью BH в HTML,
 * компилирует, помещает скомпилированные шаблоны в объект (ключи - имена шаблонов),
 * заворачивает в модуль `hbs`.
 *
 * **Опции**
 *
 * * *String* **filesTarget** — files-таргет, на основе которого получается список исходных файлов
 *   (его предоставляет технология `files`). По умолчанию — `?.files`.
 * * *String* **sourceSuffixes** — суффиксы файлов, по которым строится `files`-таргет.
 *   По умолчанию — 'hbs.js'.
 * * *String* **target** — Результирующий таргет. По умолчанию `?.hbs.js`.
 * * *String* **bhTarget** - Таргет с шаблонизатором и шаблонами BH. По умолчанию `?.bh.js`
 *
 * **Пример**
 *
 * ```javascript
 * [require(config.resolvePath('.enb/techs/js')), {
 *     sourceSuffixes: ['hbs.js'],
 *     target: '?.hbs.js',
 *     bhTarget: '?.bh.js'
 * }]
 * ```
 */
var compiler = require('ember-template-compiler'),
    Vow = require('Vow'),
    fs = require('fs');

function _require(path) {
    var module = {};
    (new Function("module", fs.readFileSync(path, { encoding: 'utf8' })))(module);
    return module.exports;
}
function unescape (str) {
    return str.replace(/&apos;/g, "'")
        .replace(/&quot;/g, '"')
        .replace(/&gt;/g, '>')
        .replace(/&lt;/g, '<')
        .replace(/&amp;/g, '&')
}

module.exports = require('enb/lib/build-flow').create()
    .name('hbs')
    .target('target', '?.hbs.js')
    .useFileList('hbs.js')
    .defineOption('bhTarget', '?.bh.js')
    .needRebuild(function () { return true })     // for development
    .builder(function (hbsFiles) {
        var node = this.node,
            target = node.unmaskTargetName(this._target),
            bhTarget = node.unmaskTargetName(this._bhTarget);

        return node.requireSources([bhTarget])
            .then(function () {
                var BH = require(node.resolvePath(bhTarget));
                return Vow.all(hbsFiles.map(
                    function (file) {
                        return Vow.invoke(_require, file.fullname)
                            .then(function (bemjson) {
                                try {
                                    var name = bemjson.name || 'application'
                                        , html = BH.apply(bemjson.content)
                                        , hbs;

                                    html = html.replace(/data-bind-attr="([^"]+)"/g, function (m, c) {
                                        return !c ? '' : unescape(c);
                                    });
                                    html = html.replace(/data-action="([^"]+)"/g, function (m, c) {
                                        return !c ? '' : unescape(c);
                                    });
                                    hbs = compiler.precompile(html, false);
                                } catch (e) {
                                    throw new Error('Unable to compile Handlebars template "'
                                        + name + '": ' + e.toString());
                                }
                                return { name: name, text: hbs };
                            })
                    }))
                    .then(function (res) {
                        return [''
                            , 'modules.define(\'hbs\', [\'jquery\', \'ember\'], function(provide, $, Ember) {'
                            , 'var init = function () {'
                            , res.map(function (template) {
                                return 'Ember.TEMPLATES[\'' + template.name
                                    + '\'] = Ember.Handlebars.template(' + template.text + ');';
                            }).join('\n\n')
                            ,'};'
                            , 'provide({ init: init });',
                            '});'
                        ].join('\n\n');
                    })
                    .then(function (res) {
                        node.resolveTarget(target);
                        return res;
                    });
            });
    })
    .createTech();
