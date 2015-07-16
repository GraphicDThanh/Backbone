// reference global variable
var app = app || {};

;(function() {
  'use strict';
  
  var Todos = Backbone.Collection.extend({
    model: app.Todo,

    'url': '/collection',

    localStorage: new Backbone.LocalStorage('Todos'),

    //TODO: Return a collection which contain todo done
    done: function() {
      return this.filter(function(todo) {
        return todo.get('done');
      });
    },

    //TODO: Return a collection which contain todo not done
    notDone: function() {
      return this.filter(function(todo) {
        return !todo.get('done');
      });
    }
  });

  app.Todos = new Todos();
})();