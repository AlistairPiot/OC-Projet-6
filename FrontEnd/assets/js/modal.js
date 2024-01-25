//* Displaying projects with an API *//
// Function for performing the Fetch request and manipulating the data
async function fetchProjects() {
    try {
        const response = await fetch("http://localhost:5678/api/works");
        const projects = await response.json();

        // Retrieving the parent element from the DOM
        const gridProjects = document.querySelector(".grid-projects");

        // Clear existing projects in the gallery
        gridProjects.innerHTML = "";

        // Parcourir les projets et ajouter chaque projet à la galerie
        projects.forEach((project) => {
            const projectElement = document.createElement("figure");
            const imgElement = document.createElement("img");
            const deleteIcon = document.createElement("i");
            imgElement.src = project.imageUrl;
            imgElement.alt = project.title;
            imgElement.classList.add("img");
            deleteIcon.classList.add("fa-solid", "fa-trash-can", "delete-icon");

            projectElement.appendChild(imgElement);
            projectElement.appendChild(deleteIcon);

            //Add project to the grid Projects
            gridProjects.appendChild(projectElement);
        });
    } catch (error) {
        console.error("Erreur lors de la récupération des projets:", error);
    }
}

//* Modal 1 *//
// Recovery of DOM elements modal 1
const modalContainer = document.querySelector(".modal-container-js");
const btnOpen = document.querySelector(".modal-btn-open-js");
const btnClose = document.getElementById("icon-close");
const btnAjout = document.querySelector(".btn-ajout-js");

// Open the modal when the trigger button "modifier" is clicked
btnOpen.addEventListener("click", openModal);
function openModal() {
    modalContainer.classList.add("active");
    fetchProjects();
}

// Close the modal when the close button is clicked
btnClose.addEventListener("click", closeModal);
function closeModal() {
    modalContainer.classList.remove("active");
}

//* Modal 2 *//

const modalContainer2 = document.querySelector(".modal-container-2-js");
const btnClose2 = document.getElementById("icon-close-2");
const returnArrow = document.getElementById("icon-return-js");

// Open the Modal2 the trigger button "Ajouter une photo" is clicked
btnAjout.addEventListener("click", openModalAjout);
function openModalAjout() {
    modalContainer2.classList.add("active");
}

// Return to the modal1 when the "returnArrow" is clicked
returnArrow.addEventListener("click", closeModal2);
function closeModal2() {
    modalContainer2.classList.remove("active");
}

// Close the modal2 and the modal1 when the close button is clicked
btnClose2.addEventListener("click", closeAllModal);
function closeAllModal() {
    modalContainer2.classList.remove("active");
    closeModal();
}
