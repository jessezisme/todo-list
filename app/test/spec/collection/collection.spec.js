
describe("COLLECTION.js", function() {

	describe("App.Collection.Task", function() {

		before(function() {			
			this.server = sinon.fakeServer.create();

			this.model1 = new App.Model.Task().toJSON(); 
			this.model1 = JSON.stringify(this.model1); 

			this.server.respondWith('get', '/collection/', this.model1); 

			this.collection = new App.Collection.Task();
			this.collection.set('url', '/collection/')
		})


		describe("creation", function() {
			it("is a collection object", function() {
				expect(this.collection).to.be.ok;
				expect(this.collection).to.be.an("object");	
			})		
		})

		describe('fetches', function() {
			afterEach(function() {
				this.collection.reset(); 
			})

			it("successfully fetches models", function() {
				this.collection.fetch(); 				
				expect(this.collection.length).to.equal(1);
				expect(this.collection.at(0))
					.to.be.ok
					.to.be.an("object");
				expect(this.collection.at(0).toJSON()).to.include.keys("user", "title", "due", "description", "open", "star");
			})

		})

		describe("modification", function() {

			it('can add model', function() {
				this.model2 = new App.Model.Task().toJSON();
				this.collection.add(this.model2); 

				expect(this.collection.length).to.equal(1); 
			})

			it('can reset collection', function() {
				this.collection.reset();
				expect(this.collection.length).to.equal(0);
			})
		})
	})
})


