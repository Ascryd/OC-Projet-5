const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const orderId = urlParams.get('orderId')


let ID = document.querySelector("#orderId")

ID.innerText = orderId