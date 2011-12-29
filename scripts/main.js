require.config({
	appDir: "../",
	baseUrl: "./scripts",
	optimize: "none",

	paths: {
		"jquery" : "jquery-1.7.1.min",
		"knockout" : "knockout-2.0.0"
	}
});

define("Home", ["text!../Features/Home/view.html!strip", "text!../Features/Home/view.css", "../Features/Home/viewModel"], function(v,s){
	return {
		view: v,
		styles: s
	}
});


require(["jquery"], function($) {

	$(function() {
		var something = $("#something");
		console.log("We're here");
	});
	
	console.log("Hello world");
	
});

require(["Home"], function(h) {
	console.log("Home");
});

/*
require(["Home","text!Home/view.html!strip"], function(h, html) {
	console.log("Home");
});*/