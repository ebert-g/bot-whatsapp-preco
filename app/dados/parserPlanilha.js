const fs = require("fs");
const path = require("path");
const xlsx = require("xlsx");

const sinonimosNome = ["nome", "produto", "descrição", "descricao", "item"];
const sinonimosPreco = ["preço", "valor", "preço r$", "valor unitário"];
const sinonimosEstoque = ["estoque", "qtd", "quantidade", "qtde em estoque"];

function converterArquivoParaJson(caminhoArquivo) {
    // 1. Verifica se o arquivo tem uma extensão permitida
    const ext = path.extname(caminhoArquivo).toLowerCase();

    if (![".xlsx", ".xls", "csv"].includes(ext)) {
        throw new Error("Formato de arquivo não suportado.");
    }

    // 2. Lê conteúdo do arquivo

    const workbook = xlsx.readFile(caminhoArquivo);

    // 3. Pega primeira aba da planilha

    const primeiraAba = workbook.SheetNames[0];
    const planilha = workbook.Sheets[primeiraAba];

    // 4. Converte aba em array de objetos

    const linhas = xlsx.utils.sheet_add_json(planilha);

    function normalizar(texto) {
        return texto
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .trim();
    }

    const colunas = Object.keys(linhas[0] || {});

    const colunaNome = null;
    const colunaPreco = null;
    const colunaEstoque = null;

    for (const nomeColuna of colunas) {
        const nome = normalizar(nomeColuna);

        if (!colunaNome && sinonimosNome.some((s) => nome.includes(s))) {
            colunaNome = nomeColuna;
        }
        if (!colunaPreco && sinonimosPreco.some((s) => nome.includes(s))) {
            colunaPreco = nomeColuna;
        }
        if (!colunaEstoque && sinonimosEstoque.some((s) => nome.includes(s))) {
            colunaEstoque = nomeColuna;
        }
    }

    if (!colunaNome || !colunaPreco) {
        throw new Error(
            "Não foi possível identificar as colunas de nome ou preço."
        );
    }

    const produtosFormatados = linhas.map((linha) => {
        const nome = String(linha[colunaNome]).trim();
        const preco = parseFloat(linha[colunaPreco]);

        const estoque =
            colunaEstoque && linha[colunaEstoque] !== undefined
                ? Number(linha[colunaEstoque])
                : undefined;

        const produto = { nome, preco };
        if (estoque !== undefined && !isNaN(estoque)) {
            produto.estoque = estoque;
        }

        return produto;
    });

    const caminhoSaida = path.join(__dirname, "produtos_novo.json");
    fs.writeFileSync(
        caminhoSaida,
        JSON.stringify(produtosFormatados, null, 2),
        "utf8"
    );

    console.log("✅ JSON gerado com sucesso:", caminhoSaida);
}

module.exports = { converterArquivoParaJson };
