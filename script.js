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
                    adjustedJailTime = `<span class="ticket">TICKET</span>`;
                } else {
                    adjustedJailTime = `<span class="tag">TAG</span>`;
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

    document.getElementById("summaryResult").innerHTML = `
        <div class="summary">
            <p>Total: Jail Time: ${summary.jailTime} days | Fine: $${summary.fine} | Bail: $${summary.bail}</p>
            <button onclick="clearCalculator()">Reset</button>
        </div>
    `;

    commandOutput.textContent = `Command: /arrest [PlayerID] ${summary.jailTime} ${summary.fine} ${summary.bail}`;
}
