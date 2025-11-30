document.addEventListener("DOMContentLoaded", async function() {
    // Site Json data
    let site_data = JSON.parse(localStorage.getItem("site_data") || "{}");
    
    if (site_data.username && site_data.password) {
        await siteLogin(site_data.username, site_data.password, true);
    }

    // Login
    document.getElementById("login_submit").addEventListener("click", async function() {
        const username = document.getElementById("login_username").value;
        const password = document.getElementById("login_password").value;

        let response = await siteLogin(username, password);

        if (response) {
            site_data.username = username;
            site_data.password = response; // whcih is password hash

            localStorage.setItem("site_data", JSON.stringify(site_data));
        }
    })
})

async function siteLogin(username, password, is_hash = false) {
    const authorized_usernames = [
        "bishalqx980",
        "employee69"
    ];

    const authorized_password_hashs = [
        "32ad188ae74bd4f2377fc55ff9f83f55d486971a0da5b39d6d347e2d861502d8",
        "dd486405220c65c6ebae10982ef75bce7f8e4999dfa2d5fdce56536d7acd1b83"
    ];

    let password_hash;

    if (is_hash) {
        password_hash = password;
    } else {
        password_hash = await sha256(password);
    }
    
    if (!authorized_usernames.includes(username)) {
        alert("Unauthorized user!");
        return;
    }

    if (!authorized_password_hashs.includes(password_hash)) {
        alert("Incorrect password!");
        return;
    }

    const login_div = document.getElementById("login_div");
    login_div.style.display = "none";

    console.log("Login successful!");
    return password_hash;
}