describe('TASK.js', function() {

	describe('Task-Window', function() {

		before(function() {
			App.Collection.Task.prototype.url = 'collection';
		})

		beforeEach(function() {
			if (!(this.router)) {
				this.router = new App.Router.Router();
				Backbone.history.start();		
				this.router.navigate(Backbone.history.getFragment(), {
					trigger: true
				});	
				this.router.navigate('removeAllViews', {trigger: true});
			}

			this.model1 = new App.Model.Task();
			this.model2 = new App.Model.Task();

			//Server	
			this.server = sinon.fakeServer.create();
			this.server.respondWith(
			    "GET",
			    "/collection",
			    [
			      200,
			      {"Content-Type": "application/json"},
			      JSON.stringify([this.model1, this.model2])
			    ]
			 );
			this.server.respondWith(
			    "GET",
			    "/collection/undefined/",
			    [
			      200,
			      {"Content-Type": "application/json"},
			       JSON.stringify([this.model1, this.model2])
			    ]
			 );
			this.server.respondWith(
			    "POST",
			    "/task",
			    [
			      200,
			      {"Content-Type": "application/json"},
			      JSON.stringify({modelSave: "success"})
			    ]
			 );
			this.server.autorespond = true;

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
			// this.collectionFetchStub = sinon.stub(App.Collection.Task.prototype, 'fetch');
					//Initialize
			this.collectionInitializeStub = sinon.stub(App.Collection.Task.prototype, 'initialize');
			// 	//Model
			// 		//Post
			// this.modelCreate = sinon.stub(App.Model.Task.prototype, 'save');	

			this.view = new App.View.TaskWindow;	
		});

		afterEach(function() {
			Backbone.history.stop(); 

			this.server.restore();

			//Destroy Test Models
			this.model1.destroy();
			this.model2.destroy();

			// Restore Spies & Stubs
			App.View.TaskWindow.prototype.initialize.restore();
			App.View.TaskWindow.prototype.render.restore();
			App.View.TaskWindow.prototype.toggleClosedTask.restore();
			App.View.TaskWindow.prototype.toggleActive.restore();
			App.View.TaskWindow.prototype.toggleStar.restore();
			App.View.TaskWindow.prototype.createTask.restore(); 
			App.View.Task.prototype.initialize.restore();
			App.View.Task.prototype.render.restore();
			// App.Collection.Task.prototype.fetch.restore();
			App.Collection.Task.prototype.initialize.restore(); 

			//Reset Collection
			app.collection.task.reset();
			this.view.remove(); 
			this.router.navigate('removeAllViews', {trigger: true});
		});

		it('creates task-window view and appends to DOM', function() {
			expect(this.view).to.be
				.an("object")
				.ok
		});

		it('has all required html elements', function() {
			expect(	$('#closed-task-header') ).to.be.ok;
			expect( $('#star-wrap')	).to.be.ok;
			expect(	$('#submit-button') ).to.be.ok;
			expect( $('#label') ).to.be.ok;
			expect( $('#closed-task-div') ).to.be.ok;
			expect( $('#task-title-wrap') ).to.be.ok;
			expect( $('#task-due') ).to.be.ok;
		});

		it('Task Collection is created and fetches models', function() {
			expect( this.collectionInitializeStub.called ).to.be.true;
		}); 

	});

});
