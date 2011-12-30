$(document).ready(function(){ 	
			   
		
		  // radius Box
	// $('.box_r').css({"border-radius": "5px", "-moz-border-radius":"5px", "-webkit-border-radius":"5px"});
		// end radius Box
	// wrap 'span' to nav page link
	$('.topnav ul').children('li').each(function() {
		$(this).children('a').html('<span>'+$(this).children('a').text()+'</span>'); // add tags span to a href
	});
	
});	

