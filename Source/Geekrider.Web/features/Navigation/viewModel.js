(function(undefined) {
    Bifrost.features.featureManager.get("navigation").defineViewModel(function () {
		var self = this;
				
		this.uriChanged(function() {
		});
		
		this.queryParameters.define({
			laktose: ko.observable()
		});
					
		self.navigationItems = ko.mapping.fromJS([
			{ title: "Home", feature: "home?laktose=5" },
			{ title: "New Post", feature: "admin/posts/create?laktose=6" },
		]);
	});
})();	