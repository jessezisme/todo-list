describe("MODEL.js", function() {

	describe("App.Model.Task", function() {

		before(function() {
			this.saveSpy = sinon.spy(App.Model.Task.prototype, "save");
			this.destroySpy = sinon.spy(App.Model.Task.prototype, "destroy");
			this.initSpy = sinon.spy(App.Model.Task.prototype, "initialize");

			this.task = new App.Model.Task();		
		})

		beforeEach(function() {
			this.server = sinon.fakeServer.create();
			this.server.respondWith("Post", "/task", 
				[
					200, 
					{"Content-Type": "application/json"},
					JSON.stringify([this.task]) 
				]
			)
		})

		afterEach(function() {
			this.server.restore(); 
		})

		after(function() {
			App.Model.Task.prototype.save.restore();
			App.Model.Task.prototype.destroy.restore(); 
			App.Model.Task.prototype.initialize.restore(); 
		})

		it("creates new app.model.task and ensures it is an object", function() {			
			expect(this.task).to.be.ok; 
			expect(this.task).to.be.an("object");			
			expect(this.initSpy.calledOnce).to.be.true;
		})

		it("has default values", function() {
			expect(this.task.get("untilDueTime")).to.equal(0);
			expect(this.task.get("open")).to.equal(true);
			expect(this.task.get("star")).to.equal(false); 
		})

		it("sets passed attributes", function() {
			this.task.set("user", "test");
			expect(this.task.get("user")).to.equal("test");
		})

		it("saves model to server", function() {
			this.task.save();
			expect(this.saveSpy.calledOnce).to.be.true;
		})

		it('deletes model', function() {
			this.task.destroy();
			expect(this.destroySpy.callCount).to.equal(1);  
		})

	})

})
	
