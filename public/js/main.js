var App =   App || {};
var app = app || {};

app.router = app.router || new App.Routers.Router(); 

$(document).ready(function() {

	Backbone.history.start();	
	app.router.navigate(Backbone.history.getFragment(), {
		trigger: true
	});

})