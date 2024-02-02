import { dislayProjectsAndUpdate } from "./externalFunction.js";

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
    dislayProjectsAndUpdate();
}

// Close the modal when the close button is clicked
btnClose.addEventListener("click", closeModal);
function closeModal() {
    modalContainer.classList.remove("active");
    dislayProjectsAndUpdate();
    resetPreviewContainer();
}

// Close the modal when the user clicks outside
overlayModal1.addEventListener("click", function (event) {
    // Check that the element clicked is the overlay itself (and not a child element)
    if (event.target === overlayModal1) {
        closeModal();
    }
    resetPreviewContainer();
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
    resetPreviewContainer();
}

// Close the modal2 and the modal1 when the close button is clicked
btnClose2.addEventListener("click", closeAllModal);
function closeAllModal() {
    modalContainer2.classList.remove("active");
    closeModal();
    resetPreviewContainer();
}

// Close the modal when the user clicks outside
overlayModal2.addEventListener("click", function (event) {
    if (event.target === overlayModal2) {
        closeAllModal();
    }
    resetPreviewContainer();
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
            // Show preview
            previewContainer.style.display = "block";
            fileLabel.classList.add("active");
        };

        reader.readAsDataURL(file);
    } else {
        resetPreviewContainer();
    }
});

function resetPreviewContainer() {
    const previewContainer = document.querySelector(".image-preview-container");
    const previewImage = document.getElementById("preview-image");
    const fileLabel = document.getElementById("file-label-js");

    previewImage.src = "#";
    // Hide preview
    previewContainer.style.display = "none";
    fileLabel.classList.remove("active");
}

// ----------------
document.addEventListener("DOMContentLoaded", function () {
    completedFormChangeColor();
    document
        .getElementById("form-ajout")
        .addEventListener("submit", function (e) {
            e.preventDefault();
            formAjout();
            resetPreviewContainer();
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
    form.addEventListener("input", () => {
        // Check that all fields have been completed
        const isImageFilled = imageInput.files.length > 0;
        const isTitreFilled = titreInput.value.trim() !== "";
        const isCategorieFilled = categorieSelect.value !== "";

        // Update button colour according to field status
        if (isImageFilled && isTitreFilled && isCategorieFilled) {
            btnValider.classList.add("btn-ajout-valid");
        } else {
            btnValider.classList.remove("btn-ajout-valid");
        }
    });
}

//* Add project *//
async function formAjout() {
    const url = "http://localhost:5678/api/works";

    // Retrieve values from the form
    const titre = document.getElementById("titre").value;
    const categorie = document.getElementById("categorie").value;
    const authToken = localStorage.getItem("authToken");

    // Retrieve the image URL
    const fileInput = document.getElementById("image");
    const imageFile = fileInput.files[0];

    // Check that all fields have been completed
    if (titre && categorie && imageFile) {
        // Create the data object to be sent to the API
        const formData = new FormData();
        formData.append("image", imageFile);
        formData.append("title", titre);
        formData.append("category", categorie);

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
                body: formData,
            });
            if (response.ok) {
                alert("Nouveau projet ajouté");
                dislayProjectsAndUpdate();
                // window.location.href = "../../index.html";
            } else {
                console.log(response.statusText);
            }
        } catch (error) {
            console.error("Erreur dans la requête fetch :", error.message);
        }
    } else {
        alert("Veuillez remplir tous les champs.");
    }
}
