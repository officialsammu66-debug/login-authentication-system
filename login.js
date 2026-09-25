const loginForm = document.getElementById("loginForm");
const message = document.getElementById("message");


async function hashPassword(password) {

    const data = new TextEncoder().encode(password);

    const hash = await crypto.subtle.digest(
        "SHA-256",
        data
    );

    return Array.from(new Uint8Array(hash))
        .map(byte => byte.toString(16).padStart(2, "0"))
        .join("");
}


loginForm.addEventListener("submit", async function(event) {

    event.preventDefault();


    const loginInput =
        document.getElementById("loginInput").value.trim();

    const password =
        document.getElementById("loginPassword").value;


    if (loginInput === "" || password === "") {

        message.textContent =
            "Please fill in all fields.";

        return;
    }


    const users =
        JSON.parse(localStorage.getItem("users")) || [];


    const hashedPassword =
        await hashPassword(password);


    const user = users.find(user =>

        (
            user.username.toLowerCase() ===
            loginInput.toLowerCase()
            ||
            user.email.toLowerCase() ===
            loginInput.toLowerCase()
        )

        &&
        
        user.password === hashedPassword
    );


    if (!user) {

        message.textContent =
            "Invalid username/email or password.";

        return;
    }


    // Create login session

    localStorage.setItem(
        "loggedInUser",
        user.username
    );


    window.location.href = "dashboard.html";

});