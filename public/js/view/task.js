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
     CREATE NEW TASKS 
  =============================================*/
  createTask: function(event) {

    event.preventDefault(); 
    /*----------  
      Build task object 
    ----------*/    
    var taskUser = Cookies.get('todo');
  	var taskTitle = $('#task-title-wrap textarea').val();
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
    app.model.task.save({}, {wait: true})
      .done(function(response) {
        console.log(response); 
        console.log("app.model.task: successful save"); 

        /*----------  
          Only if model is successfully saved to server:
          - Create view for model; & 
          - Add to collection 
        ----------*/         
        app.view.task = new App.View.Task({
          model: app.model.task
        });        
        app.collection.task.add(app.model.task); 
      })      
        /*--------------------*/        
      .fail(function(response) {
        alert("error saving task");
      });
    /*--------------------*/ 
  }
  /*=============*/

}); 


App.View.Task = Backbone.View.extend({

	tagName: 'section',
	className: 'taskView',
	template: Handlebars.compile( $('#task-template').html() ),

  initialize: function() {

    this.render(); 

  },

  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    /*----------  
      - Before appending to either open or closed DOM section, check task's completion status 
    ----------*/
    if (this.model.toJSON().open === true) {
      $('#task-complete').html("chat_bubble_outline")
      $("#open-task-div").append(this.$el);

    }
    else {      
      $('#task-complete').html("done");
      $("#closed-task-div").append(this.$el); 
    }

  },

  events: {    
    'click #task-header-div': 'toggleDescription',    
    'click #task-complete' : 'complete'
  },

  /*=============================================
    CLICK EVENT:
    - Expand task description on click             
  =============================================*/  
  toggleDescription: function(event) {
    var target = $( event.target );
    target.parent('li').find('.collapsible-body').toggle(); 
  },
  /*===========*/  
  /*=============================================
    CLICK EVENT: 
    - Toggle completion status (i.e. open/close)
    - Save to Server
    - Re-render         
  =============================================*/
  complete: function(event) {
    var self = this; 

    if (this.model.get("open") === true) {

      this.model.set("open", false);
      console.log(this.model.get("open"));

      this.model.save({}, {wait:true})
        .done(function(response) { 
          self.render();
         })
        .fail(function(response) {
          alert("error saving task");
          this.model.set("open", true)
        });      
    }
    else  {
      this.model.set("open", true);
      console.log(this.model.get("open"));

      this.model.save({}, {wait:true})
        .done(function(response) { 
          self.render();
         })
        .fail(function(response) {
          alert("error saving task");
          this.model.set("open", false)
        });   
    }
  }
  /*===========*/
})

