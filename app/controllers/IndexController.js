var locomotive = require('locomotive');
var Controller = locomotive.Controller;
var indexController = new Controller();

indexController.main = function () {
    //TODO: Выяснение целевой платформы по UA
    var platform = 'desktop',
        page = this.param('page') || '',
        controllerPath,
        errorCode;

    if (~['', 'map', 'login'].indexOf(page)) {
        page = 'index';
    }
    controllerPath = ['..', platform, page, page + '.lcm.js'].join('/');
    try {
        require(controllerPath);
    } catch (e) {
        errorCode = 'MODULE_NOT_FOUND' === e.code ? 404 : 500;
    }
    if (!errorCode) {
        require(controllerPath).call(this, platform, page);
    } else if (errorCode === 404){
        this.redirect('/');
    } else {
        //TODO: 500
    }
};

module.exports = indexController;
