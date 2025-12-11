const items = [
    "Looking for a family.",
    "Looking for family members.",
    "Looking for family friends.",
    "Looking for friends.",
    "Looking for PERSON_NAME.",
    "Looking for a friend.",
    "Looking for a wife.",
    "Looking for a husband.",
    "Looking for a girlfriend.",
    "Looking for a boyfriend.",
    "Looking for a date.",
    "Looking for a job as a JOB_NAME. Salary: $5.000",
    "Looking for a job. Salary: Negotiable.",
    "Looking for a party.",
    "Pool party at house №100.",
    "Selling attack juices in bulk. Price: Negotiable.",
    "Hiring workers at construction site. Salary: Negotiable.",
    "Hiring workers at construction site №1, on Vespucci Boulevard. Salary: Negotiable.",
    "Hiring workers at construction site №2, on Calais Avenue. Salary: Negotiable.",
    "Hiring workers at construction site №3, in Pillbox Hill. Salary: Negotiable.",
    "Hiring workers at construction site №4, in Mirror Park. Salary: Negotiable.",
    "Hiring a driver with 3 years of experience at construction site №2, on Calais Avenue. Salary: Negotiable.",
    "Hiring a DJ. Salary: $100.000 per hour.",
    "Hiring a bodyguard. Salary: $100.000 per day.",
    "Looking for work as a trucker with 3 years of experience. Salary: Negotiable.",
    "Looking for work as a driver with 2 years of experience. Salary: Negotiable.",
    "Hiring a driver with 3 years of experience. Salary: $10.000 per hour.",
    "Looking to play poker. Bet: Negotiable.",
    "Hiring a gardener. Salary: $40.000",
    "Hiring a bodyguard. Salary: $50.000",
    "Hiring a firefighter. Salary: $10.000",
    "Hiring professional dancers. Salary: Negotiable. ",
    "Hiring workers for solar panel plantation. Salary: Negotiable.",
    "Hiring workers for solar panel plantation. Salary: $10.000",
    "Hiring workers for collector job. Salary: Negotiable.",
    "Looking for a job to plant a solar panel. Salary: Negotiable.",
    "Looking for a job at the construction site. Salary: Negotiable.",
    "Looking for work as a lawyer. Salary: Negotiable.",
    "Hiring a DJ. Salary: $100.000 per hour.",
    "Hiring a personal assistant. Salary: Negotiable.",
    "Hiring a lawyer. Salary: Negotiable.",
    "Hiring a personal assistant. Salary: Negotiable.",
    "Selling a variety of items for good prices at beach market shop №27.",
    "Selling juices for good prices at beach market shop №21.",
    "Chip tuning №4 is offering a 50% discount all day. Call us for discounts.",
    "Selling desert scarf mask for good price at beach market shop №23.",
    "Juice shop №166 is offering 50% off on all juices!",
    "Selling a special license plate. Price: Negotiable.",
    "Selling license plate (1ABC234). Price: Negotiable.",
    "Selling houses №213 and №767. Price: Negotiable.",
    "Selling a sim-card with number XX-XX-XXX. Price: Negotiable.",
    "Selling sim-cards with numbers XX-XX-XXX and XX-XX-XXX. Price: Negotiable.",
    "Selling a variety of items at private market stall next to Paleto Bay Parking.",
    "Selling juices for good prices at private market stall next to Pillbox/Sandy Hospital.",
    "Selling grand tickets for good prices at private market stall next to house №1332.",
    "Selling a flag. Price: Negotiable.",
    "Looking to race. Bet: Negotiable.",
    "Selling repair kits. Price: Negotiable.",
    "Selling milk. Price: Negotiable.",
    "Party at house №562.",
    "Party at the beach.",
    "Looking for an opponent for Fight Club.",
    "Selling a mansion. Price: Negotiable.",
    "Selling mansion №25. Price: Negotiable.",
    "Renting out house №758. Rent: Negotiable.",
    "Renting out a house. Rent: Negotiable.",
    "Renting out a house. Rent: $200.000 for 7 days.",
    "Renting out a house. Rent: $200.000 per week.",
    "Selling a Casino penthouse. Price: Negotiable.",
    "Selling Casino penthouse №123. Price: Negotiable.",
    "Buying an electric car. Budget: Negotiable.",
    "Selling a car.",
    "Selling a motorbike.",
    "Selling a bike.",
    "Selling a motorcycle.",
    "Selling a plane.",
    "Selling a helicopter.",
    "Selling a boat.",
    // Reject Reasons
    "Cannot advertise more than 2 properties at a time.",
    "Cannot advertise more than 1 vehicle at a time.",
    "Cannot advertise more than 1 business at a time.",
    "Cannot advertise more than 3 items at a time.",
    "Cannot advertise more than one item category at a time.",
    "Cannot promote illegal items.",
    "Cannot look for gods.",
    "Can not look for leaders/deputy leaders of state organisations.",
    "Improper AD format.",
    "Template not found. Please contact LI to create a template.",
    "Person not found in the database. Please submit proof of existence in the LI emails.",
    "Item not found in the database. Please submit proof of tradeability in the LI emails.",
    "Vehicle not found in the database. Please submit proof of tradeability in the LI emails.",
    "Please provide proof of being tradable.",
    "Technical issues with the template. Please open a ticket in the LI emails regarding this.",
    "Template expired. Please open a ticket in the LI emails regarding this.",
    "Improper or invalid trading advertisement. ",
    "Technical issue, please request refund in LI emails.",
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
