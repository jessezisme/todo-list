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

	it("navigates to index and removes all views", function(done) {
		this.router.navigate('', {trigger: true})
		done();
		expect(App.Router.Router.prototype.index.calledOnce).to.be.true;  
		expect(App.Router.Router.prototype.removeAllViews.called).to.be.true; 
	}); 

	it('navigates to tasks and removes all views', function(done) {	
		this.router.navigate('tasks', {trigger: true});
		done();
		expect(App.Router.Router.prototype.tasks.calledOnce).to.be.true;
		expect(App.Router.Router.prototype.removeAllViews.calledOnce).to.be.true; 
	}); 

})


