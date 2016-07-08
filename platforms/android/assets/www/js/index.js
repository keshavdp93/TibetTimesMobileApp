var latest = 'http://tibettimes.net/category/news/feed/';
var featured_content = 'http://tibettimes.net/blog/feed/';
var videos_feed = 'http://tibettimes.net/feed/?post_type=video';
var articles_feed = 'http://tibettimes.net/category/%E0%BD%96%E0%BD%85%E0%BD%A2%E0%BC%8B%E0%BD%A0%E0%BD%91%E0%BE%B2%E0%BD%B2%E0%BC%8D/feed/';
var homepage = {
    // Application Constructor
    initialize: function() {
      this.bindEvents();
    },
    bindEvents: function() {
    //write current url to file
     write_file_current_url.initialize();
    // check page 
    //read Feeds of latest posts from site    
      $.feedToJson({
        feed:latest,
        success: function(data){
          console.log(data.item[0]);
        var post = [];
        var post_data_values = {};
        var counter=0;
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
      var tpl = "<ul>{{#post}}<li><div class='title'><a href='detail.html?listing={{id}}'>{{title}}<div class='trim-text'>{{details}}</div> </a></div><div class='image'><a href='detail.html?listing={{id}}'><img width='100px' height='100px' src='{{image}}'></a></div></li>{{/post}}</ul>";
      var html = Mustache.to_html(tpl, post_data_values);
      $('.feed-news').append(html);
      
      $.feedToJson({
        feed:featured_content,
        success: function(data){
        var post = [];
        var post_data_values = {};
        var counter=0;
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
      var tpl = "<ul>{{#post}}<li><div class='title'><a href='detail.html?blogs={{id}}'>{{title}}<div class='trim-text'>{{details}}</div> </a></div><div class='image'><a href='detail.html?blogs={{id}}'><img width='100px' height='100px' src='{{image}}'></a></div></li>{{/post}}</ul>";
      var html = Mustache.to_html(tpl, post_data_values);
      $('.feed-blogs').append(html);
      }
    });
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
          var comment_rss = (data.item[results]['commentRss']);
          var title_image = "<div class='content-wrap'><div class='content-title'>"+data.item[results]['title']+"</div><div class='content-description'>"+data.item[results]['encoded']+"</div></div>";
          $("#news-listing").append(title_image);     
        
          $.feedToJson({
            feed:comment_rss,
            success: function(data){
              if(data) {
                var output = "<div class='comments'>Comments</div><ul>";
                for(value in data.item){
                  var comment_title = data.item[value]['title'];
                  var comment_date = data.item[value]['pubDate'];
                  var comment_description = data.item[value]['encoded'];
                  var author = comment_title.split(":");
                  var author_name = author[1];
                  var arr = comment_date.split(" ");
                  var date = arr[1]+' '+arr[2]+' '+arr[3]+' '+arr[4];
                  output += "<li><div class='comment-title'>"+author_name+"</div><div class='comment-date'>"+date+"</div><div class='comment-description'>"+comment_description+"</div></li>";
                }
                output += "</ul>";
                $(".comments-block").append(output);
              } 
            }
          });
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
    write_file_current_url.initialize();
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
 
    //check network connection
      var networkState = navigator.network.connection.type;
      if (networkState == Connection.NONE){
        $(".wrap-errer").show();
      } else {
        $(".wrap-errer").hide();
        $(".loader").css("background-image","url('ajax-loader.gif')");
      }

    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
      function gotFS(fileSystem) {
        fileSystem.root.getFile("current_url.txt", {create: true}, gotFileEntry, fail);
      console.log(fileSystem);
      }
  }
  function gotFileEntry(fileEntry) {
    fileEntry.createWriter(gotFileWriter, fail);
    console.log(fileEntry);
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
    //check network connection  
      var networkState = navigator.network.connection.type;
      if (networkState == Connection.NONE){
        $(".wrap-errer").show();
      } else {
        $(".wrap-errer").hide();
        $(".loader").css("background-image","url('ajax-loader.gif')");
      }

    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
      function gotFS(fileSystem) {
        fileSystem.root.getFile("current_url.txt", {create: false}, gotFile, fail);
      }
    }
  function fail(e) {
    var devicePlatform = device.platform;
    if(devicePlatform == 'iOS'){
      location.href = './homepage.html';
      } else {
      window.location.href = './homepage.html';
    }
  }
  function gotFile(fileEntry) {
    fileEntry.file(function(file) {
        var reader = new FileReader();
        reader.onloadend = function(e) {
          var devicePlatform = device.platform;
          if(this.result){
            if(devicePlatform == 'iOS'){
              location.href = this.result;
             } else {
              window.location.href = this.result;
            }
          }
          else {
            if(devicePlatform == 'iOS'){
              location.href = './homepage.html';
            } else {
              window.location.href = './homepage.html';
            }
          }
        }
        reader.readAsText(file);
    });
  }
}
};

var articles_listing = {
  initialize: function(){
    this.article_listing_block();
  },
  article_listing_block: function(){
      write_file_current_url.initialize();

     var post = [];
     var post_data_values = {};
      //read Feeds of latest posts from site    
      $.feedToJson({
        feed:articles_feed,
        success: function(data){
        var counter=0;
        console.log(data.item[0]);
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
      var tpl = "<ul>{{#post}}<li><div class='title'><a href='articles_detail.html?articles={{id}}'>{{title}}<div class='trim-text'>{{details}}</div> </a></div><div class='image'><a href='articles_detail.html?articles={{id}}'><img width='100px' height='100px' src='{{image}}'></a></div></li>{{/post}}</ul>";
      var html = Mustache.to_html(tpl, post_data_values);
      $('.homepage-wrapper').append(html);
      }
    });
  }
};

var articles_detail = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
      write_file_current_url.initialize();
    
      var str = window.location.href;
      var name = str.substring(str.lastIndexOf("?")+1,str.lastIndexOf("="));
      var n = str.lastIndexOf('=');
      var results = str.substring(n + 1);
      $.feedToJson({
        feed:articles_feed,
        success: function(data){
          var comment_rss = (data.item[results]['commentRss']);
          var title_image = "<div class='content-wrap'><div class='content-title'>"+data.item[results]['title']+"</div><div class='content-description'>"+data.item[results]['encoded']+"</div></div>";
          $("#news-listing").append(title_image);     
        
          $.feedToJson({
            feed:comment_rss,
            success: function(data){
              if(data) {
                var output = "<div class='comments'>Comments</div><ul>";
                for(value in data.item){
                  var comment_title = data.item[value]['title'];
                  var comment_date = data.item[value]['pubDate'];
                  var comment_description = data.item[value]['encoded'];
                  var author = comment_title.split(":");
                  var author_name = author[1];
                  var arr = comment_date.split(" ");
                  var date = arr[1]+' '+arr[2]+' '+arr[3]+' '+arr[4];
                  output += "<li><div class='comment-title'>"+author_name+"</div><div class='comment-date'>"+date+"</div><div class='comment-description'>"+comment_description+"</div></li>";
                }
                output += "</ul>";
                $(".comments-block").append(output);
              } 
            }
          });
      }
    });
  }
};

// var check_connection = {
//   initialize: function() {
//     this.chk_connection();
//   },
//   chk_connection: function() {

//   }
// };

