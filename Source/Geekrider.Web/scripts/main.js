require.config({
	appDir: "/",
	baseUrl: "/scripts",
	optimize: "none",

	paths: {
		"jquery" : "http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min",
		"knockout" : "knockout-2.0.0"
	}
});

require(
	[
		"cufon-yui",
		"PT_Sans",
		"order!jquery", 
		"order!hoverintent",
		"order!knockout", 
		"order!Bifrost/Bifrost.Features",
		"order!custom",
		"order!coin-slider.min",
		"order!menusm",
	], function($) {
		require(["viewModel.js"], function() {
			console.log("Application loaded");
		});
});
