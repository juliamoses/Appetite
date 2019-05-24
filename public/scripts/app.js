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


$(document).ready(function(){
//adds count of items added to cart
$('.counter').text(JSON.parse(localStorage.getItem('foodCart')).length)
//when you click checkout make sure to clear localStorage

let dbItems;


if (!localStorage.getItem('foodCart')) {
  localStorage.setItem('foodCart', JSON.stringify([]))
}


const itemsData = () => $.ajax({
	type: 'GET',
	url: '/api/items',
	dataType: 'json'
}).done(function (data) {
  dbItems = data;
  renderMenuItems(data);
})
itemsData();


//to show items from database and sort in rows
const renderMenuItems = (items) => {
  let i = 0;
  for (item of items ) {
    let $items = createItemElement(item);
    let idTag = `#${item.id}`

    if (i < 4) {
      $('.card-row1').append($items);
    }else {
      $('.card-row2').append($items);
    }
    i++;

    //items added to cart sent to local storage
    $(idTag).on('click', function(data) {
      let id = data.target.id;
      let temp = dbItems.find(function(e){
        if (e.id == id) {
          return e;
        }
      })

    //pushes items to cart
    let cart = JSON.parse(localStorage.getItem('foodCart'));
    cart.push(temp)
    localStorage.setItem('foodCart', JSON.stringify(cart))
    $('.counter').text(cart.length);
    })
  }
}


//helper for renderMenuItems
const createItemElement = (item) => {
  return `
  <div class="card">
    <img class="card-img-top" src="../images/pasta3.jpeg" alt="Card image cap">
    <div class="card-body">
      <h5 class="">${item.name}</h5>
      <p class="card-text">Short desc of items</p>
      <p class="prices">$${(item.price/100).toFixed(2)}</p>
      <button id="${item.id}" class="btn btn-primary btn-lg add-cart" type="submit">Add to Cart</button>
    </div>
  </div>
  `
}

//to render only item price and name
const cartItems = () => {
  let fullCart = localStorage.getItem('foodCart');
  let parsedItems = JSON.parse(fullCart);

 for(items of parsedItems) {
    let $cartItem = cartItemElements(items);
      $('.checkout-row').append($cartItem);
    }
  }

cartItems();


//helper for cartItemElements
const cartItemElements = (items) => {
  return ` <p>${items.name}</p><p>${items.price}</p>`
}


});










