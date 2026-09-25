const loggedInUser =
    localStorage.getItem("loggedInUser");


// Protect dashboard

if (!loggedInUser) {

    window.location.href = "login.html";
}


// Show username

document.getElementById("userInfo").textContent =
    "You are logged in as " + loggedInUser;


// Logout

document.getElementById("logoutButton")
    .addEventListener("click", function() {

        localStorage.removeItem("loggedInUser");

        window.location.href = "login.html";

    });