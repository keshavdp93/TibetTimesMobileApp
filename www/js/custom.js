$(document).ready(function () {
  $('.material-button-toggle').click(function () {
    $(this).toggleClass('open');
    $('.option').toggleClass('scale-on');
  })


  $(".butt").click(function (){
    window.location.reload(true);
  });
  $('.back-button').click(function () {
    var str = window.location.href;
    var name = str.substring(str.lastIndexOf("?")+1,str.lastIndexOf("="));
    var n = str.lastIndexOf('=');
    var results = str.substring(n + 1);
    if(name == "blogs"){
      window.location.href= "homepage.html?blogs";
    } else {
      window.location.href= "homepage.html";
    }
  })

  $('.collapsed-menus').click(function () {
    $('.menu-bar').slideToggle();
  })

  $(".collapsed-menus").click(function(e) {
    e.stopPropagation();
  });
  
  $("body").click(function() {
    if ( $('.menu-bar').css('display') == 'block') {
     $('.menu-bar').slideToggle();
    }
  });   
  


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
