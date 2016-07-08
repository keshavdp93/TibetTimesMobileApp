 
var check_connection = {
  initialize: function() {
    this.chk_connection();
  },
  chk_connection: function() {
      console.log("GOT AN ONLOAD!!!")
        document.addEventListener("deviceready", deviceInfo, true);

    function deviceInfo(){
      var networkState = navigator.network.connection.type;
      if (networkState == Connection.NONE)
        $(".wrap-errer").show();
	  }
	  else {
	      $(".wrap-errer").hide();
	      $(".loader").css("background-image","url('ajax-loader.gif')");
	  }
    }

}
};
