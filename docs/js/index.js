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
	success: function(data){
		var lists = eval(data);
		for (var i = 0; i < lists.length; i++) {
			var item = $('<button></button>').text(lists[i]['name'].split('.')[0]);
			$('#download-json').append(item);
		}

	}
});
