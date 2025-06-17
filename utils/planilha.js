const xlsx = require("xlsx");
const path = require("path");

function lerProdutosDaPlanilha(nomeArquivo = "produtos.xlsx") {
    const caminhoArquivo = path.join(__dirname, "..", nomeArquivo);

    const workbook = xlsx.readFile(caminhoArquivo);

    const primeiraAba = workbook.SheetNames[0];

    const aba = workbook.Sheets[primeiraAba];

    const produtos = xlsx.utils.sheet_to_json(aba);

    return produtos;
}

module.exports = { lerProdutosDaPlanilha };
