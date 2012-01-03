require.config({
	appDir: "../",
	baseUrl: "./scripts",
	optimize: "none",

	paths: {
		"jquery" : "jquery-1.7.1.min",
		"knockout" : "knockout-2.0.0"
	}
});

define("$",["jquery"],function($) {
	console.log("jQuery");
	return $;
});


define("Home", ["jquery", "text!../Features/Home/view.html!strip", "text!../Features/Home/view.css", "../Features/Home/viewModel"], function(v,s){
	console.log("Home factory");
	return {
		view: v,
		styles: s
	}
});

define("Navigation", ["jquery", "knockout", "text!../Features/Navigation/view.html!strip", "../Features/Navigation/viewModel"], function(v,s) {
	
	return {
		view: v,
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

require(["Navigation"], function(h) {
	console.log("Navigation");
});

/*
require(["Home","text!Home/view.html!strip"], function(h, html) {
	console.log("Home");
});*/