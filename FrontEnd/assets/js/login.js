//*--- Step 2.2 : User authentication ---*//
//The event is triggered when the entire DOM is loaded and ready to be manipulated by the script
function setupLoginFormListener() {
    document.addEventListener("DOMContentLoaded", function () {
        // Attach a submit event listener to the login form
        const formLogin = document.getElementById("form-login");
        formLogin.addEventListener("submit", function (e) {
            e.preventDefault();
            loginUser();
        });
        console.log(formLogin);
    });
}
setupLoginFormListener();

async function loginUser() {
    const url = "http://localhost:5678/api/users/login";

    // Retrieve user input from the form
    const emailInput = document.querySelector("#email");

    const passwordInput = document.querySelector("#password");

    // Data to be sent in the request body (credential information)
    const data = {
        email: emailInput.value,
        password: passwordInput.value,
    };

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        if (response.ok) {
            const responseData = await response.json();

            // Store the authentication token in localStorage
            localStorage.setItem("authToken", responseData.token);
            console.log(responseData.token);

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

// Function to check if the user is authenticated and show the "edition" and "modify" parts
function checkAuthentication() {
    // Retrieve the "edition" div container
    const editionContainer = document.getElementById("edition");
    const editMode = document.querySelector(".edit-mode");
    const groupButtons = document.querySelector(".group-buttons");
    const login = document.querySelector(".login-js");
    const logout = document.querySelector(".logout-js");

    // Check if the authentication token is present in localStorage
    const authToken = localStorage.getItem("authToken");

    if (editionContainer && editMode) {
        // Check if the element exists before manipulating its style
        if (authToken) {
            // User is authenticated, show the "edition" div
            editionContainer.style.display = "flex";
            editMode.style.display = "flex";
            groupButtons.style.display = "none";
            login.style.display = "none";
        } else {
            editionContainer.style.display = "none";
            editMode.style.display = "none";
            groupButtons.style.display = "flex";
            logout.style.display = "none";
        }
    } else {
        console.error("Element with ID 'edition' not found.");
    }
}

checkAuthentication();

// Function Logout
function logout() {
    const logoutButton = document.querySelector(".logout-js");

    logoutButton.addEventListener("click", (e) => {
        e.preventDefault();
        localStorage.removeItem("authToken");

        window.location.href = "../../index.html";
    });
}
logout();
