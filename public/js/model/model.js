App.Model.User = Backbone.Model.extend({
	defaults: {
		username:'',
		password:''
	},
	// url : "/tasks",
	// currentUser : ''
});


App.Model.Task = Backbone.Model.extend({
	url: 'task',
	defaults: {
		user: '',
		title:'',
		description:'',
		due: '',
		status:'open'
	},
});
