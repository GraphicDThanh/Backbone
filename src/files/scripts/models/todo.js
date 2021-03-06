// reference global variable
var app = app || {};

;(function() {
  'use strict';
  
  app.Todo = Backbone.Model.extend({
    defaults: {
      'title': '',
      'done': false
    },

    toggleDone: function() {
      return !this.get('done');
    }
  });
})();