modules.define('check-auth'
    , ['cookie', 'config', 'q']
    , function (provide, cookie, config, Q) {

        provide(function (url) {
            var promise,
                xhr;

            try {
                xhr = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (e) {
                try {
                    xhr = new ActiveXObject("Microsoft.XMLHTTP");
                } catch (E) {
                    xhr = false;
                }
            }
            if (!xhr && typeof XMLHttpRequest != 'undefined') {
                xhr = new XMLHttpRequest();
            }

            promise = Q.Promise(function (resolve, reject) {
                xhr.open('POST', config.checkAuth.rootPath, true);
                xhr.setRequestHeader("Content-type", 'application/json');
                xhr.setRequestHeader("Accept", 'application/json');
                xhr.setRequestHeader("x-xsrf-token", cookie.get('XSRF-TOKEN', { raw: true }));
                xhr.onreadystatechange = function () {
                    var statusCode;
                    if (xhr.readyState == 4) {
                        try {
                            statusCode = JSON.parse(xhr.responseText).statusCode;
                        } catch (e) {
                            statusCode = 500;
                        }
                        // 404 или 200 - авторизован, 403 - не авторизован, 500 - прочие ошибки
                        if (statusCode === 403) {
                            reject(new Error('forbidden'));
                        } else {
                            resolve(statusCode);
                        }
                    }
                };
                xhr.send(JSON.stringify({ url: url.replace(/^ws/, 'http') }));
            });

            return promise.timeout(config.checkAuth.timeout, new Error('timeout'));
        });
    });
