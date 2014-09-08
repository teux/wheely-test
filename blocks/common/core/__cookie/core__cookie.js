modules.define('cookie', function(provide, cookie){
    var Jar = require('jar').Jar;
    provide(new Jar());
});
