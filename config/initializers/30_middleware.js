var express = require('express')
    , poweredBy = require('connect-powered-by');

module.exports = function () {
    // Use middleware.  Standard [Connect](http://www.senchalabs.org/connect/)
    // middleware is built-in, with additional [third-party](https://github.com/senchalabs/connect/wiki)
    // middleware available as separate modules.
    if ('development' == this.env) {
        this.use(express.logger());
    }

    this.use(poweredBy('Andrey Koperskiy teux@teux.ru'));
    this.use(express.favicon());
    this.use(express.bodyParser());
    this.use(express.cookieParser('SECRET'));
    this.use(express.cookieSession());
    this.use(require('csurf')());
    this.use(function(req, res, next) {
        res.cookie('XSRF-TOKEN', req.csrfToken());
        next();
    });
    this.use(express.methodOverride());
    this.use(this.router);
    this.use(express.errorHandler());
}
