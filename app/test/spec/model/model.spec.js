describe("MODEL.js", function() {

	describe("App.Model.Task", function() {

			this.server = sinon.fakeServer.create(); 		

			this.model1 = new App.Model.Task().toJSON(); 
			this.model1 = JSON.stringify(this.model1); 

			this.server.respondWith('get', '/collection/', this.model1); 

			this.collection = new App.Collection.Task();
			this.collection.set('url', '/collection/')
		})

		before(function() {
			
			this.server = sinon.fakeServer.create();

			this.server

			this.task = new App.Model.Task();
			//urlRoot = 'task'
			this.task.set('id', 1)


		})

		it("creates new app.model.task and ensures it is an object", function() {			
			expect(this.task).to.be.ok; 
			expect(this.task).to.be.an("object");
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

	})

})
	