var App = App || {};
var app    = app || {};

app.router = new App.Router.Router();


$(document).ready(function() {

	Backbone.history.start();	
	app.router.navigate(Backbone.history.getFragment(), {
		trigger: true
	});

})