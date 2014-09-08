/**
 * enb-automake
 * ============
 *
 * Собирает страницы проекта по запросу из express. Подключается
 * как middleware и запускается перед обработкой каждого запроса.
 *
 * Предназначен для DEVELOPMENT режима, чтобы подхватывать изменения
 * кода без ручной пересборки проекта.
 */
var path = require('path');
var VowFs = require('vow-fs');
var MakePlatform = require('enb/lib/make');
var dropRequireCache = require('enb/lib/fs/drop-require-cache');

module.exports.createMiddleware = function(routes) {
    routes = routes || {};
    return function(req, res, next) {
        var targets = routes[this.route] || [],
            dt = new Date(),
            makePlatform;

        if (targets.length) {
            makePlatform = new MakePlatform();
            makePlatform.init(process.cwd()).then(function () {
                makePlatform.loadCache();
                makePlatform.buildTargets(targets).then(function () {
                    makePlatform.saveCache();
                    makePlatform.destruct();
                    _dropRequireCache(targets);
                    console.log('----- build in ' + (new Date() - dt) + 'ms');
                    next();
                },
                next);
            });
        } else {
            next();
        }
    }
};

function _dropRequireCache(targets) {
    var cwd = process.cwd();

    targets.map(function(relPath) {
        var dir = path.join(cwd, relPath);

        VowFs.listDir(dir)
            .then(function (files) {
                files.map(function(file) {
                    var key = path.join(dir, file);
                    dropRequireCache(require, key);
                });
            });
    })
}
