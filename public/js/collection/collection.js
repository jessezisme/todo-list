App.Collection.Task = Backbone.Collection.extend({

	model: App.Model.Task,

	url: function() {
		return ( '/collection/' + Cookies.get('todo')	)
	},
	initialize: function() {
		console.log('app.collection.task initializing')
		this.on('change:open', this.changeSomething, this);
	},
	changeSomething: function() {
		console.log('something changed');
	}
})