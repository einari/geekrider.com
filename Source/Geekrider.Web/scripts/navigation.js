(function(window) {
	if (typeof ko !== 'undefined') {
	    ko.bindingHandlers.navigateTo = {
	        init: function (element, valueAccessor, allBindingAccessor, viewModel) {
	            ko.applyBindingsToNode(element, { 
					click: function() {
						var featureName = valueAccessor()();
						History.pushState({feature:featureName},$(element).attr("title"),"?feature="+featureName);
					} 
				}, viewModel);
	        }
	    };
	}
	
	function decodeHashString(a) {
        if (a == "") return { };
		a = a.replace("/?","").split('&');

        var b = { };
        for (var i = 0; i < a.length; ++i) {
            var p = a[i].split('=');
            if (p.length != 2) continue;
            b[p[0]] = decodeURIComponent(p[1].replace( /\+/g , " "));
        }
        return b;
	}

	var container = $("[data-navigation-container]")[0];

	History.Adapter.bind(window,"statechange", function() {
		var state = History.getState();
		var featureName = state.data.feature;

		$(container).html("");
		var feature = Bifrost.features.featureManager.get(featureName);
		feature.renderTo(container);
	});
	
	$(function () {
		var state = History.getState();
		var hash = decodeHashString(state.hash);
		var featureName = hash.feature;
		if( typeof featureName !== "undefined") {
			$(window).trigger("statechange");
		} else {
			var optionString = $(container).data("navigation-container");
			var optionsDictionary = ko.jsonExpressionRewriting.parseObjectLiteral(optionString);
			$.each(optionsDictionary, function(index, item) {
				if( item.key === "default") {
					var feature = Bifrost.features.featureManager.get(item.value);
					feature.renderTo(container);
					return;
				}
			});
		}
	});
})(window);
