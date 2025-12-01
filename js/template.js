const items = [
];

const input = document.getElementById("itemInput");
const listBox = document.getElementById("dropdownList");

let filtered = [];
let activeIndex = -1;

function renderList() {
    listBox.innerHTML = "";
    if (filtered.length === 0) {
        listBox.classList.add("hidden");
        return;
    }

    filtered.forEach((item, i) => {
        const li = document.createElement("li");
        li.textContent = item;

        if (i === activeIndex) li.classList.add("active");

        li.onclick = () => {
            input.value = item;
            listBox.classList.add("hidden");
        };
        listBox.appendChild(li);
    });

    listBox.classList.remove("hidden");
}

input.addEventListener("input", () => {
    const value = input.value.toLowerCase();
    activeIndex = -1;
    filtered = items.filter(name => name.toLowerCase().includes(value));
    renderList();
});

input.addEventListener("keydown", (e) => {
    if (listBox.classList.contains("hidden")) return;

    if (e.key === "ArrowDown") {
        activeIndex = Math.min(activeIndex + 1, filtered.length - 1);
        renderList();
    }

    if (e.key === "ArrowUp") {
        activeIndex = Math.max(activeIndex - 1, 0);
        renderList();
    }

    if (e.key === "Enter" && activeIndex >= 0) {
        input.value = filtered[activeIndex];
        listBox.classList.add("hidden");
    }
});

document.addEventListener("click", e => {
    if (!e.target.closest(".autocomplete-box")) {
        listBox.classList.add("hidden");
    }
});

// COPY BUTTON
document.getElementById("template_copy").addEventListener("click", () => {
    const value = document.getElementById("itemInput").value;
    const template_copy = document.getElementById("template_copy");
    const template_output = document.getElementById("template_output");

    if (!value.trim()) {
        template_output.innerHTML = "Nothing to copy!";
        return;
    }

    navigator.clipboard.writeText(value)
        .then(() => {
            template_copy.querySelector("span").innerText = "Copied!";
            template_output.innerHTML = "✅ Copied: <br>" + value;

            setTimeout(() => {
                template_copy.querySelector("span").innerText = "Copy!";
            }, 1500);
        })
        .catch(() => {
            template_output.innerHTML = "Failed to copy, report the issue to ISTIAK (@bishalqx980)";
        });
});


// RESET BUTTON
document.getElementById("template_reset").addEventListener("click", () => {
    const input = document.getElementById("itemInput");
    input.value = "";
    activeIndex = -1;
    filtered = [];
    renderList(); // hides dropdown
});
