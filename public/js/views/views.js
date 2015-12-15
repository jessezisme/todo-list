App.Views       || (App.Views       = {});

var app = app || {};
app.views  = app.views || {};




App.Views.Login = Backbone.View.extend({

  tagName: 'section',
  className: 'login-view',
  template: Handlebars.compile( $('#login-template').html() ),

  initialize: function() {
    this.render(); 
  },

  render: function() {
    this.$el.html(this.template({}));
    $('#body-wrap').html('').append(this.$el);  
  },

  events: {
    'click button' : 'submitForm'
  },

  submitForm: function(event) {
    event.preventDefault();    
    var loginData = {
      username: $('#username').val(),
      password: $('#password').val()
    };

    console.log(JSON.stringify(loginData));

    $.ajax({
      url: "/login",
      data: loginData,
      type: "POST"
    });

  } 

})




// var GUI = (function(){ //IIFE for all Views

// // app.users = [ {name: "TEST", password: "TEST"} ];


// //Code for AddTaskView
// var AddTaskView = Backbone.View.extend({
//     className: 'addtaskview',

//     initialize: function() {
//       this.render();
//     },
//     render: function() {
//       var $addtask = $('<input id="addtask" type="text" placeholder="add task"></input>');
//       var $descriptionInput = $('<textarea id="descriptionInput" placeholder="add description"> </textarea>');
//       var $timeIcon = $('<div id="datepickerIcon"> </div>').html('<i class="fa fa-calendar"></i>   <input id="datepicker" placeholder="enter date"></input>');
//       var $priority = $('<div id="priority"> </div>').html('<i class="fa fa-star"></i>');
//       var $tag = $('<div id="tag"> </div>').html('<i class="fa fa-folder-o"></i>');
//       var $submitTask = $('<div id="submitTask"> </div>').html('<i class="fa fa-check"></i>');
//       var $discard = $('<div id="discard"> </div>').html('<i class="fa fa-undo">');
//       this.$el.append($addtask, $descriptionInput, $timeIcon, $priority, $tag, $submitTask, $discard);
//     },
//     events: {
//       'click #datepicker': 'calendar'

//     },
//     calendar: function() {
//       // $('#datepicker').trigger('click');
//       $('#datepicker').datepicker();
//       $('#datepicker').datepicker('show');


//       // $('#ui-datepicker-div').css({
//       //   "position": "absolute",
//       //   "top": "191.75px",
//       //   "left": "57.05px",
//       //   "z-index": "1"
//       // });
//     },
//     addTask: function(event) {
//       event.preventDefault();





//       var task = {
//         title: this.$el.find('#addtask').val(),
//         description: this.$el.find('#descriptionInput').val(),
//       };


//     }







//     // render: function(){
//     //   var $form = $('<form>');
//     //   var $title = $('<input type="text" name="title" id="title" placeholder="task title">');
//     //   var $description = $('<input type="text" name="description" id="description" placeholder="task description">');
//     //   var $dueDate = $('<input type="text" name="dueDate" id="dueDate" placeholder="task due date">');
//     //   var $importance = $('<input type="text" name="importance" id="importance" placeholder="importance">');
//     //   var $submit = $('<button id="submit">Submit</button>');
//     //   $form.append([$dueDate, $title, $description, $importance, $submit] );
//     //   this.$el.html($form);
//     // },
//     //
//     // initialize: function(){
//     //   $('#app').addClass('faded');
//     //   this.render();
//     //   $('#app').append(this.$el);
//     // },
//     //
//     // events: {
//     //   'click #submit' : 'addTask'
//     // },
//     //
//     // addTask : function(event) {
//     //   event.preventDefault();
//     //   var task = {
//     //     title : this.$el.find('#title').val(),
//     //     description : this.$el.find('#description').val(),
//     //     dueDate: this.$el.find('#dueDate').val(),
//     //     importance: this.$el.find('#importance').val(),
//     //     creator : app.currentUser
//     //   };
//     //   app.tasks.create( task );
//     //   AssignedTasksView.render();
//     //   console.log('task length is now ',app.tasks.length);
//     //   this.remove();
//     //   $('#app').removeClass('faded');
//     // },
//   });





// //Code for AssignedTaskView

