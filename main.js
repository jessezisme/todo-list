var app = {};

$(function() { //when DOM is ready...
	app.users = new UserCollection(
);








	app.tasks = new IssueCollection([

	]);
	app.gui = new GUI(app.users,
						app.tasks,
						'#app');
});
