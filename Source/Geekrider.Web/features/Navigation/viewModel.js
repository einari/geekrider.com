(function() {
    Bifrost.features.featureManager.get("navigation").defineViewModel(function () {
		var self = this;
		
		self.navigationItems = [
			{ title: "Home" },
			{ title: "About" },
			{ title: "Contact" }
		];
	});
})();	