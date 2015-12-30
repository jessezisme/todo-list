App.Collection.Task = Backbone.Collection.extend({

	model: App.Model.Task,
	initialize: function() {		
	},
	url: function() {
		return ( '/collection/' + Cookies.get('todo')	)
	}

});
