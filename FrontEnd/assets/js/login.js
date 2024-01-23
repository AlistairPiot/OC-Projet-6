//*--- Step 2.2 : User authentication ---*//
//The event is triggered when the entire DOM is loaded and ready to be manipulated by the script
document.addEventListener("DOMContentLoaded", function () {
    // Attach a submit event listener to the login form
    document
        .querySelector("#form-login")
        .addEventListener("submit", function (e) {
            e.preventDefault();
            loginUser();
        });
});

async function loginUser() {
    // Definition of the API URL
    const url = "http://localhost:5678/api/users/login";

    // Retrieve user input from the form
    const emailInput = document.querySelector("#email"); // Update with your actual input IDs

    const passwordInput = document.querySelector("#password"); // Update with your actual input IDs

    // Data to be sent in the request body (credential information)
    const data = {
        email: emailInput.value,
        password: passwordInput.value,
    };

    try {
        // Using the fetch function to make an HTTP POST request
        const response = await fetch(url, {
            method: "POST", // Specifying the HTTP method
            headers: {
                Accept: "application/json", // Indicating that the client accepts responses in JSON format

                "Content-Type": "application/json", // Indicating the content type of the request as JSON
            },
            body: JSON.stringify(data), // Converting the data to JSON and sending it in the request body
        });
        // alert("Vous êtes connecté ^^");
        if (response.ok) {
            // Handling the successful response
            const responseData = await response.json();

            // Store the authentication token in localStorage
            localStorage.setItem("authToken", responseData.token);

            // Redirect to the home page
            window.location.href = "../../index.html";

            // Check if the user is authenticated and show the "edition" div
            checkAuthentication();
        } else {
            // Handling unsuccessful response (for exemple, invalid credentials)
            const errorData = await response.json();
            console.error("Error during login:", errorData.message);
            alert("Erreur dans l’identifiant ou le mot de passe");
        }
    } catch (error) {
        // Handling errors during the request
        console.error("Error during the request:", error);
    }
}

// Function to check if the user is authenticated and show the "edition" div
function checkAuthentication() {
    // Retrieve the "edition" div container
    const editionContainer = document.getElementById("edition");
    const editMode = document.querySelector(".edit-mode");
    const groupButtons = document.querySelector(".group-buttons");

    // Check if the authentication token is present in localStorage
    const authToken = localStorage.getItem("authToken");

    if (editionContainer && editMode) {
        // Check if the element exists before manipulating its style
        if (authToken) {
            // User is authenticated, show the "edition" div
            editionContainer.style.display = "flex";
            editMode.style.display = "flex";
            groupButtons.style.display = "none";
        } else {
            editionContainer.style.display = "none";
            editMode.style.display = "none";
            groupButtons.style.display = "flex";
        }
    } else {
        console.error("Element with ID 'edition' not found.");
    }
}

// Call the checkAuthentication function when the page loads
window.addEventListener("load", checkAuthentication);
