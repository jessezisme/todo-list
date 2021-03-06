App.Model.User = Backbone.Model.extend({
	defaults: {
		username:'',
		password:''
	},
	// url : "/tasks",
	// currentUser : ''
});


App.Model.Task = Backbone.Model.extend({
	urlRoot: 'task',
	initialize: function() {
	},
	defaults: {
		user: '',
		title:'',
		description:'',
		due: '',		
		untilDueTime: 0,
		untilDuePretty: '',
		open: true,
		star: false
	},
});
