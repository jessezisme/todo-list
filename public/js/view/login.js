
App.View.Login = Backbone.View.extend({

  tagName: 'section',
  className: 'login-view',
  template: Handlebars.compile( $('#login-template').html() ),

  initialize: function() {
    this.render(); 
  },

  render: function() {
    this.$el.html(this.template({}));
    $('#body-wrap').append(this.$el);  
  },

  events: {
    'click button' : 'submitForm'
  },

  submitForm: function(event) {
    event.preventDefault();    
    var loginData = {
      username: $('#username').val().toLowerCase(),
      password: $('#password').val().toLowerCase()
    };

    console.log(JSON.stringify(loginData));

    $.ajax({
      url: "/login",
      data: loginData,
      type: "POST"
    }).done(function(data) {

      console.log(data); 
      
      if (data == true) {
        console.log('tasks loading');
        Cookies.set('todo', loginData.username );
        app.router.navigate('tasks', {trigger: true});
      }
    });

  } 

})

