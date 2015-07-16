// reference global variable
var app = app || {};

;(function() {
  'use strict';

  app.TodoView = Backbone.View.extend({
    tagName: 'li',

    className: 'task-wrapper',

    initialize: function() {
      this.$toggle = this.$('.toggle');

      this.listenTo(this.model, 'destroy', this.removeTodoView);
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'setVisible', this.togleVisible);
    },

    events: {
      'click .destroy': 'deleteTodo',
      'click .toggle': 'toggleStatus'
    },

    //TODO: render a View from todo-template
    render: function() {
      this.$('.task-title').toggleClass('done', this.model.get('done'));

      //TODO: Handle show/hide todo with filter state
      this.togleVisible();
      
      var todoSource = $('#todo-template').html(),
          todoTemplate = Handlebars.compile(todoSource),
          todoHTML = todoTemplate(this.model.toJSON());
      return this.$el.html(todoHTML);
    },

    //TODO: Handle event when click button destroy
    deleteTodo: function() {
      this.model.destroy();
    },

    //TODO: Remove todoView when have event remove model from collection
    removeTodoView: function() {
      this.remove();
    },

    //TODO: toggle Status
    toggleStatus: function() {
      this.model.save({
        'done': this.model.toggleDone()
      });
    },

    //TODO: Set visible for todo in filter when click button and rrender when todo has change
    togleVisible: function() {
      this.$el.toggleClass('hide', 
        ((app.filterOption === 'active') && (this.model.get('done')))
        || ((app.filterOption === 'completed') && (!this.model.get('done')))
      );
    }
  });
})();