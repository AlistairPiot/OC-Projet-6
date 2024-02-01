//* Retrieving projects *//
export async function dislayProjectsAndUpdate() {
    try {
        const response = await fetch("http://localhost:5678/api/works");
        const projects = await response.json();

        window.projects = projects;
        filterProjects(0);

        updateProjectsInModal(projects);
    } catch (error) {
        console.error("Erreur lors de la récupération des projets:", error);
    }
}

//* Filter projects based on category *//
export function filterProjects(categoryId) {
    // Get projects from global variable
    const projects = window.projects;

    // Filter projects based on the category
    const filteredProjects =
        categoryId === 0
            ? projects
            : projects.filter((project) => project.categoryId === categoryId);

    // Retrieving the gallery from the DOM
    const gallery = document.querySelector(".gallery");

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

//* Updating projects in the modal *//
function updateProjectsInModal(projects) {
    const gridProjects = document.querySelector(".grid-projects");
    gridProjects.innerHTML = "";

    projects.forEach((project) => {
        const projectElement = document.createElement("figure");
        const imgElement = document.createElement("img");
        const deleteIcon = document.createElement("i");
        const div = document.createElement("div");

        // Add the project ID as custom data (data-id)
        div.setAttribute("data-id", project.id);

        imgElement.src = project.imageUrl;
        imgElement.alt = project.title;
        imgElement.classList.add("img");
        div.classList.add("div-trash");
        deleteIcon.classList.add("fa-solid", "fa-trash-can", "delete-icon");

        projectElement.appendChild(imgElement);
        div.appendChild(deleteIcon);
        projectElement.appendChild(div);

        //Add project to the grid Projects
        gridProjects.appendChild(projectElement);
    });
    deleteProjects();
}

//* Delete a project *//
export function deleteProjects() {
    const url = "http://localhost:5678/api/works/";
    const authToken = localStorage.getItem("authToken");
    const trashButtons = document.querySelectorAll(".div-trash");

    trashButtons.forEach((trashButton) => {
        trashButton.addEventListener("click", async () => {
            try {
                // Retrieving the project ID from the data-id attribute
                const buttonId = trashButton.dataset.id;
                const response = await fetch(url + buttonId, {
                    method: "DELETE",
                    headers: {
                        "Content-type": "application/json",
                        Authorization: `Bearer ${authToken}`,
                    },
                });
                if (response.ok) {
                    alert("Projet supprimé");
                    dislayProjectsAndUpdate();
                } else {
                    console.log(response.statusText);
                }
            } catch (error) {
                console.error(
                    "Erreur dans la suppression d'un projet :",
                    error.message
                );
            }
        });
    });
}
