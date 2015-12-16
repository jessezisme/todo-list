App.Collection.Task = Backbone.Collection.extend({

	model: App.Model.Task,

	url: '/task/' + Cookies.get('todo'),

	initialize: function() {
		this.fetch({
			success: this.fetchSuccess,
			error: this.fetchError
		})
	},

	// fetchSuccess: function(collection, response, options) {
	// },
	// fetchError: function(collection, response, options) {
	// }

})