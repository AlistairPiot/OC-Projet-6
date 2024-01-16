//*--- Step 2.2 : User authentication ---*//
// Retrieve the form
/*
document
    .querySelector('.form-login input[type="submit"]')
    .addEventListener("click", function () {
        for (let input of document.querySelectorAll(
            '.form-login input[type="submit"],.form-login input[type="password"'
        )) {
            input.setCustomValidity("hello");
            input.reportValidity();
        }
    });   
*/

document
    .querySelector("#form-login")
    .addEventListener("submit", function (event) {
        // Prevent the form from being sent by default
        event.preventDefault();

        // Set the valid variable to true
        let valid = true;

        // Browse all input fields except the "submit" field
        for (let input of this.querySelectorAll('input:not([type="submit"])')) {
            // Check if the field is empty
            if (input.value.trim() === "") {
                valid = false;
                break;
            }

            valid &= input.reportValidity();
            if (!valid) {
                break;
            }
        }

        if (valid) {
            alert("Votre login a bien été validé !");
            // Redirect to index.html
            window.location.href = "../../index.html";
        } else {
            alert("Veuillez remplir tous les champs correctement.");
        }
    });
