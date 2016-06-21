
var latest = 'http://tibettimes.net/category/news/feed/';
var featured_content = "http://tibettimes.net/blog/feed/";
var videos_feed = 'http://tibettimes.net/feed/?post_type=video';
var homepage = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
    //write current url to file
    check_connection.initialize();
    write_file_current_url.initialize();
    // check page 
    var str = window.location.href;
    var n = str.lastIndexOf('?');
    var results = str.substring(n + 1);
    if(results =='blogs') {
      var feed = featured_content; 
      var hash =results;
     }
    else {
      var feed = latest;
      var hash = 'listing';
    }
     var post = [];
     var post_data_values = {};
      //read Feeds of latest posts from site    
      $.feedToJson({
        feed:feed,
        success: function(data){
        var counter=0;
        //create json of xml output
        for (var value in data.item) {
          var img = $(data.item[value]['encoded']).find('img:first').attr('src');
          if(!img){
            img ="logo.png";
          }
           var detail_text = $(data.item[value]['encoded']).text();
           var trim_text = detail_text.substring(0,100);
            post.push({ 
              id: counter,
              title : data.item[value]['title'],
              image : img,
              content :data.item[value]['encoded'],
              details : trim_text
            });
          post_data_values.post = post;
          counter++;
       }
      //Code taht run on homepage index.html
      var tpl = "<ul>{{#post}}<li><div class='title'><a href='detail.html?"+hash+"={{id}}'>{{title}}<div class='trim-text'>{{details}}</div> </a></div><div class='image'><a href='detail.html?"+hash+"={{id}}'><img width='100px' height='100px' src='{{image}}'></a></div></li>{{/post}}</ul>";
      var html = Mustache.to_html(tpl, post_data_values);
      $('.homepage-wrapper').append(html);
      }
    });
  }
};

var detail = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
    //write current url to file
      check_connection.initialize();
      write_file_current_url.initialize();
    
      var str = window.location.href;
      var name = str.substring(str.lastIndexOf("?")+1,str.lastIndexOf("="));
      var n = str.lastIndexOf('=');
      var results = str.substring(n + 1);
      if(name == "blogs"){
       var feed = featured_content;  
      }
      else {
        var feed = latest;
      }

      $.feedToJson({
        feed:feed,
        success: function(data){
          var title_image = "<div class='content-wrap'><div class='content-title'>"+data.item[results]['title']+"</div><div class='content-description'>"+data.item[results]['encoded']+"</div></div>";
          $("#news-listing").append(title_image);
      }
    });
  }
};

// video landing page
var videos = {
  initialize: function() {
    this.bindEvents();
  },
  bindEvents: function() {
    //write current url to file
    check_connection.initialize();
    write_file_current_url.initialize();

    var post = [];
    var post_data_values = {};
    $.feedToJson({
      feed:videos_feed,
      success: function(data){
        var counter=0;
        //create json of xml output
        for (var value in data.item) {
            post.push({ 
              id: counter,
              title : data.item[value]['title'],
              video : data.item[value]['encoded']
            });
          post_data_values.post = post;
          counter++;
       }
      //Code taht run on homepage index.html
      console.log(data.item);
      var html = data.item[0]['description'];
      $('.video-wrap').append(html);
      }
    });


  }
};

// video landing page
var write_file_current_url = {
  initialize: function() {
    this.write_text();
  },
  write_text: function() {
//device ready
var current_path = window.location.href;
document.addEventListener("deviceready", onDeviceReady, false);
    function onDeviceReady() {
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
      function gotFS(fileSystem) {
        fileSystem.root.getFile("current_url.txt", {create: true}, gotFileEntry, fail);
      }
  }
  function gotFileEntry(fileEntry) {
    fileEntry.createWriter(gotFileWriter, fail);
  }
  function gotFileWriter(writer) {
    writer.write(current_path);
    writer.abort();
  }
  function fail(error) {
    console.log("error : "+error.code);
  }
} 
};

var read_file_to_redirection = {
  initialize: function() {
    this.read_file();
  },
  read_file: function() {
  document.addEventListener("deviceready", onDeviceReady, false);
  function onDeviceReady() {
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
      function gotFS(fileSystem) {
        fileSystem.root.getFile("current_url.txt", {create: true}, gotFile, fail);
      }
  }
  function fail(e) {
    console.log("FileSystem Error");
  }
  function gotFile(fileEntry) {
    fileEntry.file(function(file) {
        var reader = new FileReader();
        reader.onloadend = function(e) {
            var pathArray = location.href.split( '/' );
            var protocol = pathArray[0];
            var host = pathArray[2];
            var url = protocol + '//' + host;
            if(this.result){
              window.location.href = this.result;
            } else {      
             window.location.href= "homepage.html";
            }
        }
        reader.readAsText(file);
    });
  }
}
};

 
var check_connection = {
  initialize: function() {
    this.chk_connection();
  },
  chk_connection: function() {
    document.addEventListener("deviceready", deviceInfo, true);
    function deviceInfo(){
      var networkState = navigator.network.connection.type;
      if (networkState == Connection.NONE){
        $(".wrap-errer").show();
      } else {
        $(".wrap-errer").hide();
        $(".loader").css("background-image","url('ajax-loader.gif')");
      }
    }
  }
};