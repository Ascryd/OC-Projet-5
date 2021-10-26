let image = document.getElementsByClassName("item__img")[0]
let title = document.getElementById("title")
let price = document.getElementById("price")
let description = document.getElementById("description")
let color = document.getElementById("colors")


fetch("http://localhost:3000/api/products/107fb5b75607497b96722bda5b504926")
    .then(function(response) {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error (erreur);
        }
    })

    .then (function(data) {

        let img = document.createElement("img")
        img.src = data.imageUrl
        img.alt = data.altTxt
        image.appendChild(img)

        title.innerText = data.name
        price.innerText =  data.price
        description.innerText = data.description
         
        let colors = data.colors
        colors.forEach(value => {
            let option = document.createElement("option")
            option.value = value
            option.innerText = value
            color.appendChild(option)
        })
    })

    .catch(function(error) {
        console.log (erreur);
    })