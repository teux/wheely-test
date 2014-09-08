modules.define('router'
    , ['jquery', 'ember', 'q', 'config', 'storage']
    , function (provide, $, Ember, Q, config, storage, router) {

        router.login = function () {

            // Controller
            this.app.LoginController = Ember.Controller.extend({
                needs: ['application'],

                isLogging: false,
                isLoggingError: false,
                loggingErrorMsg: '',
                isLoggedIn: Ember.computed.alias('controllers.application.isLoggedIn'),
                socket: Ember.computed.alias('controllers.application.socket'),
                userName: Ember.computed.alias('controllers.application.userName'),
                password: Ember.computed.alias('controllers.application.password'),
                isConnectionLost: Ember.computed.alias('controllers.application.isConnectionLost'),
                _userName: Ember.computed.reads('userName'),
                _password: Ember.computed.reads('password'),

                showValidationMsg: false,
                isValid: function () {
                    return !this.get('isWrongUserName') && !this.get('isWrongPassword');
                }.property('isWrongUserName', 'isWrongPassword'),

                isWrongUserName: Ember.computed.notEmpty('userNameMsg'),
                showUserNameMsg: Ember.computed.and('showValidationMsg', 'isWrongUserName'),
                userNameMsg: function () {
                    var userName = $.trim(this.get('_userName'));
                    if (!userName) {
                        return 'No username specified';
                    } else if (userName.length > 20) {
                        return 'Length of 20 characters';
                    } else if (/\s/.test(userName)) {
                        return 'There should be no spaces';
                    } else if (userName.replace(/[\w\d_]/g, '').length) {
                        return 'Only letters, numbers and _ is allowed'
                    }
                }.property('_userName'),

                isWrongPassword: Ember.computed.notEmpty('passwordMsg'),
                showPasswordMsg: Ember.computed.and('showValidationMsg', 'isWrongPassword'),
                passwordMsg: function () {
                    var password = $.trim(this.get('_password'));
                    if (!password) {
                        return 'No password specified';
                    } else if (password.length > 20) {
                        return 'Length of 20 characters';
                    } else if (/\s/.test(password)) {
                        return 'There should be no spaces';
                    }
                }.property('_password'),

                actions: {
                    disconnect: function () {
                        this.get('socket').close();
                        this.set('isLoggedIn', false);
                        this.set('isConnectionLost', false);
                        storage.set('username', '');
                        storage.set('password', '');
                    },
                    connect: function () {
                        var controller = this;

                        this.set('isLoggingError', false);
                        this.set('loggingErrorMsg', '');

                        if (this.get('isValid')) {
                            this.set('isLogging', true);
                            this.set('showValidationMsg', false);
                            this.get('socket')
                                .open(config.websocket.url({
                                    username: this.get('_userName'),
                                    password: this.get('_password')
                                }))
                                .fin(function () {
                                    controller.set('isLogging', false);
                                })
                                .then(function () {
                                    var username = controller.get('_userName'),
                                        password = controller.get('_password')
                                    storage.set('username', username);
                                    storage.set('password', password);
                                    controller.set('userName', username);
                                    controller.set('password', password);
                                    controller.set('isLoggedIn', true);
                                    controller.transitionToRoute('map');
                                }
                                , function (socket) {
                                    controller.set('loggingErrorMsg', socket.error.message === 'forbidden' ?
                                        'The username or password you entered is incorrect. ' +
                                        'Check to make sure your Caps Lock is off, ' +
                                        'and that you are using the correct username and password.'
                                        : 'Unable to connect to the server. Please try again later.'
                                    );
                                    controller.set('isLoggingError', true);
                                });
                        } else {
                            this.set('showValidationMsg', true);
                        }
                    }
                }
            });
            return this;
        };
        provide(router);
        return this;
    });
