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
      - Create task collection and fetch;
      - On successful fetch:
          - Create VIEW for each MODEL
          - Cycle through to determine number of closed tasks; used to populate number in "recently completed
            tasks" header/button 
    ------------- */
    app.collection.task = new App.Collection.Task;

    app.collection.task.fetch({
      success: function(resModel, response, options) {
        console.log('app.collection.task.fetch: SUCCESS');
        
        app.collection.task.forEach(function(taskModel) {          
          app.view.task = new App.View.Task({
            model: taskModel
          });
        });
        /*----------  
          Determine number of closed tasks for button/header number on INITIALIZE
        ----------*/
        (function() {
          var openList = app.collection.task.pluck("open");
          var counter = 0; 
          openList.forEach(function(openProp) {
            if (openProp === false) {
              counter += 1; 
            }
          })
          $('#closed-task-header').html("Recently Completed Tasks (" + counter + ")"); 
        })();

      },

      failure: function(resModel, response, options) {
        console.log(response)
      }
    });

    /*----------  
      Determine number of closed tasks for button/header number on CHANGE
    ----------*/
    app.collection.task.on("change:open", function() {
      var openList = app.collection.task.pluck("open");
      var counter = 0; 
      openList.forEach(function(openProp) {
        if (openProp === false) {
          counter += 1; 
        }
      })
      $('#closed-task-header').html("Recently Completed Tasks (" + counter + ")"); 
    }); 
  
 },

  render: function() {
   	this.$el.html(this.template({}));
   	$('#body-wrap').append(this.$el);  
  },

  events: {    
    'click #star-wrap' : 'toggleStar',
    'click #submit-button' : 'createTask',
    'click label' : 'toggleActive',
    'click #closed-task-header' : 'toggleClosedTask'
  },

  toggleClosedTask: function(event) {
    $('#closed-task-div').toggle(); 
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
    
    var taskStar;
      
      if (  $('#star-wrap i').hasClass('star-true')  ) {
        taskStar = true; 
      } 
 


    var taskDue = $('#task-due').val(); 
    taskDue = taskDue.split(" ");

    var day = parseInt(taskDue[0]); 

    // if (day < 10) {
    //   day = day.toString()
    //   day = day.split("");
    //   day.splice(0,0,"0");
    //   day = day.join("");
    // }

    console.log(day); 

    var month = taskDue[1].slice(0, -1); 
    var year = taskDue[2]; 
    switch (month) {
      case "January":
        month = "1";
        break;
      case "February":
        month = "2";
        break;
      case "March":
        month = "3";
        break;
      case "April":
        month = "4";
        break;
      case "May":
        month = "5";
        break;
      case "June":
        month = "6";
        break;
      case "July":
        month = "7";
        break;
      case "August":
        month = "8";
        break;
      case "September":
        month = "9";
        break;
      case "October":
        month = "10";
        break;
      case "November":
        month = "11";
        break;
      case "December":
        month = "12";
        break;
    }

    taskDue = year + "-" + month + "-" + day;
    
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
    var self = this; 
    console.log('task rendering');

    var currentYear = moment().get('year').toString();
    var currentMonth = (moment().get('month')) + 1;
    currentMonth = currentMonth.toString(); 
    var currentDay = moment().get('date');
    var currentDate = moment(currentYear + "-" + currentMonth + "-" + currentDay);
    var dueDate = this.model.get('due');

    var timeUntilDue = currentDate.to(dueDate); 
    this.model.set('untilDue', timeUntilDue )













    this.$el.html(this.template(this.model.toJSON()));    
    /*----------  
      - Before appending to either open or closed DOM section, check task's completion status 
    ----------*/  
    if (this.model.toJSON().open === true) {
      console.log("this")
      $("#open-task-div").append(this.$el);  
    }
    else {
      console.log("that")
      $("#closed-task-div").append(this.$el);       
    }
  },

  events: {    
    'click #extend': 'toggleDescription',    
    'click #task-complete' : 'complete'
  },

  /*=============================================
    CLICK EVENT:
    - Expand task description on click             
  =============================================*/  
  toggleDescription: function(event) {
    var target = $( event.target );
    console.log('click')
    target.parents('li').find('#task-body-div').toggle(250, function() {
      
      if (target.hasClass("ion-arrow-down-b")) {
        target.removeClass();
        target.addClass("icon ion-arrow-up-b")
      }
      else {
        target.removeClass();
        target.addClass("icon ion-arrow-down-b")
      }
    }); 
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

    this.render(); 

    self.model.save()
      .done(function(response) {
      })
      .fail(function(response) {
      })    

  }
  /*===========*/
})

