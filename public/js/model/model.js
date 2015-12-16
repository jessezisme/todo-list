App.Model.User = Backbone.Model.extend({
	defaults: {
		username:'',
		password:''
	},
	// url : "/tasks",
	// currentUser : ''
});


App.Model.Task = Backbone.Model.extend({
	defaults: {
		user: '',
		title:'',
		description:'',
		due: '',
		priority: '',
		shared: [],
		status:'unassigned'
	},
});

// // IssueModel.fetch();
// var UserCollection = Backbone.Collection.extend({
// 	model:UserModel, url: "/users"
// });

// var IssueCollection = Backbone.Collection.extend({
// 	model:IssueModel, url: "/tasks"
// });



// 	//--------------
// 	 // Initializers
// 	 //--------------

// 		// 	app.appView = new app.AppView();
