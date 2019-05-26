//to show items from database and sort in rows

$( document ).ready(() => {
  if (!localStorage.getItem('foodCart')) {
    localStorage.setItem('foodCart', JSON.stringify([]))
  }

  $('.counter').text(JSON.parse(localStorage.getItem('foodCart')).length)

  let dbItems;

  const itemsData = () => $.ajax({
    type: 'GET',
    url: '/api/items',
    dataType: 'json'
  }).done(function (data) {
    dbItems = data;
    // console.log(dbItems);
    renderMenuItems(data);
  })

  itemsData();


//helper for renderMenuItems
const createItemElement = (item) => {
  return `
  <div class="card">
    <img class="card-img-top" src="${item.image_url}" alt="Card image cap">
    <div class="card-body">
      <h5 class="">${item.name}</h5>
      <p class="prices">$${(item.price/100).toFixed(2)}</p>
      <button id="${item.id}" class="btn btn-primary btn-lg add-cart" type="submit">Add to Cart</button>
    </div>
  </div>
  `
}

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
      //pushes items to hidden form field
    //   let cartForm = JSON.parse(localStorage.getItem('foodCart'));
    //   cartForm.push(temp);
    //   var fd = new FormData(document.getElementById("orderArr"));
    //   for (var i = 0; i < cartForm.length; i++) {
    //   fd.append('cartForm[]', cartForm[i]);
    // }
      //pushes items to cart
      let cart = JSON.parse(localStorage.getItem('foodCart'));
      cart.push(temp);
      localStorage.setItem('foodCart', JSON.stringify(cart))
      $('.counter').text(cart.length);
      })
    }
  }
})

