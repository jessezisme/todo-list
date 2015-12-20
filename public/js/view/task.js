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
    /* -----------
      Create task collection and fetch 
    ------------- */
    app.collection.task = new App.Collection.Task;
    app.collection.task.fetch({
      success: function(resModel, response, options) {
        console.log('app.collection.task.fetch: SUCCESS');
        app.collection.task.forEach(function(taskModel) {
          app.view.task = new App.View.Task({
            model: taskModel
          })
        })
      },
      failure: function(resModel, response, options) {
        console.log(response)
      }
    });

  },

  render: function() {
   	this.$el.html(this.template({}));
   	$('#body-wrap').append(this.$el);  
  },

  events: {    
    'click #star-wrap' : 'toggleStar',
    'click #submit-button' : 'createTask',
    'click label' : 'toggleActive'
  },
  /*----------  
    Click Event:
      - Occassionally, input fields require double-clicks before typing into input field is allowed;
      - This fixes the issue
  ----------*/  
  toggleActive: function(event) {
    $(event.target).parent('div').children('label').addClass("active");
    $(event.target).parent('div').children('textarea').focus();
  },  
  /*----------  
    Click Event:
      - Toggle starring of tasks; changes star color
  ----------*/  
  toggleStar: function() {
    event.preventDefault(); 
    $('#star-wrap i').toggleClass('star-true');  
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
    var taskStar;
      
      if (  $('#star-wrap i').hasClass('star-true')  ) {
        taskStar = true; 
      } 
    /*----------  
      - Create task model
    ----------*/  
    app.model.task = new App.Model.Task({
      user: taskUser,
      title: taskTitle,
      description: taskDesription,
      due: taskDue,
      star: taskStar
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
        app.collection.task.add(app.model.task);         
        app.view.task = new App.View.Task({
          model: app.model.task
        });        

        /*----------  
          Clear form 
        ----------*/
        var taskTitle = $('#task-title-wrap textarea').val("");
        var taskDesription = $('#task-description').val("");
        var taskDue = $('#task-due').val(""); 
        if (  $('#star-wrap i').hasClass('star-true')  ) {
          $('#star-wrap i').removeClass('star-true');
        }     
        /*--------------------*/   
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
    console.log('task rendering');
    console.log(this.model.get('open'));

    this.$el.html(this.template(this.model.toJSON()));    
    /*----------  
      - Before appending to either open or closed DOM section, check task's completion status 
    ----------*/  
    if (this.model.toJSON().open === true) {
      $("#open-task-div").append(this.$el);  
    }
    else {
      $("#closed-task-div").append(this.$el);       
      // $('#task-complete').addClass("icon").addClass("ion-android-checkbox-outline");
    }

      // $("#task-complete").removeClass(); 

      // $('#task-complete').addClass("icon").addClass("ion-android-checkbox-outline-blank");


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
      self.model.set("open", false);
    }
    else  {
      self.model.set("open", true);
    }

    // self.remove();

    // app.view.task = new App.View.Task({
    //   model: self.model
    // });

    this.render(); 

    self.model.save()
      .done(function(response) {
      })
      .fail(function(response) {
      })    

  }

  /*===========*/
})

