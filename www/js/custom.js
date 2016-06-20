$(document).ready(function () {
  //test
  $('.material-button-toggle').click(function () {
    $(this).toggleClass('open');
    $('.option').toggleClass('scale-on');
  })
    // var file_url = document.referrer;
    // var filename = file_url.substring(file_url.lastIndexOf('/')+1);
    // if(filename == ""){
    //   $(".back-button").hide();
    // }
  $('.back-button').click(function () {
    // window.history.back();
    alert(document.referrer);
  })

  $('.collapsed-menus').click(function () {
    $('.menu-bar').slideToggle();
  })
  $(".collapsed-menus").click(function(e) {
      e.stopPropagation();
  });
  
  $("body").click(function() {
    if ( $('.menu-bar').css('display') == 'block')
    {
     $('.menu-bar').slideToggle();
    }
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
