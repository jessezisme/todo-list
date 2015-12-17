App.Collection.Task = Backbone.Collection.extend({

	model: App.Model.Task,

	url: '/collection',

	initialize: function() {
		console.log("app.collection.task: initalizing")
	}
})