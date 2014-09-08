modules.define('ember', ['jquery'], function(provide, jQuery){
    include('../../../../lib/handlebars-runtime/index.js');
    this.global.Handlebars = Handlebars;
    include('../../../../lib/ember/ember.js');
    //include('../../../../lib/ember-data/ember-data.js');
    provide(Ember);
});
