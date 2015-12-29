describe('TASK.js', function() {

	describe('Task-Window', function() {

		beforeEach(function() {

			this.model1 = new App.Model.Task();
			this.model2 = new App.Model.Task();

			//Server	
			this.server = sinon.fakeServer.create();

			// Spies
				//Window
					// Initialize			
			this.initializeSpy = sinon.spy(App.View.TaskWindow.prototype, 'initialize');		
					// Render
			this.renderSpy = sinon.spy(App.View.TaskWindow.prototype, 'render');
					// ToggleClosedTask
			this.toggleClosedTaskSpy = sinon.spy(App.View.TaskWindow.prototype, 'toggleClosedTask');
					// ToggleActive
			this.toggleActiveSpy = sinon.spy(App.View.TaskWindow.prototype, 'toggleActive');
					// ToggleStar
			this.toggleStarSpy = sinon.spy(App.View.TaskWindow.prototype, 'toggleStar');
					// createTask
			this.createTaskSpy = sinon.spy(App.View.TaskWindow.prototype, 'createTask'); 
				//Task-View
					//Initialize				
			this.taskInitializeSpy = sinon.spy(App.View.Task.prototype, 'initialize');
					//Render
			this.taskRenderSpy = sinon.spy(App.View.Task.prototype, 'render');	

			// Stubs
				//Collection
					//Fetch
			this.collectionFetch = sinon.stub(App.Collection.Task.prototype, 'fetch');
			// 	//Model
			// 		//Post
			// this.modelCreate = sinon.stub(App.Model.Task.prototype, 'save');	


			
			this.view = new App.View.TaskWindow();		
		})

		afterEach(function() {
			this.server.restore(); 

			app.collection.task.reset();


			this.view.remove(); 

		})








		//Router
			//Create Router
		this.server = sinon.fakeServer.create(); 
			//Responses
				//Collection Fetch
		this.server.respondWith('get', '/collection', JSON.stringify(true)); //Need to change to send back 2 models (w/ ids)
				//Model POST(creation)
		this.server.respondWith('post', '/task', JSON.stringify()) //Need to send back newly-created model
				//Model PUT(save)
		this.server.respondWith('put', 'task/:id', JSON.stringify()) //Need to change this

		
		// Spies
			//Window
				// Initialize			
		this.initializeSpy = sinon.spy(App.View.TaskWindow.prototype, 'initialize');		
				// Render
		this.renderSpy = sinon.spy(App.View.TaskWindow.prototype, 'render');
				// ToggleClosedTask
		this.toggleClosedTaskSpy = sinon.spy(App.View.TaskWindow.prototype, 'toggleClosedTask');
				// ToggleActive
		this.toggleActiveSpy = sinon.spy(App.View.TaskWindow.prototype, 'toggleActive');
				// ToggleStar
		this.toggleStarSpy = sinon.spy(App.View.TaskWindow.prototype, 'toggleStar');
				// createTask
		this.createTaskSpy = sinon.spy(App.View.TaskWindow.prototype, 'createTask'); 
			//Collection
				//Fetch
		this.collectionFetch = sinon.spy(App.Collection.Task.prototype, 'fetch');
			//Model
				//Post
		this.modelCreate = sinon.spy(App.Model.Task.prototype, 'save');
			//Task-View
				//Initialize				
		this.taskInitializeSpy = sinon.spy(App.View.Task.prototype, 'initialize');
				//Render
		this.taskRenderSpy = sinon.spy(App.View.Task.prototype, 'render');		

		//Stubs
			//App.Collection.Task.Fetch
				// Test Models
					//Need to create 2 models to feed fetch
				//Check Collection Length (should be 2)

				//2 new App.View.Task should be created
					//Tests:
						//Initialize: App.View.Task (2 times)
						//Render: App.View.Task (2 times)
						//Test DOM elements:
							//Should be 2 .taskView elements

			//Model Save (trigger when new task is entered) 
		




this.collectionFetchStub = sinon.stub(My.Collection.Items.prototype, 'fetch', function (options) {
    options.success(collection, response);
};







			//Trigger Click Events
				// #star-wrap : toggleStar
				// #submit-button : createTask
				// #label : toggleActive
				// #closed-task-header : ToggleClosedTask





		//Check DOM Elements
			// Check .taskWindowView
			// #closed-task-header
			// #star-wrap
			// #submit-buttom
			// #label
			// #closed-task-header
			// #closed-task-div
			// #star-wrap
			// #task-title-wrap textarea
			// #task-description
			// #star-wrap i
			// #task-due

		//Closed-Task-Header
			//Check to make sure counter equal number of completed tasks
			//If collectiobn model's open status changes:
				//Check whether this counter changes as well

		





























	})





})








		// this.server = sinon.fakeServer.create();
		// this.server = sinon.fakeServer.create(); 
		// this.server.respondWith('post', '/login', JSON.stringify(true));

		// sinon.spy(App.Router.Router.prototype, "index");
		// sinon.spy(App.Router.Router.prototype, 'tasks');
		// sinon.spy(App.Router.Router.prototype, "removeAllViews");

		// if (!(this.router)) {
		// 	this.router = new App.Router.Router();
		// 	Backbone.history.start();		
		// 	this.router.navigate(Backbone.history.getFragment(), {
		// 		trigger: true
		// 	});	
		// }












// describe('LOGIN.js', function() {

// 	before(function() {

// 		this.server = sinon.fakeServer.create(); 
// 		this.server.respondWith('get', '/collection', this.model);
// 		this.server.respondWith('post', '/task', JSON.stringify({save: 'saved'}) );
// 		this.server.respondWith('post', '/task/1', JSON.stringify({save: 'saved'}) );

// 		this.server.respondWith()

// 		// this.model = new App.Model.Task(); 
// 		// this.model.set('id', 1); 





// 	})

// 	beforeEach(function() {






// 		this.initializeSpy = sinon.spy(App.View.Login.prototype, 'initialize';
// 		this.renderSpy = sinon.spy(App.View.Login.prototype, 'render');
// 		this.submitForm = sinon.spy(App.View.Login.prototype, 'submitForm');

// 		if (!(this.login))	{
// 			this.login = App.View.Login(); 
// 		}


		




// 			// 		this.server = sinon.fakeServer.create();

// 			// this.model1 = new App.Model.Task().toJSON(); 
// 			// this.model1 = JSON.stringify(this.model1); 

// 			// this.server.respondWith('get', '/collection/', this.model1); 

// 			// this.collection = new App.Collection.Task();
// 			// this.collection.set('url', '/collection/')

// 	})

// 	afterEach(function() {

// 		if (this.initializeSpy || this.renderSpy || this.submitForm) {
// 			App.View.Login.prototype.initialize.restore();
// 			App.View.Login.prototype.render.restore();
// 			App.View.Login.prototype.submitForm.restore();
// 		}

// 	})


// })
