modules.define('router', function(provide) {

    provide({
        init: function (app) {
            this.app = app;
            app.Router.map(function () {
                this.route("login");
                this.route("map");
            });
            app.Router.reopen({ location: 'history' });
            return this;
        }
    })
});
