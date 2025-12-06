const message = `
- Added dark mode (beta)
To change the theme, goto About section and you will see the button for changing theme.
`;
const update_id = "update_06_12";

function updateLog() {
    const status = localStorage.getItem(update_id);
    const newUpdate = document.getElementById("newUpdate");
    const newUpdatelog = document.getElementById("newUpdatelog");

    if (!status) {
        newUpdate.style.display = "";
        newUpdatelog.innerHTML = message + `
        <br><br>
        Please donate for my hard work!! Bank ID: '428032',. Thanks ❤️
        <br>
        Reload the page to remove me :)
        `;

        localStorage.setItem(update_id, "1");
    }
}