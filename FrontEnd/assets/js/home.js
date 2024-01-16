//*--- Step 1.1 : Retrieving jobs from the back-end ---*//
// Function to perform the Fetch request and manipulate the data
async function fetchProjects() {
    try {
        const response = await fetch("http://localhost:5678/api/works");
        const projects = await response.json();

        // Storing projects globally for later use
        window.projects = projects;

        // Call the function to display all projects initially
        filterProjects(0);
    } catch (error) {
        console.error("Erreur lors de la récupération des projets:", error);
    }
}

//*--- Step 1.1 : Project recovery / 1.2 : Function to filter projects based on category ---*//
function filterProjects(categoryId) {
    // Get projects from global variable
    const projects = window.projects;

    // Filter projects based on the category
    const filteredProjects =
        categoryId === 0
            ? projects
            : projects.filter((project) => project.categoryId === categoryId);

    // Retrieving the gallery from the DOM
    const gallery = document.querySelector(".gallery");

    // Check if gallery is not null before clearing its children
    if (gallery) {
        // Clearing the gallery
        while (gallery.firstChild) {
            gallery.removeChild(gallery.firstChild);
        }

        // Add each filtered project to the gallery
        filteredProjects.forEach((project) => {
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
    }
}

// Call the fetchProjects function when the page loads
window.addEventListener("load", fetchProjects);

//*--- Step 1.2 : Add buttons + active class ---*//
// Retrieve the div element with the "group-buttons" class
const groupButtonsDiv = document.getElementById("group-buttons");
// Check if groupButtonsDiv is not null before adding buttons
if (groupButtonsDiv) {
    // Table of button contents
    const buttonLabels = [
        "Tous",
        "Objets",
        "Appartements",
        "Hôtels & restaurants",
    ];

    //*--- Create a set to store unique categories ---*//
    const uniqueCategories = new Set();
    // Loop to create and add buttons to the div
    for (let i = 0; i < buttonLabels.length; i++) {
        let button = document.createElement("button");
        // Add the "active" class to the first button
        button.className = "btn" + (i === 0 ? " active" : "");
        button.textContent = buttonLabels[i];
        groupButtonsDiv.appendChild(button);

        // Add the category to the uniqueCategories set
        uniqueCategories.add(buttonLabels[i]);

        // Add event listener for button click
        button.addEventListener("click", function () {
            // Remove "active" class from all buttons
            const allButtons = groupButtonsDiv.getElementsByClassName("btn");
            for (let j = 0; j < allButtons.length; j++) {
                allButtons[j].classList.remove("active");
            }

            // Add "active" class to the clicked button
            this.classList.add("active");

            // Get the index of the clicked button
            const buttonIndex = Array.from(allButtons).indexOf(this);

            // Filter projects based on the corresponding category
            filterProjects(buttonIndex);
        });
    }
}
