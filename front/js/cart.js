//****************************** Remplissage du panier ******************************//


//------------ On sélectionne l'élément parent pour les articles ------------//
cart__items = document.querySelector("#cart__items")


//------------ On récupère les produits dans le local storage ------------//
let ProduitsDansLocalStorage = JSON.parse(localStorage.getItem("produit"))


//------------ On défini un array vide pour y dupliquer la mise en forme pour chaque article ------------//
let structurePanier = []


//------------ On crée une boucle pour ajouter chaque produit au panier ------------//
for (let i = 0; i < ProduitsDansLocalStorage.length; i++) {
    let url_product = ProduitsDansLocalStorage[i].id_produit


    //------------ On récupère les données API de chaque produit individuellement ------------//
    fetch(`http://localhost:3000/api/products/${url_product}`)
    
    .then(function(response) {
        if (response.ok) {
            return response.json();
            
        } else {
            throw new Error ("problème lors de la récupération du produit");
        }
    })


    //------------ On injecte le produit dans le squelette HTML (pour chaques produits) ------------//
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
                    <p> Qté : ${ProduitsDansLocalStorage[i].quantite_produit}</p>
                    <input data-id="${ProduitsDansLocalStorage[i].id_produit}" data-color="${ProduitsDansLocalStorage[i].couleur_produit}" type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${ProduitsDansLocalStorage[i].quantite_produit}>
                </div>
                <div class="cart__item__content__settings__delete">
                    <p data-id="${ProduitsDansLocalStorage[i].id_produit}" data-color="${ProduitsDansLocalStorage[i].couleur_produit}" class="deleteItem">Supprimer</p>
                </div>
                </div>
            </div>
        </article>`

        cart__items.innerHTML = structurePanier
    })


    //------------ On écoute l'input pour changer la quantité et on défini les variables nécessaire au changement ------------//
    .then (function() {
        let inputQuantity = document.querySelectorAll(".itemQuantity")
        inputQuantity.forEach(input => {
            input.addEventListener("change", (e) => {
                let id = e.target.getAttribute("data-id")
                let color = e.target.getAttribute("data-color")
                //--- On appelle la fonction avec les paramètres nécessaires ---//
                changerQuantiteeProduit(id ,color, input)
                
            })
        })
    })


    //------------ On écoute le btn supprimer et on défini les variables nécessaire à la suppression  ------------//
    .then(function() {
        let supprimer = document.querySelectorAll(".deleteItem");
        supprimer.forEach(bouton => {
            bouton.addEventListener("click", (e) => {
            let id = e.target.getAttribute("data-id")
            let color = e.target.getAttribute("data-color")
            //--- On appelle la fonction avec les paramètres nécessaires ---//
            supprimerProduit(id, color)
            })
        })
    })


    .catch(function(error) {
       
    })
}


//------------ On défini une fonction pour modifier la quantité du produit voulu (dans le local storage et visuellement)  ------------//
function changerQuantiteeProduit(id, color, input){
    for (let q = 0; q < ProduitsDansLocalStorage.length; q++) {
        if ((ProduitsDansLocalStorage[q].id_produit == id) && (ProduitsDansLocalStorage[q].couleur_produit == color)) {
            ProduitsDansLocalStorage[q].quantite_produit = input.value
            localStorage.setItem("produit", JSON.stringify(ProduitsDansLocalStorage))
            window.location.reload()
        } else {
            console.log("nop")
        }
    }
}


//------------ On défini une fonction pour supprimer le produit voulu du panier (et du local storage)  ------------//
function supprimerProduit(id, color){
    for (let e = 0; e < ProduitsDansLocalStorage.length; e++) {
        if ((ProduitsDansLocalStorage[e].id_produit == id) && (ProduitsDansLocalStorage[e].couleur_produit == color)) {
           ArrayProduit = JSON.parse(localStorage.getItem("produit"))
           ArrayProduit.splice([e], 1)
           localStorage.setItem("produit", JSON.stringify(ArrayProduit))
           window.location.reload()
        } 
    }
}
















//*********************** Formulaire de contact et envoie à l'API *********************************//


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


//------------ Un add E-Listener pour valider le formulaire  ------------//
form.addEventListener("submit", (e)=> {
    
    e.preventDefault();
    //------- Les données qu'on récupère du formulaire -------//
    let contact = {
    firstName: prenom.value,
    lastName: nom.value,
    address: adresse.value,
    city: ville.value,
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
       localStorage.setItem("formulaire", JSON.stringify(contact)) 
    } else {
        console.log("non")
    }
    

    //------- On récupère les Id produit à envoyer -------//
    let Array_Id = []
    ProduitsDansLocalStorage.forEach(product => {
        Array_Id.push(product.id_produit) 
    })


    //------- On met toutes les données qu'on va envoyer au serveur dans un objet-------//
    let donneeTotal = {
        contact,
        Array_Id
    }


    //------- On envoie les données à l'API -------//
    fetch("http://localhost:3000/api/products/order", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(donneeTotal)

    })

    .then(function(response) {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error ("Données non envoyés");
        }
    })


    //--- Si tout est ok, on redirige vers la page de confirmation ---//
    .then(function() {
        window.location.href="../html/confirmation.html"

    }) 
    

    .catch(function(erreur) {
        window.location.href="../html/confirmation.html"
        console.log (erreur)
    })

})