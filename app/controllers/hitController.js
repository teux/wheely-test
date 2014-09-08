var locomotive = require('locomotive');
var Controller = locomotive.Controller;
var hitController = new Controller();
var request = require('request');

/**
 * Делает запрос к произвольному урлу и возвращает status code
 */
hitController.create = function () {
    var app = this,
        url = this.param('url');

    request(url, function (error, response, body) {
        app.res.type('application/json');
        app.res.json({ statusCode: !error && response ? response.statusCode : 500 });
    });
};

module.exports = hitController;