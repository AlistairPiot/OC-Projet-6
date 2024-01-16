//*--- Step 2.2 : User authentication ---*//
// Retrieve the form
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
