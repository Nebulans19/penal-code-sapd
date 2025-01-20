// Data Penal Code
const penalData = {
    "1P": { name: "Theft", jailTime: 30, fine: 500, bail: 1000 },
    "1C": { name: "Assault", jailTime: 60, fine: 1000, bail: 2000 },
    "8A": { name: "Drug Trafficking", jailTime: 120, fine: 5000, bail: 10000 },
    "2B": { name: "Fraud", jailTime: "-", fine: 3000, bail: 5000 },
    "3D": { name: "Arson", jailTime: "-", fine: "-", bail: 15000 },
    // Tambahkan data lainnya jika diperlukan
};

// Penyimpanan data penal yang dipilih
let selectedPenalties = [];
let summary = { jailTime: 0, fine: 0, bail: 0 };

// Fungsi untuk menampilkan daftar pasal
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
                <td>$${fine}</td>
                <td>$${bail}</td>
                <td><button onclick="addToCalculator('${code}')">Add</button></td>
            </tr>
        `;
    });
}

// Fungsi menambahkan pasal ke kalkulator
function addToCalculator(code) {
    if (selectedPenalties.includes(code)) return;

    selectedPenalties.push(code);
    const { jailTime, fine, bail } = penalData[code];

    // Tangani kasus jailTime "-" dengan kondisi "ticket" atau "tag"
    let adjustedJailTime = jailTime;
    if (jailTime === "-") {
        if (fine !== "-") {
            adjustedJailTime = "ticket";
        } else {
            adjustedJailTime = "tag";
        }
    }

    summary.jailTime += adjustedJailTime === "ticket" || adjustedJailTime === "tag" ? 0 : jailTime;
    summary.fine += fine === "-" ? 0 : fine;
    summary.bail += bail === "-" ? 0 : bail;

    updateCalculator();
}

// Fungsi memperbarui tampilan kalkulator
function updateCalculator() {
    const selectedPenaltiesTable = document.getElementById("selectedPenalties");
    const commandOutput = document.getElementById("commandOutput");

    selectedPenaltiesTable.innerHTML = selectedPenalties
        .map(code => {
            const { name, jailTime, fine, bail } = penalData[code];

            // Tangani kasus jailTime "-" dengan kondisi "ticket" atau "tag"
            let adjustedJailTime = jailTime;
            if (jailTime === "-") {
                if (fine !== "-") {
                    adjustedJailTime = "ticket";
                } else {
                    adjustedJailTime = "tag";
                }
            }

            return `
                <tr>
                    <td>${code}</td>
                    <td>${name}</td>
                    <td>${adjustedJailTime}</td>
                    <td>$${fine}</td>
                    <td>$${bail}</td>
                    <td>
                        <button onclick="copyPenalty('${code}', '${name}')">Copy</button>
                        <button onclick="removeFromCalculator('${code}')">Remove</button>
                    </td>
                </tr>
            `;
        })
        .join("");

    document.getElementById("summaryResult").textContent = `Total Jail Time: ${summary.jailTime} days | Fine: $${summary.fine} | Bail: $${summary.bail}`;
    commandOutput.textContent = `Command: /arrest [PlayerID] ${summary.jailTime} ${summary.fine} ${summary.bail}`;
}

// Fungsi menghapus pasal dari kalkulator
function removeFromCalculator(code) {
    selectedPenalties = selectedPenalties.filter(item => item !== code);

    const { jailTime, fine, bail } = penalData[code];

    let adjustedJailTime = jailTime;
    if (jailTime === "-") {
        if (fine !== "-") {
            adjustedJailTime = "ticket";
        } else {
            adjustedJailTime = "tag";
        }
    }

    summary.jailTime -= adjustedJailTime === "ticket" || adjustedJailTime === "tag" ? 0 : jailTime;
    summary.fine -= fine === "-" ? 0 : fine;
    summary.bail -= bail === "-" ? 0 : bail;

    updateCalculator();
}

// Fungsi menghapus semua pasal dari kalkulator
function clearCalculator() {
    selectedPenalties = [];
    summary = { jailTime: 0, fine: 0, bail: 0 };
    updateCalculator();
}

// Fungsi menyalin command
function copyCommand() {
    const commandOutput = document.getElementById("commandOutput");
    navigator.clipboard.writeText(commandOutput.textContent);
    alert("Command copied!");
}

// Fungsi menyalin pasal
function copyPenalty(code, name) {
    const textToCopy = `${code}. ${name}`;
    navigator.clipboard.writeText(textToCopy);
    alert("Penalty copied: " + textToCopy);
}

// Fungsi pencarian pasal
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
                    <td>$${fine}</td>
                    <td>$${bail}</td>
                    <td><button onclick="addToCalculator('${code}')">Add</button></td>
                </tr>
            `;
        });
}

// Tampilkan daftar pasal saat halaman dimuat
document.addEventListener("DOMContentLoaded", displayPenalList);
