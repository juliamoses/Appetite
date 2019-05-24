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
  console.log("response: ", data);
})
itemsData();


function renderMenuItems(items) {
  var i = 0;
  for (item of items ) {
    console.log("item ", item);
    let $items = createItemElement(item);

    let idTag = `#${item.id}`
    console.log(idTag)
      

    if (i < 4) {
      $('.card-row1').append($items);
    } else {
      $('.card-row2').append($items);
    }
    i++;
 

    $(idTag).on('click', function (data) {
      let id = data.target.id;
      console.log(dbItems);
      console.log(data);
      let temp = dbItems.find(function(e){
        if (e.id == id) {
          return e;
        }
      })
      let cart = JSON.parse(localStorage.getItem('foodCart'));
      cart.push(temp)
      localStorage.setItem('foodCart', JSON.stringify(cart))

      $('.counter').text(cart.length);
    })
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
      <button id="${item.id}" class="btn btn-primary btn-lg add-cart" type="submit">Add to Cart</button>
    </div>
  </div>
  `
}







});










