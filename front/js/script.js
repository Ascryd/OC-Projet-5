//------------ Variables du squelette HTML ------------//
let article = document.getElementsByTagName("article");
let items = document.getElementById("items");


//------------ On récupère les données avec fetch ------------//
fetch("http://localhost:3000/api/products")
        .then(function(response) {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error (erreur);
            }
        })

        //----- On crée dynamiquement l'acceuil -----//
        .then (function(data) {
            data.forEach(product => {
        
                let link = document.createElement("a")
                link.innerText = product.name
                link.href = "./product.html?idProduit=" + product._id

                let img = document.createElement("img")
                img.src = product.imageUrl
                img.alt = product.altTxt
                let article = document.createElement("article")
                article.appendChild(img)

                let h3 = document.createElement("h3")
                h3.innerText = product.name
                h3.classList.add("productName")
                article.appendChild(h3)

                let p = document.createElement("p")
                p.innerText = product.description
                p.classList.add("productDescription")
                article.appendChild(p)

                link.appendChild(article)
                items.appendChild(link)
            })
        })

        .catch(function(error) {
            
        })