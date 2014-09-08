/**
 * js
 * ==
 *
 * Склеивает *js*-файлы по deps'ам, сохраняет в виде `?.js`.
 * Расширяет базовую технологию `js` из пакета `enb`: дополнительно ищет
 * включения `includes()` и меняет относительные пути к файлам от текущей ноды.
 *
 *
 * **Опции**
 *
 * * *String* **target** — Результирующий таргет. По умолчанию — `?.js`.
 * * *String* **filesTarget** — files-таргет, на основе которого получается список исходных файлов
 *   (его предоставляет технология `files`). По умолчанию — `?.files`.
 * * *String* **sourceSuffixes** — суффиксы файлов, по которым строится `files`-таргет. По умолчанию — 'js'.
 *
 * **Пример**
 *
 * ```javascript
 * nodeConfig.addTech(require('enb/techs/js'));
 * ```
 */
var path = require('path');

module.exports = require('enb/techs/js').buildFlow()
    .justJoinFiles(function(filename, data) {
        var fn = this.node.relativePath(filename),
            _this = this;

        data = data.replace(/([^\.]|^)include\(["']([^"']+)["']\);/g, function (s, preChar, url) {
            return preChar + 'include(\''
                + _this.node.relativePath(path.resolve(path.dirname(filename), url))
                + '\');';
        });
        return '/* begin: ' + fn + ' *' + '/\n' + data + '\n/* end: ' + fn + ' *' + '/';
    })
    .createTech();
