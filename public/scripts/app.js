$(() => {
  // $.ajax({
  //   method: "GET",
  //   url: "/api/users"
  // }).done((users) => {
  //   for(user of users) {
  //     $("<div>").text(user.name).appendTo($("body"));
  //   }
  // });;
});



const addCart = () => {
  $('form').on('click', function(event) {
    event.preventDefault()
  

      //on click of add to cart, populates
      $.ajax({
        type: 'POST',
        url: '/api/items',
        data: $(this).serialize(),
      }).done(function() {
      $('items');
		  checkout();
      })
    })
  }
  console.log("items", items);
addCart();
