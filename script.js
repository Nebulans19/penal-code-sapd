const penalData = {
    "1P": { name: "Theft", jailTime: "30", fine: "500", bail: "1000" },
    "2P": { name: "Assault", jailTime: "60", fine: "700", bail: "1500" },
    "3P": { name: "Vandalism", jailTime: "-", fine: "300", bail: "-" },
    "4P": { name: "Jaywalking", jailTime: "-", fine: "-", bail: "-" },
};

let selectedPenalties = [];

// Populate Penal List Table
function populatePenalList() {
    const penalListTable = document.getElementById("penalList").querySelector("tbody");
    penalListTable.innerHTML = Object.entries(penalData)
        .map(([code, { name, jailTime, fine, bail }]) => `
            <tr>
                <td>${code}</td>
                <td>${name}</td>
                <td>${jailTime}</td>
                <td>$${fine}</td>
                <td>$${bail}</td>
                <td>
                    <button onclick="addToCalculator('${code}')">Add</button>
                </td>
            </tr>
        `)
        .join("");
}

// Add Penal Code to Calculator
function addToCalculator(code) {
    if (!selectedPenalties.includes(code)) {
        selectedPenalties.push(code);
        updateCalculator();
    }
}

// Remove Penal Code from Calculator
function removeFromCalculator(code) {
    selectedPenalties = selectedPenalties.filter(item => item !== code);
    updateCalculator();
}

// Copy Penal Code
function copyPenalty(code, name) {
    navigator.clipboard.writeText(`${code}. ${name}`);
    alert(`Copied: ${code}. ${name}`);
}

// Update Calculator
function updateCalculator() {
    const selectedPenaltiesTable = document.getElementById("selectedPenalties").querySelector("tbody");
    const commandOutput = document.getElementById("commandOutput");

    selectedPenaltiesTable.innerHTML = selectedPenalties
        .map(code => {
            const { name, jailTime, fine, bail } = penalData[code];

            let adjustedJailTime = jailTime;
            if (jailTime === "-") {
                adjustedJailTime = fine !== "-" ? `<span class="ticket">TICKET</span>` : `<span class="tag">TAG</span>`;
            }

            return `
                <tr>
                    <td>${code}</td>
                    <td>${name}</td>
                    <td>${adjustedJailTime}</td>
                    <td>$${fine}</td>
                    <td>$${bail}</td>
                    <td>
                        <button class="copy" onclick="copyPenalty('${code}', '${name}')">Copy</button>
                        <button class="remove" onclick="removeFromCalculator('${code}')">Remove</button>
                    </td>
                </tr>
            `;
        })
        .join("");

    const summary = selectedPenalties.reduce(
        (acc, code) => {
            const { jailTime, fine, bail } = penalData[code];
            acc.jailTime += jailTime !== "-" ? parseInt(jailTime) : 0;
            acc.fine += fine !== "-" ? parseInt(fine) : 0;
            acc.bail += bail !== "-" ? parseInt(bail) : 0;
            return acc;
        },
        { jailTime: 0, fine: 0, bail: 0 }
    );

    document.getElementById("summaryResult").innerHTML = `
        <div class="summary">
            <p>Total: Jail Time: ${summary.jailTime} days | Fine: $${summary.fine} | Bail: $${summary.bail}</p>
            <button onclick="clearCalculator()">Reset</button>
        </div>
    `;

    commandOutput.textContent = `Command: /arrest [PlayerID] ${summary.jailTime} ${summary.fine} ${summary.bail}`;
}

// Clear Calculator
function clearCalculator() {
    selectedPenalties = [];
    updateCalculator();
}

// Filter Penal List
function filterPenalList() {
    const searchValue = document.getElementById("searchInput").value.toLowerCase();
    const penalListTable = document.getElementById("penalList").querySelector("tbody");

    penalListTable.innerHTML = Object.entries(penalData)
        .filter(([code, { name }]) => code.toLowerCase().includes(searchValue) || name.toLowerCase().includes(searchValue))
        .map(([code, { name, jailTime, fine, bail }]) => `
            <tr>
                <td>${code}</td>
                <td>${name}</td>
                <td>${jailTime}</td>
                <td>$${fine}</td>
                <td>$${bail}</td>
                <td>
                    <button onclick="addToCalculator('${code}')">Add</button>
                </td>
            </tr>
        `)
        .join("");
}

// Initial Population
document.addEventListener("DOMContentLoaded", () => {
    populatePenalList();
    updateCalculator();
});
