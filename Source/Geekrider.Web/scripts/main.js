require.config({
	appDir: "/",
	baseUrl: "/scripts",
	optimize: "none",
	    //"http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min",


	paths: {
	    "jquery": "http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery",
	    "knockout": "http://cdn.dolittle.com/Knockout/knockout-2.0.0",
		"knockout.mapping": "knockout.mapping-2.0.0",
	    "bifrost": "Bifrost.debug",
	    "order": "http://cdn.dolittle.com/Require/order",
	    "domReady": "http://cdn.dolittle.com/Require/domReady",
	    "text": "http://cdn.dolittle.com/Require/text"
	}
});

// "http://cdn.dolittle.com/Bifrost/Bifrost.debug",

require(
    ["jquery", "knockout"],
	function() {
		require(["jquery.history"],
		    function () {
		        require(["knockout.mapping", "bifrost"],
		            function () {
		                Bifrost.features.featureMapper.add("admin/{feature}/{subFeature}", "/administration/{feature}/{subFeature}", false);
		                Bifrost.features.featureMapper.add("admin/{feature}", "/administration/{feature}", true);

		                Bifrost.features.featureMapper.add("{feature}/{subFeature}", "/Features/{feature}/{subFeature}", false);
		                Bifrost.features.featureMapper.add("{feature}", "/Features/{feature}", true);

		                require([       
		                		"/index.js",  
		                        "order!cufon-yui",
				                "order!PT_Sans",
				                "order!hoverintent",
				                "order!custom",
				                "order!coin-slider.min",
				                "order!menusm"],
		                        function() {
		                            console.log("Loaded");
		                        }
		                );
		            }
		        );
		    }
		);
	}
);
