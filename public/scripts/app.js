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
        url: '/checkout',
        data: $(this).serialize(),
      }).done(function() {
		  $('menu');
		  checkout();
      })
    }
  })
