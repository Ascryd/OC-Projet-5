//------------ On sélectionne l'élément parent pour les articles ------------//
cart__items = document.querySelector("#cart__items")


//------------ On récupère les produits dans le local storage ------------//
let ProduitsDansLocalStorage = JSON.parse(localStorage.getItem("produit"))


//------------ On défini un array vide pour y dupliquer la mise en forme pour chaque article ------------//
let structurePanier = []


//------------ On crée une boucle pour ajouter chaque produit au panier ------------//
for (let i = 0; i < ProduitsDansLocalStorage.length; i++) {
    let url_product = ProduitsDansLocalStorage[i].id_produit

    //------------ On stock les id-produit ------------//

    fetch(`http://localhost:3000/api/products/${url_product}`)
    
    .then(function(response) {
        if (response.ok) {
            return response.json();
            
        } else {
            throw new Error ("problème lors de la récupération du produit");
        }
    })

    .then(function(data) {
        structurePanier = structurePanier +
        `<article class="cart__item" data-id="${ProduitsDansLocalStorage[i].id_produit}">
            <div class="cart__item__img">
                <img src=${data.imageUrl} alt=${data.altTxt}>
            </div>
            <div class="cart__item__content">
                <div class="cart__item__content__titlePrice">
                <h2>${data.name}</h2>
                <p>${ProduitsDansLocalStorage[i].couleur_produit}</p>
                <p>${data.price} €</p>
                </div>
                <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                    <p>Qté : ${ProduitsDansLocalStorage[i].quantite_produit}</p>
                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${ProduitsDansLocalStorage[i].quantite_produit}>
                </div>
                <div class="cart__item__content__settings__delete">
                    <p class="deleteItem">Supprimer</p>
                </div>
                </div>
            </div>
        </article>`

        cart__items.innerHTML = structurePanier       
    })

    .catch(function(error) {
        console.log (erreur);
    })
}



//------------ Bouton supprimer ------------//

// sélectionner l'élément dans local storage --> supprimer du LS --> actualiser la page
let supprimer = document.querySelectorAll(".deleteItem");
// console.log(supprimer)
        
        // for (let x = 0; x < supprimer.length; x++){
 
        // }






//*********************** Formulaire de contact *********************************//


//------------ récup formulaire complet ------------//
let form = document.querySelector(".cart__order__form")
console.log(form.elements)

//------------ Recup le label / l'input avec .value ------------//
let prenom = document.querySelector("#firstName")
let nom = document.querySelector("#lastName")
let adresse = document.querySelector("#address")
let ville = document.querySelector("#city")
let email = document.querySelector("#email")

//------------ Récup le <p> d'erreur  ------------//
let prenom_erreur = document.querySelector("#firstNameErrorMsg")
let nom_erreur = document.querySelector("#lastNameErrorMsg")
let adresse_erreur = document.querySelector("#addressErrorMsg")
let ville_erreur = document.querySelector("#cityErrorMsg")
let email_erreur = document.querySelector("#emailErrorMsg")


//------------ Un addE-Listener pour valider le formulaire  ------------//
form.addEventListener("submit", (e)=> {
    
    e.preventDefault();
    //------- Les données qu'on récup du formulaire -------//
    let form_complet = {
    prenom: prenom.value,
    nom: nom.value,
    adresse: adresse.value,
    ville: ville.value,
    email: email.value
    }
    
    //------- 5 fonctions qui vérifient les données du formulaire grâce aux Regex -------//
    function prenom_controle(){
        if(/^[a-z ,.'-]+$/i.test(prenom.value)){
            prenom_erreur.innerText = ""
            return true
        }else {
            prenom_erreur.innerText = "Prenom non valide"
            return false
        }
    }

    function nom_controle(){
        if(/^[a-z ,.'-]+$/i.test(nom.value)){
            nom_erreur.innerText = ""
            return true
        }else {
            nom_erreur.innerText = "Nom non valide"
            return false
        }
    }

    function adresse_controle(){
        if(/^[a-zA-Z0-9\s,.'-]{3,}$/.test(adresse.value)){
            adresse_erreur.innerText = ""
            return true
        }else {
            adresse_erreur.innerText = "Adresse non valide"
            return false
        }
    }

    function ville_controle(){
        if(/^[a-z ,.'-]+$/i.test(ville.value)){
            ville_erreur.innerText = ""
            return true
        }else {
            ville_erreur.innerText = "Ville non valide"
            return false
        }
    }

    function email_controle(){
        if(/^[\w\-\+]+(\.[\w\-]+)*@[\w\-]+(\.[\w\-]+)*\.[\w\-]{2,4}$/.test(email.value)){
            email_erreur.innerText = ""
            return true
        }else {
            email_erreur.innerText = "Email non valide"
            return false
        }
    }

    //------- La condition qui est rempli si les 5 fonctions ci-dessus sont "true" -------//
    if(prenom_controle() && nom_controle() && adresse_controle() && ville_controle() && email_controle()){
       localStorage.setItem("contact", JSON.stringify(form_complet)) 
    } else {
        console.log("non")
    }
    
    //------- Toutes les données qu'on va envoyer au serveur -------//
    let donneeTotal = {
        form_complet,
        ProduitsDansLocalStorage
    }
    
    
    
    // fetch("http://localhost:3000/api/order", {
    //     method: "POST",
    //     headers: {
    //         "Accept": "application/json",
    //         "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify(donneeTotal)
    // })
})

// let produit = JSON.parse(localStorage.getItem("produit"))
// for (let p = 0; p < produit.length; p++) {
//     let id = produit[p].id_produit
//     return ("id")
// }

// console.log(id)