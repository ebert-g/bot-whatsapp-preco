const removerAcentos = require("remove-accents");

//Normaliza texto para facilitar comparação

function normalizarTexto(texto) {
    return removerAcentos(texto.toLowerCase())
        .replace(/[.,\\/#!$%\\^&\\*;:{}=\\-_`~()?]/g, "")
        .replace(/\s{2,}/g, " ")
        .trim();
}

// conta as palavras do cliente que batem com o nome do produto

function pontuarProduto(produtoNome, palavrasCliente) {
    const produtosPalavras = normalizarTexto(produtoNome).split(/\s+/);
    let pontos = 0;

    palavrasCliente.forEach((p) => {
        if (produtosPalavras.includes(p)) {
            pontos++;
        }
    });

    return pontos;
}

// busca produto exato ou similares
function buscarProduto(produtos, msgCliente) {
    const palavrasCliente = normalizarTexto(msgCliente).split(/\s+/);

    // 1 - tenta matching hard (todas as palavras precisam bater)
    const exato = produtos.find((prod) => {
        const prodPalavras = normalizarTexto(prod.nome).split(/\s+/);
        return palavrasCliente.every((p) => prodPalavras.includes(p));
    });

    if (exato) {
        return { exato, similares: [] };
    }

    const pontuados = produtos.map((prod) => ({
        produto: prod,
        pontos: pontuarProduto(prod.nome, palavrasCliente),
    }));

    const similares = pontuados
        .filter((p) => p.pontos > 0)
        .sort((a, b) => b.pontos - a.pontos)
        .map((p) => p.produto);

    return { exato: null, similares };
}

module.exports = { buscarProduto, normalizarTexto };
