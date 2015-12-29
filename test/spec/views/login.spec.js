describe('LOGIN.js', function() {

	beforeEach(function() {

		this.server = sinon.fakeServer.create(); 
		this.server.respondWith('post', '/login', JSON.stringify(true));

		sinon.spy(App.Router.Router.prototype, "index");
		sinon.spy(App.Router.Router.prototype, 'tasks');
		sinon.spy(App.Router.Router.prototype, "removeAllViews");

		if (!(this.router)) {
			this.router = new App.Router.Router();
			Backbone.history.start();		
			this.router.navigate(Backbone.history.getFragment(), {
				trigger: true
			});	
		}

		this.initializeSpy = sinon.spy(App.View.Login.prototype, 'initialize');
		this.renderSpy = sinon.spy(App.View.Login.prototype, 'render');
		this.submitForm = sinon.spy(App.View.Login.prototype, 'submitForm');

		this.login = new App.View.Login(); 
	});

	afterEach(function() {
		this.server.restore();

		Backbone.history.stop(); 
		App.Router.Router.prototype.index.restore();
		App.Router.Router.prototype.tasks.restore();
		App.Router.Router.prototype.removeAllViews.restore(); 

		App.View.Login.prototype.initialize.restore();
		App.View.Login.prototype.render.restore();
		App.View.Login.prototype.submitForm.restore();

		this.login.remove(); 
	});

	it("initializes and renders the view", function() {
		expect(this.login).to.be.an("object");
		expect(this.login).to.be.ok;
		expect(this.initializeSpy.calledOnce).to.be.true; 
	});

	it("appends login view", function() {
		expect(	$('body .section-view') ).to.be.ok; 
	});

	it("submits form, sets cookie, and trigger route to tasks", function() {
		$('.login-view button').trigger('click');		
		expect(this.submitForm.called).to.be.true;
		expect($('.taskWindowView')).to.be.ok
	});

	it("denies access when wrong username/password is entered", function() {		
		this.server.restore(); 
		this.server = sinon.fakeServer.create();
		this.server.respondWith('post', '/login', JSON.stringify(false)); 
		$('.login-view button').trigger('click');
		expect(App.Router.Router.prototype.tasks.called).to.be.false;
	})	

}); 









