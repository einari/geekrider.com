// <![CDATA[
$(function(){

    // menu smothness
    $('.menusm li').click(function() {
      window.location = $(this).find('a:first').attr('href');
    });
    var dropdown_level = 0;
    $('.menusm li ul').parent().find('a:first').addClass('have_submenu');
    $('.menusm').children('li').children('a').addClass('top_level');
    $('.menusm').children('li').children('a').removeClass('have_submenu');
    $('.menusm li').hover(function(){
      if(dropdown_level == 0){
        $('.menusm').find('a').removeClass('have_submenu_hover');
        $(this).addClass('li_hover_main');
        $(this).children('a').addClass('a_hover_main');
        $('.menusm ul').parent().find('a:first').addClass('have_submenu');
        $('.menusm').children('li').children('a').addClass('top_level');
        $('.menusm').children('li').children('a').removeClass('have_submenu');
      }
      $(this).find('ul:first').stop(true,true).slideDown(200).show();
      $(this).find('a:first').addClass('have_submenu_hover');
      $('.menusm').children('li').children('a').removeClass('have_submenu_hover');
      dropdown_level++;
    },function(){
      $(this).find('ul:first').stop(true,true).slideUp(0);
      $(this).find('a:first').removeClass('have_submenu_hover');
      dropdown_level--;
      if(dropdown_level == 0){
        $(this).removeClass('li_hover_main');
        $(this).children('a').removeClass('a_hover_main');
       }
    });
	// END of menu smothness
  
});
// ]]>