//   // var AssignedTasksView = Backbone.View.extend({
//   //   tagName: 'div',
//   //   className: 'AssignedTasksView column',
//   //
//   //   render: function () {
//   //     // var usernames = UserModel.model.get("value");
//   //     this.$el.html('<h1>Assigned Tasks</h1>');
//   //
//   //     for(var i = 0; i < app.tasks.length; i++){
//   //       if(app.tasks.at(i).get('assignee') && app.tasks.at(i).get('assignee') !== app.currentUser){
//   //         var viewB = new TaskView({model: app.tasks.at(i)});
//   //         this.$el.append(viewB.$el);
//   //       }
//   //   }
//   //
//   //   },
//   //   initialize: function () {
//   //     this.listenTo(app.tasks, 'change', this.render);
//   //     this.listenTo(app.tasks, 'update', this.render);
//   //     app.tasks.fetch();
//   //   },
//   //   events : {
//   //   },
//   // });

// //End Code for Assigned TaskView



// //Code for UserTaskView////////////////////////////
//   // var UserTasksView = Backbone.View.extend({
//   //   tagName: 'div',
//   // 	className: 'UserTasksView column',
//   //
//   // 	render: function () {
// 	// 		var usernames = UserModel.model.get("value");
// 	// 		this.$el.html('<h1>My Tasks</h1>');
//   //
//   //     for(var i = 0; i < app.tasks.length; i++){
//   //       if(app.tasks.at(i).get('assignee') == app.currentUser){
//   //         var viewB = new TaskView({model: app.tasks.at(i)});
//   //         this.$el.append(viewB.$el);
//   //       }
//   //   }
//   //
//   // 	},
//   // 	initialize: function () {
//   //     this.listenTo(app.tasks, 'change', this.render);
//   //     this.listenTo(app.tasks, 'update', this.render);
//   //     app.tasks.fetch();
//   // 	},
//   // 	events : {
//   // 	},
//   // });
// //End Code for UserTaskView///////////////////////////




// //Code for UserView//////////////////////////
//   var UserView = Backbone.View.extend({
//     id : 'UserView',
//     initialize: function () {
//       this.render();
//     },
//   	render: function() {
//       if ( Cookies.get('todoUserName') ) {
//         var addTaskView = new AddTaskView();
//         this.$el.append(addTaskView.$el);
//         $('#app').html(this.$el);
//       }
//       else {
//         var loginView = new LoginView();
//       }
// 	  },
//     events: {
//     },
//     newTask: function () {
//       // var addTask = new AddTaskView();
//       // addTask.render();
//       // this.$el.append(addTask.$el);
//     },
//   	logout: function() {
//       // $('#app').html('');
//   		// app.gui.switchToLogin();
//   	}
// });
// //End Code for UserView///////////////////////


// //LoginView
// var LoginView = Backbone.View.extend({
//   id: 'LoginView',
// 	initialize: function() {
//     this.render();
// 	},
// 	render: function() {
//     var $loginForm = $('<form id="login-form">');
//     var $loginUser = $('<input id="login-name" type="text" placeholder="test">  </input>');
//     var $loginPassword = $('<input id="login-password" type="password" placeholder="password">  </input>');
//     var $loginSubmit = $('<input type="submit" id="login-submit" value="submit">');
//     $loginForm.append($loginUser,$loginPassword,$loginSubmit);
//     this.$el.append($loginForm);
//     $('#app').html(this.$el);
// 	},
// 	events: {
//     'submit #login-form' : 'login'
// 	},
// 	login: function(event) {
//     event.preventDefault();
//     var userName = $('#login-name').val().toUpperCase();
//     var userPassword = $('#login-password').val().toUpperCase();
//     var user = {
//       name: userName,
//       password: userPassword
//     };
//     $.ajax({
//       method: "PUT",
//       url: "/login",
//       data: user
//     })
//     .done(function(tasks) {
//       if (tasks == "incorrect password") {
//         alert("incorrect password");
//       }
//       else if (tasks == "no record of user") {
//         alert("no record of user");
//       }
//       else {
//         Cookies.set('todoUserName', userName);
//         var userView = new UserView();
//       }
//     });
// 	}
// });


// //GUI
// function GUI(users,tasks,el) {
//   var userView = new UserView();
// }
//   return GUI;
// }());
