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

    var devicePlatform = device.platform;     

    if(name == "blogs") {
      if(devicePlatform == 'iOS'){
        location.href= "homepage.html#parentHorizontalTab2";
      } else { 
        window.location.href= "homepage.html#parentHorizontalTab2";
      }
    } else if(name == "articles") {
      if(devicePlatform == 'iOS'){
          location.href= "articles_listing.html";
        } else { 
          window.location.href= "articles_listing.html";
        }
      }
    else {
      if(devicePlatform == 'iOS'){
        location.href= "homepage.html#parentHorizontalTab1";
      } else { 
        window.location.href= "homepage.html#parentHorizontalTab1";
      }
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