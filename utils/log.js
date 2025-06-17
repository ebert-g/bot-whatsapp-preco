const fs = require("fs");
const path = require("path");
// Caminho do arquivo de log
const caminhoLog = path.join(__dirname, "..", "log.json");

// Função para registrar log
function registrarLog(dados) {
    // Add data/hora automa
    const registro = {
        dataHora: new Date().toISOString(),
        ...dados,
    };

    let logs = [];
    if (fs.existsSync(caminhoLog)) {
        const conteudo = fs.readFileSync(caminhoLog);
        logs = JSON.parse(conteudo);
    }

    //add registro
    logs.push(registro);

    //
    fs.writeFileSync(caminhoLog, JSON.stringify(logs, null, 2));

    console.log("✅ Log registrado:", registro);
}

module.exports = { registrarLog };
