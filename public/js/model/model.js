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
	defaults: {
		user: '',
		title:'',
		description:'',
		due: '',
		open: true
	},
});
