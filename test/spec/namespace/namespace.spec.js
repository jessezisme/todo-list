describe('NAMESPACE.js', function() {

	describe('App', function() {
		it("provides the global 'App' object ", function() {
			expect(App).to.be.an("object");
		})
		it("ensures App has all necessary keys", function() {
			expect(App).to.include.keys("Collection", "Model", "View", "Router");
		})
	})

	describe('app', function() {
		it("provies the global 'app' object ", function() {
			expect(app).to.be.an("object");
		})
		it("ensures 'app' has all necessary keys", function() {
			expect(app).to.include.keys("collection", "model", "view", "router");
		})
	})
	
}); 


