App.View.Task = Backbone.View.extend({

	tagName: 'section',
  	className: 'task-view',
  	template: Handlebars.compile( $('#task-template').html() ),

  	initialize: function() {
  		this.render();

    	app.collection.task = new App.Collection.Task; 

    	app.collection.task.forEach(function(pet) {


    	});



    app.collection.forEach(function(pet) {
      app.views.tile = new App.Views.Tile({
          model : pet
      });

      self.$el.append(app.views.tile.$el)

    });



    


    	app.view.newTask = new App.View.NewTask; 
    	app.view.openTask = new App.View.OpenTask; 
    	app.view.closedTask = new App.View.ClosedTask; 


		// 

  	},

  	render: function() {
    	this.$el.html(this.template({}));
    	$('#body-wrap').append(this.$el);  
  	},

})





// App.View.OpenTask = Backbone.View.extend({

// 	tagName: 'section',
// 	className: 'open-task-view',
// 	template: 



// })