import { dislayProjectsAndUpdate } from "./externalFunction.js";

//* Modal 1 *//
// Open the modal when the trigger button "modifier" is clicked
function openModal() {
    const btnOpen = document.querySelector(".modal-btn-open-js");
    const modalContainer = document.querySelector(".modal-container-js");
    btnOpen.addEventListener("click", openModal);
    modalContainer.classList.add("active");
    dislayProjectsAndUpdate();
}
openModal();

// Close the modal when the close button is clicked
function closeModal() {
    const btnClose = document.getElementById("icon-close");
    const modalContainer = document.querySelector(".modal-container-js");
    btnClose.addEventListener("click", closeModal);
    modalContainer.classList.remove("active");
    dislayProjectsAndUpdate();
    resetPreviewContainer();
}
closeModal();

// Close the modal when the user clicks outside
function overlayModalOne() {
    const overlayModal1 = document.querySelector(".overlay-js");
    overlayModal1.addEventListener("click", function (event) {
        // Check that the element clicked is the overlay itself (and not a child element)
        if (event.target === overlayModal1) {
            closeModal();
        }
        resetPreviewContainer();
    });
}
overlayModalOne();

// Open the Modal2 the trigger button "Ajouter une photo" is clicked
function btnAjoutOpen() {
    const btnAjout = document.querySelector(".btn-ajout-js");
    btnAjout.addEventListener("click", openModalAjout);
    function openModalAjout() {
        const modalContainer2 = document.querySelector(".modal-container-2-js");
        modalContainer2.classList.add("active");
    }
}
btnAjoutOpen();

// Return to the modal1 when the "returnArrow" is clicked
function closeModalBackArrow() {
    const returnArrow = document.getElementById("icon-return-js");
    returnArrow.addEventListener("click", closeModal2);
    function closeModal2() {
        const modalContainer2 = document.querySelector(".modal-container-2-js");
        modalContainer2.classList.remove("active");
        resetPreviewContainer();
    }
}
closeModalBackArrow();

// Close all modals
function closeAllModal() {
    const modalContainer2 = document.querySelector(".modal-container-2-js");
    modalContainer2.classList.remove("active");
    closeModal();
    resetPreviewContainer();
}

// Close the modal2 and the modal1 when the close button is clicked
function btnCloseCross() {
    const btnClose2 = document.getElementById("icon-close-2");
    btnClose2.addEventListener("click", closeAllModal);
}
btnCloseCross();

// Close the modal when the user clicks outside
function overlayModalTwo() {
    const overlayModal2 = document.querySelector(".overlay-2-js");
    overlayModal2.addEventListener("click", function (event) {
        if (event.target === overlayModal2) {
            closeAllModal();
        }
        resetPreviewContainer();
    });
}
overlayModalTwo();

// Display the selected image
function previewImageOnChange() {
    document.getElementById("image").addEventListener("change", function (e) {
        const previewContainer = document.querySelector(
            ".image-preview-container"
        );
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
}
previewImageOnChange();

function resetPreviewContainer() {
    const previewContainer = document.querySelector(".image-preview-container");
    const previewImage = document.getElementById("preview-image");
    const fileLabel = document.getElementById("file-label-js");

    previewImage.src = "#";
    // Hide preview
    previewContainer.style.display = "none";
    fileLabel.classList.remove("active");
}

function setupFormAjoutListener() {
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
}
setupFormAjoutListener();

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
