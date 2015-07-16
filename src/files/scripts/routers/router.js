// reference global variable
var app = app || {};

;(function() {
  'use strict';

  var TodoRouter = Backbone.Router.extend({
    routes: {
      '*filterType': 'setFilter'
    },

    setFilter: function(filterType) {
      //TODO: Get filter by global variable app
      app.filterOption = filterType || '';
    
      //TODO: Trigger setFilter from appView for Todos collection
      app.Todos.trigger('setFilter');
    }
  });

  app.todoRouter = new TodoRouter();
  Backbone.history.start();
})();
