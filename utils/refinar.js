const fs = require("fs");
const path = require("path");

// Caminho do arquivo de logs
const caminhoLog = path.join(__dirname, "..", "log.json");

// Verifica se o log existe
if (!fs.existsSync(caminhoLog)) {
    console.log(
        "❌ Nenhum arquivo logs.json encontrado. Execute o bot primeiro!"
    );
    process.exit(1);
}

// Lê o conteúdo
const conteudo = fs.readFileSync(caminhoLog);
const logs = JSON.parse(conteudo);

// Filtra apenas logs onde produto não foi encontrado
const logsSemProduto = logs.filter((log) => log.produtoEncontrado === null);

console.log("====================================================");
console.log(
    `📝 Total de mensagens sem produto encontrado: ${logsSemProduto.length}`
);
console.log("====================================================");

// Lista as mensagens problemáticas
logsSemProduto.forEach((log, index) => {
    console.log(`${index + 1}. ${log.mensagemCliente}`);
});

// Analisa palavras mais comuns
const contagemPalavras = {};

logsSemProduto.forEach((log) => {
    // Separa mensagem em palavras
    const palavras = log.mensagemCliente
        .toLowerCase()
        .replace(/[?.!]/g, "") // Remove pontuação básica
        .split(" ")
        .filter((p) => p.length > 2); // Remove palavras muito curtas tipo "do", "de"

    palavras.forEach((p) => {
        if (contagemPalavras[p]) {
            contagemPalavras[p] += 1;
        } else {
            contagemPalavras[p] = 1;
        }
    });
});

// Organiza contagem do mais frequente pro menos
const palavrasOrdenadas = Object.entries(contagemPalavras).sort(
    (a, b) => b[1] - a[1]
);

console.log("\n====================================================");
console.log("🔑 Palavras mais comuns em frases problemáticas:");
console.log("====================================================");
palavrasOrdenadas.forEach(([palavra, contagem]) => {
    console.log(`${palavra}: ${contagem}`);
});

console.log(
    "\n✅ Fim da análise! Use esses dados pra criar novas keywords ou melhorar regex/NLP."
);
