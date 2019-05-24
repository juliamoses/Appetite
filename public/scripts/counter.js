
// function cartCounter() {
// 	const counter = $("#composeText").val().length;

// 	$('.counter').text(maxValue - counter);
// 	$('.counter').text() < 0 ? $('.counter').addClass('invalid') : 
// 	$('.counter').removeClass('invalid');
// }

// $(document).ready(function() {
//   $("#composeText").on('input', cartCounter);
// });

$(document).ready(function() {
	function cartCounter() {
		const counter = $('.counter').val().length;

		$('.counter').val()
	}
	$(".add-cart").on('input', cartCounter);
});



function cartCounter()
{
    var value = parseInt(document.getElementById('.counter').value, 100);
    value = isNaN(value) ? 0 : value;
    value++;
    document.getElementById('.counter').value = value;
}