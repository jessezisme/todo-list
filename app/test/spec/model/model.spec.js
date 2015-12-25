describe("MODEL.js", function() {

	describe("App.Model.Task", function() {
		app.model.task = new App.Model.Task();

		it("creates new app.model.task and ensures it is an object", function() {			
			expect(app.model.task).to.be.ok; 
			expect(app.model.task).to.be.an("object");
		})

		it("has default values", function() {
			expect(app.model.task.get("untilDueTime"))
				.to.equal(0).and
				.to.equal(true);
				.to.equal(false);
		})

		it("sets passed attributes", function() {
			app.model.task.set("user", "test");
			expect(app.model.task.get("user")).to.equal("test");
		})

	})

})
	