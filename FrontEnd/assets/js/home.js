import { fetchProjectsAndUpdate } from "./common.js";

// Call the fetchProjects function when the page loads
window.addEventListener("load", fetchProjectsAndUpdate);

//*--- Step 1.2 : Add buttons + active class ---*//
// Retrieve the div element with the "group-buttons" class
const groupButtonsDiv = document.getElementById("group-buttons");
// Table of button contents
const buttonLabels = ["Tous", "Objets", "Appartements", "Hôtels & restaurants"];

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
