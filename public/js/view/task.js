App.View.TaskWindow = Backbone.View.extend({

	tagName: 'section',
  className: 'taskWindowView',
  template: Handlebars.compile( $('#task-window-template').html() ),

  initialize: function() {
  	this.render();

    $('.datepicker').pickadate({
      selectMonths: true, // Creates a dropdown to control month
      selectYears: 15 // Creates a dropdown of 15 years to control year
    });

    $('body .collapsible').collapsible({
      accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
    });

    /* Create task collection and fetch */
    app.collection.task = new App.Collection.Task;
    app.collection.task.fetch({
      success: function(model, response, options) {
        console.log(response);
      },
      failure: function(model, response, options) {
        console.log(response);
      }
    })    

  },

  render: function() {
   	this.$el.html(this.template({}));
   	$('#body-wrap').append(this.$el);  
  },

  events: {
    'click #submit-button' : 'createTask'
  },

  createTask: function(event) {

    event.preventDefault(); 

    var taskUser = Cookies.get('todo');
  	var taskTitle = $('#task-title').val();
  	var taskDesription = $('#task-description').val();
  	var taskDue = $('#task-due').val(); 

    app.model.task = new App.Model.Task({
      user: taskUser,
      title: taskTitle,
      description: taskDesription,
      due: taskDue
    });

    app.model.task.save()
      .done(function(response) {
        app.model.task.set("id", response.serverKey);
      })
      .fail(function(response) {
        console.log(response);
      });

    app.view.task = new App.View.Task({
      model: app.model.task
    }); 

    app.collection.task.add(app.model.task); 

  }

})


App.View.Task = Backbone.View.extend({

	tagName: 'section',
	className: 'openTaskView',

	template: Handlebars.compile( $('#task-template').html() ),

  initialize: function() {
    console.log("app.view.task: created"); 
    this.render(); 
    
    $('.collapsible').collapsible({
      accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
    });


  },

  render: function() {
    this.$el.html(this.template(this.model.toJSON()));

    if (this.model.toJSON().status == "open") {
      $("#open-task-div").append(this.$el);
    }
    else {
      $("#closed-task-div").append(this.$el); 
    }

    


    // if (this.model.toJSON().status == "open") {
    //   $('#body-wrap #open-task').append(this.$el);
    // }
    // else {
    //   $('#body-wrap #closed-task').append(this.$el); 
    // }

  }


})