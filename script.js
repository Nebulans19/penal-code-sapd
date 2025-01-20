// Data Penal Code
const penalData = {
    "1P": { name: "Theft", jailTime: 30, fine: 500, bail: 1000 },
    "1C": { name: "Assault", jailTime: 60, fine: 1000, bail: 2000 },
    "8A": { name: "Drug Trafficking", jailTime: 120, fine: 5000, bail: 10000 },
    "2B": { name: "Fraud", jailTime: 90, fine: 3000, bail: 5000 },
    "3D": { name: "Arson", jailTime: 180, fine: 7000, bail: 15000 },
    // Tambahkan kode lainnya
};

// Fungsi pencarian
function searchPenalCode() {
    const input = document.getElementById("searchInput").value;
    const codes = input.split(",").map(code => code.trim().toUpperCase());
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";

    if (!input.trim()) {
        resultsDiv.innerHTML = "<p>Please enter a penal code.</p>";
        return;
    }

    codes.forEach(code => {
        if (penalData[code]) {
            const { name, jailTime, fine, bail } = penalData[code];
            resultsDiv.innerHTML += `
                <div class="result">
                    <h3>${code}: ${name}</h3>
                    <p>Jail Time: ${jailTime} days</p>
                    <p>Fine: $${fine}</p>
                    <p>Bail: $${bail}</p>
                    <pre>/arrest [PlayerID] ${jailTime} ${fine} ${bail}</pre>
                </div>
            `;
        } else {
            resultsDiv.innerHTML += `<p>Code ${code} not found.</p>`;
        }
    });
}
