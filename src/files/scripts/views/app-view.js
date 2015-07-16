// reference global variable
var app = app || {};

;(function() {
  'use strict';

  app.AppView = Backbone.View.extend({
    el: '.todoapp',

    initialize: function() {
      this.$input = this.$('#new-todo');
      this.$todoList = this.$('#todo-list');
      this.$mainContent = this.$('#main');
      this.$footer = this.$('#footer');
      this.$toogleAll = this.$('#toggle-all');

      //TODO: init event for app
      this.listenTo(app.Todos, 'add', this.appendOneTodo);
      this.listenTo(app.Todos, 'all', this.render);
      this.listenTo(app.Todos, 'reset', this.buildCollection);
      this.listenTo(app.Todos, 'setFilter', this.setFilter);

      app.Todos.fetch({reset: true});
    },

    events: {
      'keypress #new-todo': 'addNewTodo',
      'click #toggle-all': 'toggleAllTodo',
      'click #clear-completed': 'deleteAllDone'
    },

    //TODO: App will render each time Collection have all change
    render: function() {
      //TODO: define done and notDone number and call to function in Todos
      var done = app.Todos.done().length,
          notDone = app.Todos.notDone().length;

      //TODO Define to load footer-template and compile
      var footerHTML,
          footerSource = $('#footer-template').html(),
          footerTemplate = Handlebars.compile(footerSource);

      //TODO: Handle when collection not empty
      if(app.Todos.length) {
        this.$mainContent.show();
        this.$footer.show();

        //TODO: Build footer by template and put counter in
        footerHTML = footerTemplate({
          'notDone': notDone,
          'done': done
        });
        this.$footer.html(footerHTML);

        // TODO: Set style for button filter by link
        $('#filters li a').removeClass('selected')
          .filter('[href="#/' + app.filterOption  + '"]')
          .addClass('selected')

        //TODO: Handle state toggle when check/uncheck all iem
        //NOTE: true with number, false with 0
        if(notDone) {
          this.$toogleAll.prop('checked', '');
        } else {
          this.$toogleAll.prop('checked', 'checked');
        }
      } else {
        this.$mainContent.hide();
        this.$footer.hide();
      }
    },

    //TODO: Handle when user add todo by press key Enter, the Collection create new todo
    addNewTodo: function(events) {
      if(events.which === KEYCODE_ENTER) {
        app.Todos.create({
          'title': this.$input.val(),
          'done': false
        });

        //TODO: return empty value for input
        this.$input.val('');
      }
    },

    //TODO: Event add one todo at same time with Collection create new todo
    appendOneTodo: function(todo) {
      var todoView = new app.TodoView({model: todo});
      this.$todoList.append(todoView.render());
    },

    //TODO: Build the collection which get from localStorage when reload page
    buildCollection: function() {
      //NOTICE: bind this to each function to set context
      app.Todos.each(this.appendOneTodo, this);
    },

    //TODO: Handle event when click #toggle-all check-box
    toggleAllTodo: function() {
      var toggleAllState = this.$toogleAll.is(':checked');

      app.Todos.each(function(todo) {
        //Save todo attr done with toggleAll state
        todo.save({
          'done': toggleAllState
        });
      });
    },

    deleteAllDone: function() {
      _.invoke(app.Todos.done(), 'destroy');
    },

    setFilter: function() {
      app.Todos.each(function(todo) {
        todo.trigger('setVisible');
      });
    }
  });
})();