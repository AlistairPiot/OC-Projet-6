/*--- Step 1.1 : Retrieving jobs from the back-end ---*/
// Function to perform the Fetch request and manipulate the data
async function fetchProjects() {
    try {
        const response = await fetch("http://localhost:5678/api/works");
        const projects = await response.json();

        // Retrieving the gallery from the DOM
        const gallery = document.querySelector(".gallery");

        // Browse projects and add each project to the gallery
        projects.forEach((project) => {
            const projectElement = document.createElement("figure");
            const imgElement = document.createElement("img");
            const figcaptionElement = document.createElement("figcaption");

            imgElement.src = project.imageUrl;
            imgElement.alt = project.title;

            figcaptionElement.textContent = project.title;

            projectElement.appendChild(imgElement);
            projectElement.appendChild(figcaptionElement);

            // Add project to gallery
            gallery.appendChild(projectElement);
        });
    } catch (error) {
        console.error("Erreur lors de la récupération des projets:", error);
    }
}

// Call the fetchProjects function when the page loads
window.addEventListener("load", fetchProjects);

/* ---------- NEXT STEP ----------*/
/*--- Step 1.2 : Filtering the work ---*/
// Retrieve the div element with the "group-buttons" class
const groupButtonsDiv = document.getElementById("group-buttons");

// Table of button contents
const buttonLabels = ["Tous", "Objets", "Appartements", "Hôtels & restaurants"];

// Loop to create and add buttons to the div
for (let i = 0; i < buttonLabels.length; i++) {
    let button = document.createElement("button");
    // Add the "active" class to the first button
    button.className = "btn" + (i === 0 ? " active" : "");
    button.textContent = buttonLabels[i];
    groupButtonsDiv.appendChild(button);

    // Ajouter un gestionnaire d'événements pour le clic sur le bouton
    button.addEventListener("click", function () {
        // Supprimer la classe "active" de tous les boutons
        const allButtons = groupButtonsDiv.getElementsByClassName("btn");
        for (let j = 0; j < allButtons.length; j++) {
            allButtons[j].classList.remove("active");
        }

        // Ajouter la classe "active" au bouton cliqué
        this.classList.add("active");
    });
}
