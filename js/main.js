// Prevent multiple executions
if (typeof window.mainLoaded === 'undefined') {
    window.mainLoaded = true;

    if (localStorage.getItem("auto_login") === "1") {
        sitelogin();
    }
    
    document.addEventListener('DOMContentLoaded', () => {

        document.getElementById("siteNotes").innerText = localStorage.getItem("siteNotes") || "";

    // Access control for AFK Logs tab (keeping this logic)
    const allowedUsers = ["bishalqx980"]; // Add allowed usernames here
    // Assuming 'username' variable is defined elsewhere or retrieved
    const username = "guest"; // Placeholder: Replace with actual username retrieval logic

    // Function to show a specific content section and hide others
    window.showSection = function(sectionId) {
        // If trying to access AFK logs but not allowed (keeping this check)
        if (sectionId === 'afk-logs' && !allowedUsers.includes(username)) {
            showErrorPopup("You are not permitted to access this page.");
            // Optionally redirect to a default section
            window.showSection('car-trade'); // Redirect to Car Ads if not allowed
            return;
        }

        // Hide all content sections
        document.querySelectorAll('.tab-content').forEach(section => {
            section.classList.remove('active');
        });

        // Show the selected content section
        const activeSection = document.getElementById(sectionId);
        if (activeSection) {
            activeSection.classList.add('active');
        }

        // Update active class in the sidebar menu
        document.querySelectorAll('.sidebar-nav a').forEach(link => {
            link.classList.remove('active');
        });
        const activeLink = document.querySelector(`.sidebar-nav a[data-section="${sectionId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }

        // On smaller screens, you might want to scroll the content into view
        if (window.innerWidth <= 768 && activeSection) {
             activeSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    // Add event listeners to the sidebar menu links
    document.querySelectorAll('.sidebar-nav a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default link behavior
            const sectionId = this.getAttribute('data-section');
            if (sectionId) {
                window.showSection(sectionId);
            }
        });
    });


    // Function to show the error popup (keeping this)
    window.showErrorPopup = function(message) {
        const errorPopup = document.getElementById("error-popup");
        if (errorPopup) { // Check if element exists
            const popupContent = errorPopup.querySelector('.popup-content p');
            const errorOkButton = errorPopup.querySelector('.popup-button');

            if (popupContent) popupContent.textContent = message;
            errorPopup.classList.add('show'); // Use class for visibility

            // Remove previous event listeners before adding a new one
            const newOkButton = errorOkButton.cloneNode(true);
            errorOkButton.parentNode.replaceChild(newOkButton, errorOkButton);
            const updatedOkButton = errorPopup.querySelector('.popup-button');


            if (updatedOkButton) {
                 updatedOkButton.addEventListener('click', () => {
                     errorPopup.classList.remove('show');
                 });
            }


            // Close popup when clicking outside (optional, using class for visibility)
            errorPopup.addEventListener('click', (event) => {
                if (event.target === errorPopup) {
                    errorPopup.classList.remove('show');
                }
            });
        } else {
             // Fallback if error popup elements are not found
            alert('Error: ' + message);
        }
    };

    // Show notification for copy success (keeping this)
    window.showNotification = function(message = 'Copied to clipboard!') { // Added default message
        const notification = document.getElementById('notification');
        if (notification) { // Check if element exists
            notification.textContent = message; // Set message
            notification.classList.add('show'); // Use class for visibility
            setTimeout(() => {
                notification.classList.remove('show');
            }, 2000);
        }
    };

    // Close error popup function
    window.closeErrorPopup = function() {
        const errorPopup = document.getElementById("error-popup");
        if (errorPopup) {
            errorPopup.classList.remove('show');
        }
    };

    // Run permission check on page load (keeping this)
    // This will prevent accessing the AFK logs section directly via URL/hash if implemented later
    // and hide the AFK logs card if you add one and the user is not allowed.
    // For now, it just checks if the user is allowed (based on the placeholder username).
    if (!allowedUsers.includes(username)) {
        // If you had an AFK logs card, you would hide it here
        // const afkLogsCard = document.querySelector('.menu-card[data-section="afk-logs"]');
        // if (afkLogsCard) {
        //     afkLogsCard.style.display = 'none';
        // }
    }


    // Handle clicks outside suggestion boxes (keeping this, adjusting selectors if needed)
    document.addEventListener('click', (e) => {
        // Select all suggestion boxes
        document.querySelectorAll('.suggestion-box, .suggestions').forEach(suggestionBox => {
            // Check if the click target is inside the current suggestion box or its associated input
            let isClickInside = suggestionBox.contains(e.target);
            let associatedInput = null;

            // Find the associated input for suggestion-box (used in carAds, houseAds, businessAds)
            if (suggestionBox.id.endsWith('-suggestions')) {
                const inputId = suggestionBox.id.replace('-suggestions', '');
                associatedInput = document.getElementById(inputId);
            }
            // Find the associated input for suggestions (used in items.js)
            if (suggestionBox.classList.contains('suggestions')) {
                 // The input is the previous sibling element within the same input-group
                 associatedInput = suggestionBox.previousElementSibling;
            }


            if (!isClickInside && (!associatedInput || !associatedInput.contains(e.target))) {
                // Hide the suggestion box if the click is outside and not on the associated input
                if (suggestionBox.classList.contains('suggestion-box')) {
                     suggestionBox.style.display = 'none';
                } else if (suggestionBox.classList.contains('suggestions')) {
                     suggestionBox.classList.add('d-none'); // Use d-none for the items.js suggestions
                }
            }
        });
    });


    // Track ad stats locally (keeping this)
    window.updateAdCount = function(type) {
        let counts = localStorage.getItem('adCounts');
        counts = counts ? JSON.parse(counts) : { car: 0, house: 0, clothing: 0, items: 0, business: 0 }; // Added other types
        if (counts[type] !== undefined) { // Check if the type is valid
             counts[type] += 1;
             localStorage.setItem('adCounts', JSON.stringify(counts));

             // Update stats in local storage
             const stats = {
                 username: username,
                 carAds: counts.car,
                 houseAds: counts.house,
                 clothingAds: counts.clothing,
                 itemsAds: counts.items,
                 businessAds: counts.business,
                 totalAds: counts.car + counts.house + counts.clothing + counts.items + counts.business,
                 lastUpdated: new Date().toLocaleString()
             };

             localStorage.setItem('userStats', JSON.stringify(stats));
             return counts[type];
        }
        return -1; // Return -1 if type is invalid
    };

    // Initial state: Hide all content sections and show the default section (e.g., Car Ads)
    document.querySelectorAll('.tab-content').forEach(section => {
        section.classList.remove('active'); // Hide all content sections
    });
    // Show the default section on load
    window.showSection('car-trade'); // Show Car Ads by default

    // Colorful animated extras buttons: toggle .active on label when checked
    document.querySelectorAll('.checkbox-group label').forEach(label => {
        const input = label.querySelector('input[type="checkbox"]');
        if (input) {
            input.addEventListener('change', () => {
                if (input.checked) {
                    label.classList.add('active');
                } else {
                    label.classList.remove('active');
                }
            });
            // Initialize state on load
            if (input.checked) {
                label.classList.add('active');
            }
        }
    });


    // Reset button logic for all sections
    document.querySelectorAll('.reset-button').forEach(btn => {
        btn.addEventListener('click', function() {
            // Find the closest form or section
            const section = btn.closest('.tab-content, form, .form-container');
            if (!section) return;

            // Uncheck all checkboxes and radios
            section.querySelectorAll('input[type="checkbox"], input[type="radio"]').forEach(input => {
                input.checked = false;
                // Remove .active class from labels
                const label = input.closest('label');
                if (label) label.classList.remove('active');
            });

            // Clear all text, number, and email inputs
            section.querySelectorAll('input[type="text"], input[type="number"], input[type="email"], textarea').forEach(input => {
                input.value = '';
            });

            // Optionally reset selects
            section.querySelectorAll('select').forEach(select => {
                select.selectedIndex = 0;
            });

            // Remove output text if present
            const output = section.querySelector('.output-box');
            if (output) output.textContent = '';
        });
    });
});
}

// Hashing using Web Crypto API (SHA-256)
async function sha256(text) {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

async function sitelogin() {
    const local_password_hash = localStorage.getItem("login_password");

    const login_username =
        document.getElementById("login_username").value.trim() ||
        localStorage.getItem("login_username");

    const login_password = document.getElementById("login_password").value;

    const authorized_users = ["bishalqx980"];
    const stored_password_hash = "32ad188ae74bd4f2377fc55ff9f83f55d486971a0da5b39d6d347e2d861502d8";

    // --- USERNAME CHECK ---
    if (!authorized_users.includes(login_username)) {
        alert("Unauthorized user!");
        return;
    }

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

function sitelogout() {
    localStorage.setItem("login_username", "");
    localStorage.setItem("login_password", "");
    localStorage.setItem("auto_login", "0");
    window.location.reload();
}

function saveNote() {
    siteNotes = document.getElementById("siteNotes").value || "";
    localStorage.setItem("siteNotes", siteNotes);
}

function clearNotes() {
    document.getElementById("siteNotes").value = "";
    localStorage.setItem("siteNotes", "");
}

function toggleRecent() {
    const recentVisibility = document.getElementById("recent-log");

    if (recentVisibility.style.display == "none") {
        recentVisibility.style.display = "";
    } else {
        recentVisibility.style.display = "none";
    }
}

function clearRecentHistory() {
    document.getElementById("recent-log-history").innerHTML = "History cleared!";
}
