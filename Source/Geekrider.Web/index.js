(function() {
	function index() {
		var self = this;
		
		this.feature = ko.observable("home");
		
		this.uriChanged(function(uri) {
			self.feature(uri.path.substr(1));
		});
	}
	
	Bifrost.features.ViewModel.baseFor(index);
	ko.applyBindings(new index());
})();