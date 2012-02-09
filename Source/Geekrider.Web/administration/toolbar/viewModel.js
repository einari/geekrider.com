(function() {
	ko.bindingHandlers.menu = {
		init: function(element, valueAccessor, allBindingAccessor, viewModel) {
			$(element).hover(
				function() {
					$(element).find('ul:first').stop(true,true).slideDown(100).show();
				},
				function() {
					$(element).find('ul:first').stop(true,true).slideUp(0);
				});
		},
		update: function(element, valueAccessor, allBindingAccessor, viewModel) {
			
		}
	}


    Bifrost.features.featureManager.get("admin/toolbar").defineViewModel(function () {
		var self = this;
		
		this.items = [
			{ title: "Users", items: ko.observable([]) },
			{ title: "Posts", items: ko.observable([]) },
			{ 
				title: "Data",
				items: ko.observable([
					{ title: "Exercise" },
					{ title: "Weight" },
					{ title: "Bloodsugar" },
					{ title: "Dimensions" },
				])
			}
		];
	});
	
})();