require.config({
	appDir: "../",
	baseUrl: "./scripts",
	optimize: "none",

	paths: {
		"jquery" : "http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min",
			//"jquery-1.7.1.min",
		"knockout" : "knockout-2.0.0"
	}
});

require(
	[
		"order!jquery", 
		"order!knockout", 
		"order!Bifrost/Bifrost.Features",
	], function($) {
	console.log("Application loaded");
});
