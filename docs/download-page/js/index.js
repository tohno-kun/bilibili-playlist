(function($){
  var e = $('#install-button')
    ,originalText = e.html()
    ,itemURL = $('link[rel=chrome-webstore-item]').attr('href')
    ,isChrome = /chrom(e|ium)/.test(navigator.userAgent.toLowerCase());
  checkAndSetButton();
  e.click(function(){
    e.html('正在安装...').attr('disabled',true);
    chrome.webstore.install(
      itemURL
      ,function(){
        e.html('安装成功！').attr('disabled',true);
      }
      ,function(){
        e.html(originalText).attr('disabled',false);
      }
    );
  });
  function checkAndSetButton(){
    if(isChrome){
      if (typeof chrome !== "undefined" && typeof chrome.app !== "undefined" && chrome.app.isInstalled) {
        e.html('已安装').attr('disabled',true);
      }
    }else{
      e.html('只适用于Chrome浏览器').attr('disabled',true);
    }

  }
})(jQuery);


var url = "https://raw.githubusercontent.com/tohno-kun/bilibili-playlist/master/lists/";

$('#download-json').on("click", "button", function() {
    var name = $(this).text();
    var data_url = url + name + ".json";
    $.get(data_url).done(function(data) {
        var h = new Blob([data], { type: "text/plain;charset=utf-8" });
        saveAs(h, name + ".json");
    });

});

$.ajax({
    type: "get",
    url: "https://api.github.com/repos/tohno-kun/bilibili-playlist/contents/lists",
    success: function(data) {
        var lists = eval(data);
        for (var i = 0; i < lists.length; i++) {
            var item = $('<button></button>').text(lists[i]['name'].split('.')[0]);
            $('#download-json').append(item);
        }

    }
});