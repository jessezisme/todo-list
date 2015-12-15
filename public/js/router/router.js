var App =   App || {};
App.Routers     || (App.Routers     = {});

var app = app || {};
app.views  = app.views || {};



App.Routers.Router = Backbone.Router.extend({
	
	routes: {
		'':	'index',
	},

	index: function() {
		console.log('alert');
		app.views.login = new App.Views.Login;
	}
	



})