var idnum = $("input:checkbox:not(:checked)").length + $("input:checked").length + 3;
var prenum = idnum - 1
var pre = "#checkbox" + prenum
var id = "checkbox" + idnum


$(".addItem").on("click", function(event) {
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

