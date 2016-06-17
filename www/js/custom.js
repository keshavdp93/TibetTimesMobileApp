$(document).ready(function () {
  //test
  $('.material-button-toggle').click(function () {
    $(this).toggleClass('open');
    $('.option').toggleClass('scale-on');
  })

  $('.back-button').click(function () {
    window.history.back();  
  })

  $('.retry').click(function () {
    window.location.reload(true);  
  })
 
  $('.collapsed-menus').click(function () {
    $('.menu-bar').slideToggle();
  })

  $("body").click(function() {
    if ( $('.menu-bar').css('display') == 'block')
    {
     $('.menu-bar').slideToggle();
    }
  });   
  
  $(".collapsed-menus").click(function(e) {
      e.stopPropagation();
  });
  
  $(".loader").css("background-image","url('ajax-loader.gif')");
  
  var str = window.location.href;
  var n = str.lastIndexOf('?');
  var results = str.substring(n + 1);
   if(results =='blogs') {
    $('.latest-news').removeClass('active');
    $('.blogss').addClass('active');
   }

  });

$(window).load(function() {
	$(".loader").hide();
});
