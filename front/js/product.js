let image = document.getElementsByClassName("item__img")[0]
let title = document.getElementById("title")
let price = document.getElementById("price")
let description = document.getElementById("description")
let color = document.getElementById("colors")

let url_product = window.location.search.slice(1)


fetch(`http://localhost:3000/api/products/${url_product}`)
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
        console.log (erreur)
    })


//---- panier ----- 

let choixColor = color.value
// console.log(img)

const btn_ajoutPanier = document.getElementById("addToCart")
btn_ajoutPanier.addEventListener("click", (e)=> {
    let detailsProduits = {
        photo_produit: image,
        nom_produit: name,
        prix_produit: price,
        // quantite_produit: quantite,
        // couleur_produit: choixColor
    }
    console.log(detailsProduits)
})    


// const quantity = document.getElementById("quantity")
// quantite.addEventListener("input", (e)=> {
//  let quantite = e
// })



