
App.Router.Router = Backbone.Router.extend({
	
	routes: {
		'':	'index',
		'tasks': 'tasks'
	},

	removeAllViews: function() {
		console.log("removing all views")
		for (var key in app.view) {
			app.view[key].remove();
			delete app.view[key];
		}
	},

	index: function() {
		this.removeAllViews(); 
		app.view.login = new App.View.Login;
	},

	tasks: function() {
		this.removeAllViews();
		app.view.taskWindow = new App.View.TaskWindow; 
	}


})