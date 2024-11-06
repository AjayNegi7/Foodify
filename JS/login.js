
document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault();

    
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    
    const userData = JSON.parse(localStorage.getItem("user"));

    
    if (userData && userData.email === email && userData.password === password) {
        // Successfully logged in
        alert("Login successful!");
        window.location.href = "Home.html"; 
    } else {
        alert("Invalid email or password!");
    }
});
