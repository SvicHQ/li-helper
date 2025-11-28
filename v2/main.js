document.addEventListener("DOMContentLoaded", function() {
    // Login
    document.getElementById("login_submit").addEventListener("click", function() {
        const authorized_users = ["bishalqx980"];
        const stored_password_hash = "32ad188ae74bd4f2377fc55ff9f83f55d486971a0da5b39d6d347e2d861502d8";

        const username = document.getElementById("login_username").value;
        const password = document.getElementById("login_password").value;

        if (!authorized_users.includes(login_username)) {
            alert("Unauthorized user!");
            return;
        }

        if 
    })
})




async function sitelogin() {
    const local_password_hash = localStorage.getItem("login_password");

    const login_username =
        document.getElementById("login_username").value.trim() ||
        localStorage.getItem("login_username");

    const login_password = document.getElementById("login_password").value;

    

    // --- USERNAME CHECK ---
    

    // --- PASSWORD HASH CHECK ---
    let entered_hash;

    if (local_password_hash) {
        // Already logged in before
        entered_hash = local_password_hash;
    } else {
        // First-time login → hash the typed password
        entered_hash = await sha256(login_password);
    }

    if (entered_hash !== stored_password_hash) {
        alert("Incorrect password!");
        return;
    }

    // --- SUCCESS ---
    console.log("Login successful!");
    document.getElementById("login-screen").style.display = "none";
    document.getElementById("main-app").style.display = "";

    // Save login
    localStorage.setItem("login_username", login_username);
    localStorage.setItem("login_password", entered_hash);
    localStorage.setItem("auto_login", "1");
}
