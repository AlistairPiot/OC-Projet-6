// common.js

async function fetchProjectsAndUpdate() {
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

// Fonction pour mettre à jour les projets dans la modal
function updateProjectsInModal(projects) {
    const gridProjects = document.querySelector(".grid-projects");
    gridProjects.innerHTML = "";

    projects.forEach((project) => {
        // ... (votre code actuel pour ajouter des projets à la modal)
    });
    deleteWorks(); // Assurez-vous d'appeler deleteWorks après la mise à jour des projets
}
