//* Displaying projects with an API *//
// Fonction pour effectuer la requête Fetch et manipuler les données
async function fetchProjects() {
    try {
        const response = await fetch("http://localhost:5678/api/works");
        const projects = await response.json();

        // Retrieving the parent element from the DOM
        const gallery2 = document.querySelector(".modal-wrapper");

        // Parcourir les projets et ajouter chaque projet à la galerie
        projects.forEach((project) => {
            const projectElement = document.createElement("figure");
            const imgElement = document.createElement("img");
            imgElement.src = project.imageUrl;
            imgElement.alt = project.title;

            imgElement.classList.add("img");

            projectElement.appendChild(imgElement);

            // Add project to gallery
            gallery2.appendChild(projectElement);
        });
    } catch (error) {
        console.error("Erreur lors de la récupération des projets:", error);
    }
}

//* Modal *//
let modal = null;
const focusableSelector = "button, input, a";
let focusables = [];
let previouslyFocusedElement = null;

const openModal = function (e) {
    e.preventDefault();
    modal = document.querySelector(e.target.getAttribute("href"));
    focusables = Array.from(modal.querySelectorAll(focusableSelector));
    previouslyFocusedElement = document.querySelector(":focus");
    modal.style.display = null;
    focusables[0].focus();
    modal.removeAttribute("aria-hidden");
    modal.setAttribute("aria-modal", "true");
    modal.addEventListener("click", closeModal);
    modal
        .querySelector(".js-modal-close")
        .addEventListener("click", closeModal);
    modal
        .querySelector(".js-modal-stop")
        .addEventListener("click", stopPropagation);

    fetchProjects();
};

const closeModal = function (e) {
    if (modal === null) return;
    if (previouslyFocusedElement !== null) previouslyFocusedElement.focus();
    e.preventDefault();
    modal.setAttribute("aria-hidden", "true");
    modal.removeAttribute("aria-modal");
    modal.removeEventListener("click", closeModal);
    modal
        .querySelector(".js-modal-close")
        .removeEventListener("click", closeModal);
    modal
        .querySelector(".js-modal-stop")
        .removeEventListener("click", stopPropagation);
    const hideModal = function () {
        modal.style.display = "none";
        modal.removeEventListener("animationend", hideModal);
        modal = null;
    };
    modal.addEventListener("animationend", hideModal);
};

const stopPropagation = function (e) {
    e.stopPropagation();
};

document.querySelectorAll(".js-modal").forEach((a) => {
    a.addEventListener("click", openModal);
});
