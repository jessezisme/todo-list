describe("ROUTER.js", function() {

	beforeEach(function() {
		sinon.stub(App.Router.Router.prototype, "index");
		sinon.stub(App.Router.Router.prototype, 'tasks');
		sinon.stub(App.Router.Router.prototype, "removeAllViews");

		this.router = new App.Router.Router();
		
		Backbone.history.start();	
		
		this.router.navigate(Backbone.history.getFragment(), {
			trigger: true
		});	
	});

	afterEach(function() {
		Backbone.history.stop(); 
		App.Router.Router.prototype.index.restore();
		App.Router.Router.prototype.tasks.restore();
		App.Router.Router.prototype.removeAllViews.restore(); 
	})

	it("navigates to index and removes all views", function() {
		this.router.navigate('index', {trigger: true})
		expect(App.Router.Router.prototype.index).to.have.been.called;  
		expect(App.Router.Router.prototype.removeAllViews).to.have.been.called; 
	}); 

	it('navigates to tasks and removes all views', function() {	
		this.router.navigate('tasks', {trigger: true});
		expect(App.Router.Router.prototype.tasks).to.have.been.called;
		expect(App.Router.Router.prototype.removeAllViews).to.have.been.called; 
	}); 

})


