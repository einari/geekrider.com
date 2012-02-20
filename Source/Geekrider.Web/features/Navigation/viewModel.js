(function() {
    Bifrost.features.featureManager.get("navigation").defineViewModel(function () {
		var self = this;
		
		self.navigationItems = ko.mapping.fromJS([
			{ title: "Home", feature: "home" },
			{ title: "New Post", feature: "admin/posts/create" },
		]);
	});
})();	