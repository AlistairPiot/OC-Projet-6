// Fonction pour effectuer la requête Fetch et manipuler les données
async function fetchProjects() {
    try {
        const response = await fetch("http://localhost:5678/api/works");
        const projects = await response.json();

        // Retrieving the gallery from the DOM
        const gallery = document.querySelector(".gallery");

        // Parcourir les projets et ajouter chaque projet à la galerie
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
