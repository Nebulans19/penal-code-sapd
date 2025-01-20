function generateBBCode() {
    let inputText = document.getElementById('inputText').value;
    let outputText = document.getElementById('outputText');

    // Contoh sederhana konversi teks biasa ke BBCode
    let bbCode = inputText
        .replace(/\*\*(.*?)\*\*/g, '[b]$1[/b]') // Bold
        .replace(/\*(.*?)\*/g, '[i]$1[/i]')    // Italic
        .replace(/__(.*?)__/g, '[u]$1[/u]')    // Underline
        .replace(/\[url\](.*?)\[\/url\]/g, '[url=$1]Link[/url]'); // URL

    outputText.value = bbCode;
}
