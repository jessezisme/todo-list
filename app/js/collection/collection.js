App.Collection.Task = Backbone.Collection.extend({

	model: App.Model.Task,
	url: function() {
		return ( '/collection/' + Cookies.get('todo')	)
	}

});
