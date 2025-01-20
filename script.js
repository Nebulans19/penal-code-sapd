// Data Penal Code
const penalData = {
    "1P": { name: "Theft", jailTime: 30, fine: 500, bail: 1000 },
    "1C": { name: "Assault", jailTime: 60, fine: 1000, bail: 2000 },
    "8A": { name: "Drug Trafficking", jailTime: 120, fine: 5000, bail: 10000 },
    "2B": { name: "Fraud", jailTime: 90, fine: 3000, bail: 5000 },
    "3D": { name: "Arson", jailTime: 180, fine: 7000, bail: 15000 },
    // Tambahkan data lain di sini
};

// Penyimpanan sementara untuk kalkulator
let summary = { jailTime: 0, fine: 0, bail: 0 };

// Fungsi pencarian penal code
function searchPenalCode() {
    const input = document.getElementById("searchInput").value.toLowerCase();
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";

    // Cari berdasarkan kode atau deskripsi
    const results = Object.keys(penalData).filter(
        code =>
            code.toLowerCase().includes(input) ||
            penalData[code].name.toLowerCase().includes(input)
    );

    if (results.length === 0) {
        resultsDiv.innerHTML = "<p>No matching penal codes found.</p>";
        return;
    }

    results.forEach(code => {
        const { name, jailTime, fine, bail } = penalData[code];
        resultsDiv.innerHTML += `
            <div class="result">
                <h3>${code}: ${name}</h3>
                <p>Jail Time: ${jailTime} days</p>
                <p>Fine: $${fine}</p>
                <p>Bail: $${bail}</p>
                <button onclick="addToSummary('${code}')">Add to Calculator</button>
            </div>
        `;
    });
}

// Tambahkan penal code ke kalkulator
function addToSummary(code) {
    const { jailTime, fine, bail } = penalData[code];
    summary.jailTime += jailTime;
    summary.fine += fine;
    summary.bail += bail;

    updateSummary();
}

// Perbarui tampilan kalkulator
function updateSummary() {
    const summaryResult = document.getElementById("summaryResult");
    summaryResult.textContent = `Total Jail Time: ${summary.jailTime} days | Fine: $${summary.fine} | Bail: $${summary.bail}`;
}

// Hapus kalkulator
function clearSummary() {
    summary = { jailTime: 0, fine: 0, bail: 0 };
    updateSummary();
}

// Tampilkan daftar pasal di tabel
function displayPenalList() {
    const penalList = document.getElementById("penalList");
    penalList.innerHTML = "";

    Object.keys(penalData).forEach(code => {
        const { name, jailTime, fine, bail } = penalData[code];
        penalList.innerHTML += `
            <tr>
                <td>${code}</td>
                <td>${name}</td>
                <td>${jailTime} days</td>
                <td>$${fine}</td>
                <td>$${bail}</td>
            </tr>
        `;
    });
}

// Panggil fungsi untuk menampilkan daftar pasal saat halaman dimuat
document.addEventListener("DOMContentLoaded", displayPenalList);
