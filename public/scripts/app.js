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
}).done(function (data) {
  
  renderMenuItems(data);
  console.log("response: ", data);
})
itemsData();

function renderMenuItems(items) {
  var i = 0;
  for (item of items ) {
    console.log("item ", item);
    let $items = createItemElement(item);

    if (i < 4) {
      $('.card-row1').append($items);
    } else {
      $('.card-row2').append($items);
    }
    i++;
  }
}

function createItemElement(item) {
  return `
  <div class="card">
    <img class="card-img-top" src="../images/pasta3.jpeg" alt="Card image cap">
    <div class="card-body">
      <h5 class="">${item.name}</h5>
      <p class="card-text">Short desc of items</p>
      <p class="prices">$${(item.price/100).toFixed(2)}</p>
      <button class="btn btn-primary btn-lg add-cart" type="submit">Add to Cart</button>
    </div>
  </div>
  `
}


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
