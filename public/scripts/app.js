$(() => {
<<<<<<< HEAD
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done((users) => {
    for(items of users) {
      $("<div>").text(items.name).appendTo($("body"));
      $("<div>").text(items.price/100).appendTo($("body"));
    }
  });
=======
  // $.ajax({
  //   method: "GET",
  //   url: "/api/users"
  // }).done((users) => {
  //   for(user of users) {
  //     $("<div>").text(user.name).appendTo($("body"));
  //   }
  // });;
>>>>>>> feature/ejs
});


