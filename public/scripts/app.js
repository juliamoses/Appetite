// get request to database uses jquery to append to body
// $(() => {
//   $.ajax({
//     method: "GET",
//     url: "/api/items"
//   }).done((items) => {
//     for(item of items) {
//       $("<div>").text(item.name).appendTo($("body"));
//       $('<div>').text(item.price).appendTo($("body"));
//     }
//   });;
// });

$(() => {
const itemsData = () => $.ajax({
	type: 'GET',
	url: '/api/items',
	dataType: 'json'
}).done(function (response) {
  console.log("response: ", response);
})
itemsData();



// const addCart = () => {
//   $('form').on('click', function(event) {
//     event.preventDefault()
  

//       //on click of add to cart, populates
//       $.ajax({
//         type: 'POST',
//         url: '/api/items',
//         data: $(this).serialize(),
//       }).done(function() {
//       $('items');
// 		  checkout();
//       })
//     })
//   }
//   // console.log("items", items);
// addCart();
});
