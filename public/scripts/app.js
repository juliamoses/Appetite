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


const itemsData = () => $.ajax({
	type: 'GET',
	url: '/api/items',
	dataType: 'json'
}).done(function (response) {
  console.log("response: ", response);
})

itemsData();

