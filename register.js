const form = document.getElementById("registerForm");
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


form.addEventListener("submit", async function(event) {

    event.preventDefault();


    const username =
        document.getElementById("username").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const password =
        document.getElementById("password").value;


    // Password validation

    if (password.length < 8) {

        message.textContent =
            "Password must contain at least 8 characters.";

        return;
    }


    if (!/[0-9]/.test(password)) {

        message.textContent =
            "Password must contain at least one number.";

        return;
    }


    // Get existing users

    const users =
        JSON.parse(localStorage.getItem("users")) || [];


    // Duplicate check

    const userExists = users.some(user =>
        user.username.toLowerCase() === username.toLowerCase() ||
        user.email.toLowerCase() === email.toLowerCase()
    );


    if (userExists) {

        message.textContent =
            "Username or email already exists.";

        return;
    }


    // Hash password

    const hashedPassword =
        await hashPassword(password);


    // Create user

    const newUser = {

        username: username,

        email: email,

        password: hashedPassword
    };


    users.push(newUser);


    // Save user

    localStorage.setItem(
        "users",
        JSON.stringify(users)
    );


    message.style.color = "green";

    message.textContent =
        "Registration successful!";


    form.reset();


    setTimeout(() => {

        window.location.href = "login.html";

    }, 1000);

});