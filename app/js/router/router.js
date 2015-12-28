
App.Router.Router = Backbone.Router.extend({
	
	routes: {
		'':	'index',
		'tasks': 'tasks'
	},

	removeAllViews: function() {
		for (var key in app.view) {
			app.view[key].remove();
			delete app.view[key];
		}
	},

	index: function() {
		console.log("index route")
		this.removeAllViews(); 
		app.view.login = new App.View.Login;
	},

	tasks: function() {
		console.log('task route');
		this.removeAllViews();
		app.view.taskWindow = new App.View.TaskWindow; 
	}

})