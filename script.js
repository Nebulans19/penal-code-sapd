// Data Penal Code
const penalData = {
    "1P": { name: "Theft", jailTime: 30, fine: 500, bail: 1000 },
    "1C": { name: "Assault", jailTime: 60, fine: 1000, bail: 2000 },
    "8A": { name: "Drug Trafficking", jailTime: 120, fine: 5000, bail: 10000 },
    "2B": { name: "Fraud", jailTime: "-", fine: 3000, bail: "-" },
    "3D": { name: "Arson", jailTime: "-", fine: "-", bail: "-" },
    // Tambahkan data lain di sini
};

// Penyimpanan data penal yang dipilih
let selectedPenalties = [];
let summary = { jailTime: 0, fine: 0, bail: 0 };

// Fungsi menampilkan daftar pasal
function displayPenalList() {
    const penalList = document.getElementById("penalList");
    penalList.innerHTML = "";

    Object.keys(penalData).forEach(code => {
        const { name, jailTime, fine, bail } = penalData[code];
        penalList.innerHTML += `
            <tr>
                <td>${code}</td>
                <td>${name}</td>
                <td>${jailTime}</td>
                <td>${fine}</td>
                <td>${bail}</td>
                <td><button onclick="addToCalculator('${code}')">Add</button></td>
            </tr>
        `;
    });
}

// Tambahkan penal code ke kalkulator
function addToCalculator(code) {
    if (selectedPenalties.includes(code)) return;

    selectedPenalties.push(code);
    const penalty = penalData[code];
    const jailTime = penalty.jailTime === "-" ? (penalty.fine !== "-" ? "ticket" : "tag") : penalty.jailTime;

    if (jailTime !== "ticket" && jailTime !== "tag") {
        summary.jailTime += jailTime;
    }
    if (penalty.fine !== "-") summary.fine += penalty.fine;
    if (penalty.bail !== "-") summary.bail += penalty.bail;

    updateCalculator();
}

// Perbarui tampilan kalkulator
function updateCalculator() {
    const selectedPenaltiesTable = document.getElementById("selectedPenalties");
    const commandOutput = document.getElementById("commandOutput");

    selectedPenaltiesTable.innerHTML = selectedPenalties
        .map(code => {
            const { name, jailTime, fine, bail } = penalData[code];
            const displayJailTime = jailTime === "-" ? (fine !== "-" ? "ticket" : "tag") : `${jailTime} days`;

            return `
                <tr>
                    <td>${code}</td>
                    <td>${name}</td>
                    <td>${displayJailTime}</td>
                    <td>${fine !== "-" ? `$${fine}` : "-"}</td>
                    <td>${bail !== "-" ? `$${bail}` : "-"}</td>
                    <td><button onclick="removeFromCalculator('${code}')">Remove</button></td>
                </tr>
            `;
        })
        .join("");

    document.getElementById("summaryResult").textContent = `Total Jail Time: ${summary.jailTime} days | Fine: $${summary.fine} | Bail: $${summary.bail}`;
    commandOutput.textContent = `Command: /arrest [PlayerID] ${summary.jailTime} ${summary.fine} ${summary.bail}`;
}

// Fungsi untuk menyalin command
function copyCommand() {
    const command = document.getElementById("commandOutput").textContent;
    navigator.clipboard.writeText(command).then(() => alert("Command copied!"));
}

// Fungsi untuk menyalin daftar pasal
function copyPenalList() {
    const list = selectedPenalties
        .map(code => `${code}. ${penalData[code].name}`)
        .join("\n");

    navigator.clipboard.writeText(list).then(() => alert("Penal list copied!"));
}

// Fungsi menghapus pasal dari kalkulator
function removeFromCalculator(code) {
    selectedPenalties = selectedPenalties.filter(item => item !== code);

    const penalty = penalData[code];
    const jailTime = penalty.jailTime === "-" ? 0 : penalty.jailTime;

    if (jailTime !== "ticket" && jailTime !== "tag") {
        summary.jailTime -= jailTime;
    }
    if (penalty.fine !== "-") summary.fine -= penalty.fine;
    if (penalty.bail !== "-") summary.bail -= penalty.bail;

    updateCalculator();
}

// Fungsi untuk membersihkan kalkulator
function clearCalculator() {
    selectedPenalties = [];
    summary = { jailTime: 0, fine: 0, bail: 0 };
    updateCalculator();
}

// Fungsi untuk mencari penal code
function searchPenalCode() {
    const input = document.getElementById("searchInput").value.toLowerCase();
    const penalList = document.getElementById("penalList");
    penalList.innerHTML = "";

    Object.keys(penalData)
        .filter(code => code.toLowerCase().includes(input) || penalData[code].name.toLowerCase().includes(input))
        .forEach(code => {
            const { name, jailTime, fine, bail } = penalData[code];
            penalList.innerHTML += `
                <tr>
                    <td>${code}</td>
                    <td>${name}</td>
                    <td>${jailTime}</td>
                    <td>${fine}</td>
                    <td>${bail}</td>
                    <td><button onclick="addToCalculator('${code}')">Add</button></td>
                </tr>
            `;
        });
}

// Inisialisasi
document.addEventListener("DOMContentLoaded", displayPenalList);
