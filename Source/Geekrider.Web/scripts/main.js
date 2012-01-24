function getFilename(url) {
    if (url) {
        var m = url.toString().match(/.*\/(.+?)\./);
        if (m && m.length > 1) {
            return m[1];
        }
    }
    return "";
}


require.config({
	appDir: "/",
	baseUrl: "/scripts",
	optimize: "none",

	paths: {
		"jquery" : "http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min",
		"knockout" : "http://cdn.dolittle.com/Knockout/knockout-2.0.0.js"
		//"knockout-2.0.0"
	}
});

require(
	[
		"cufon-yui",
		"PT_Sans",
		"order!jquery",
		"order!hoverintent",
		"order!knockout",
        "order!Bifrost/Bifrost.utils",
		"order!Bifrost/Bifrost.features",
        "order!Bifrost/Bifrost.commands",
		"order!custom",
		"order!coin-slider.min",
		"order!menusm",
	], function ($) {
	    var filename = getFilename(window.location.href);
	    if (filename == '' || filename == 'www') {
	        filename = "index";
	    }
	    var viewModelName = filename.toLowerCase() == "view" ? "viewModel.js" : filename + ".js";

	    require([viewModelName], function () {
	        console.log("Application loaded");
	    });
	});
