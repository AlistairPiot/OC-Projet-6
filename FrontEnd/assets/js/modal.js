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

            deleteIcon.addEventListener("click", () => {
                console.log("cliqué hehehe");
            });

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
const overlayModal1 = document.querySelector(".overlay-js");

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

// Close the modal when the user clicks outside
overlayModal1.addEventListener("click", function (event) {
    // Check that the element clicked is the overlay itself (and not a child element)
    if (event.target === overlayModal1) {
        closeModal();
    }
});

//* Modal 2 *//

const modalContainer2 = document.querySelector(".modal-container-2-js");
const btnClose2 = document.getElementById("icon-close-2");
const returnArrow = document.getElementById("icon-return-js");
const overlayModal2 = document.querySelector(".overlay-2-js");

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

// Close the modal when the user clicks outside
overlayModal2.addEventListener("click", function (event) {
    // Check that the element clicked is the overlay itself (and not a child element)
    if (event.target === overlayModal2) {
        closeAllModal();
    }
});

// Display the selected image
document.getElementById("image").addEventListener("change", function (e) {
    const previewContainer = document.querySelector(".image-preview-container");
    const previewImage = document.getElementById("preview-image");
    const fileLabel = document.getElementById("file-label-js");
    const fileInput = e.target;
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
            previewImage.src = e.target.result;
            previewContainer.style.display = "block"; // Show preview
            fileLabel.classList.add("active");
        };

        reader.readAsDataURL(file);
    } else {
        previewImage.src = "#";
        previewContainer.style.display = "none"; // Hide preview
    }
});

// ----------------
document.addEventListener("DOMContentLoaded", function () {
    completedFormChangeColor();
    document
        .getElementById("form-ajout")
        .addEventListener("submit", function (e) {
            e.preventDefault();
            formAjout();
        });
});

function completedFormChangeColor() {
    // Selecting the form and fields
    const form = document.getElementById("form-ajout");
    const imageInput = document.getElementById("image");
    const titreInput = document.getElementById("titre");
    const categorieSelect = document.getElementById("categorie");
    const btnValider = document.getElementById("btn-valider-js");

    // Listen to changes in the fields
    form.addEventListener("input", function () {
        // Check that all fields have been completed
        const isImageFilled = imageInput.files.length > 0;
        const isTitreFilled = titreInput.value.trim() !== "";
        const isCategorieFilled = categorieSelect.value !== "";

        // Update button colour according to field status
        if (isImageFilled && isTitreFilled && isCategorieFilled) {
            btnValider.style.backgroundColor = "#1D6154";
        } else {
            btnValider.style.backgroundColor = "";
        }
    });
}

//* Form validation *//
async function formAjout() {
    console.log("Début de la fonction formAjout");

    // Definition of the API URL
    const url = "http://localhost:5678/api/works";
    // Retrieve values from the form
    const titre = document.getElementById("titre").value;
    const categorie = document.getElementById("categorie").value;
    const authToken = localStorage.getItem("authToken");

    // Check that authToken is not null
    if (!authToken) {
        console.log("Aucun authToken trouvé");
        // "return" to exit the function
        return;
    }

    // Displaying the token
    // console.log("AuthToken:", authToken);

    // Retrieve the image URL
    const fileInput = document.getElementById("image");
    const imageFile = fileInput.files[0];

    // Check that all mandatory fields have been completed
    if (titre && categorie && imageFile) {
        // Create the data object to be sent to the API
        const formData = new FormData();
        formData.append("image", imageFile);
        formData.append("title", titre);
        formData.append("category", categorie);

        // Display formData values
        console.log("Valeurs de formData :");
        for (var value of formData.values()) {
            console.log(value);
        }

        try {
            // Send a POST request to add the new project
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
                body: formData,
            });
            if (response.ok) {
                console.log("Response ok = true");
                console.log(response);
            } else {
                console.log("Response ok = false");
                console.log(response.statusText);
            }
        } catch (error) {
            console.error("Erreur dans la requête fetch :", error.message);
        }
    } else {
        alert("Veuillez remplir tous les champs.");
    }
}
