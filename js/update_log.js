const message = `
- Added <b>457</b> Car's State Value 😬!!
`;
const update_id = "update_05_12";

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