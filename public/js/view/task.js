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


   /*=============================================  
    createTask
    
    - Creates new tasks 
  =============================================*/
  createTask: function(event) {

    event.preventDefault(); 
    /*----------  
      Build task object 
    ----------*/    
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
    /*----------  
      - Save individual task model to server
    ----------*/  
    app.model.task.save()
      .done(function(response) {
        console.log("app.model.task: successful save"); 
      })
      .fail(function(response) {
        console.log("app.model.task: failed model save");
      });
    /*----------  
      - Create view for model
    ----------*/   
    app.view.task = new App.View.Task({
      model: app.model.task
    });
    /*----------  
      - Add model to collection 
    ----------*/    
    app.collection.task.add(app.model.task); 
 
  }
  /*=====  End createTask ======*/


}); 


App.View.Task = Backbone.View.extend({

	// tagName: 'section',
	// className: 'openTaskView',

	// template: Handlebars.compile( $('#task-template').html() ),

 //  initialize: function() {

 //    // this.listenTo(this.model, 'change', this.model.save())

 //    this.model.on('change', this.saveData, this);
 //    // console.log("app.view.task: created"); 

 //    this.render();     

 //  },

 //  saveData: function() {
 //    console.log('saving');
 //    this.model.save(); 
 //    this.model.get("open");
 //  },

 //  render: function() {

 //    this.$el.html(this.template(this.model.toJSON()));

 //    if (this.model.toJSON().status == "open") {
 //      $("#open-task-div").append(this.$el);
 //    }
 //    else {
 //      $("#closed-task-div").append(this.$el); 
 //    }

 //  },

 //  events: {
 //    'click #task-header-div': 'toggleDescription',
 //    'click #task-complete' : 'complete'
 //  },

 //  toggleDescription: function(event) {
 //    var target = $( event.target );
 //    target.parent('li').find('.collapsible-body').toggle(); 
 //  },

 //  complete: function(event) {
 //    if (this.model.get("open") === false) {
 //      this.model.set("open", true)
 //      $('#task-complete').html("chat_bubble_outline")
 //      console.log(this.model.get("open"));
 //    }
 //    else  {
 //      this.model.set("open", false);
 //      $('#task-complete').html("done");
 //      console.log(this.model.get("open"));
 //    }

 //  }

})



