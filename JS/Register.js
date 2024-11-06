
document.getElementById("register-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const userData = { username, email, password };
    localStorage.setItem("user", JSON.stringify(userData));

    alert("Registration successful! Please login.");
    window.location.href = "Login.html";
});
