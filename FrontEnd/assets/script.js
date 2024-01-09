// recovery of works
let titre = "Voici un nouveau titre";

let h1 = document.createElement("h1");
h1.innerText = titre;

let gallery = document.querySelector(".gallery");
gallery.appendChild(h1);

export function ajoutListenersAvis() {
    const piecesElements = document.querySelectorAll(".fiches article button");

    for (let i = 0; i < piecesElements.length; i++) {
        piecesElements[i].addEventListener("click", async function (event) {
            const id = event.target.dataset.id;
            const reponse = await fetch(
                "http://localhost:8081/pieces/" + id + "/avis"
            );
            const avis = await reponse.json();
            window.localStorage.setItem(
                `avis-piece-${id}`,
                JSON.stringify(avis)
            );
            const pieceElement = event.target.parentElement;
            afficherAvis(pieceElement, avis);
        });
    }
}
