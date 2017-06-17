console.log("yo what the hell")

var idnum = $("input:checkbox:not(:checked)").length + $("input:checked").length + 3;
var prenum = idnum - 1
var pre = "#checkbox" + prenum
var id = "checkbox" + idnum

var builtArray = []




$("#buildBackPack").on("click", function(event) {
  var s = $("input:checked").siblings();
  console.log(s)
  if (s.length > 0) {
    $.each(s, function(index, value) {
      var t = $(s[index]).text();
      builtArray.push(t);
      console.log(t)
    })
    $.ajax({
      method: "POST",
      url: "",
      data: { builtBackPack: builtArray }
    }).done(function(msg) {
      alert("Data saved:" + msg);
    });
  }
})




$("#addItem").on("click", function(event) {
  event.preventDefault();
  var newItem = {
    item: $("#NewItem").val().trim()
  }

  console.log(newItem)
  $.post("/", newItem)
    .done(function() {
      var d = $("<div>");
      d.addClass("funkyradio-success");
      var i = $("<input>");
      i.attr("type", "checkbox");
      i.attr("name", "checkbox");
      i.attr("id", id);
      var l = $("<label>");
      l.attr("for", id);
      l.val("hello");
      i.prepend(l);
      d.prepend(i);
      $("#item-area").prepend(d);
    })

});

$.get("/", function(data) {

  if (data.length !== 0) {

    for (var i = 0; i < data.length; i++) {

      var d = $("<div>");
      d.addClass("funkyradio-success");

      var i = $("<input>");
      i.attr("type", "checkbox");
      i.attr("name", "checkbox");
      i.attr("id", this.id);
      $("#item-area").prepend(d);

    }

  }

});
