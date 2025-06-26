const Fuse = require("fuse.js");
const removerAcentos = require("remove-accents");
const pool = require("../dados/conector");

//Normaliza texto para facilitar comparação

function normalizarTexto(texto) {
    return removerAcentos(texto.toLowerCase())
        .replace(/[.,\\/#!$%\\^&\\*;:{}=\\-_`~()?]/g, "")
        .replace(/\s{2,}/g, " ")
        .trim();
}

// 2️⃣ Buscar produto com Fuse.js

async function buscarProduto(mensagem) {
    let textoCliente = normalizarTexto(mensagem);

    // Remove palavras comuns
    const lixo = [
        "quanto",
        "preco",
        "valor",
        "custa",
        "qual",
        "tela",
        "com aro",
        "aro",
        "o",
        "a",
        "do",
        "da",
    ];
    lixo.forEach((palavra) => {
        textoCliente = textoCliente.replace(palavra, "");
    });

    textoCliente = textoCliente.trim();

    const [produtos] = await pool.query("SELECT * FROM produtos");

    const options = {
        keys: ["nome"],
        threshold: 0.5,
    };

    const fuse = new Fuse(produtos, options);
    const resultados = fuse.search(textoCliente);
    let exato = null;
    let similares = [];

    if (resultados.length > 0) {
        exato = resultados[0].item;
        similares = resultados.slice(1).map((r) => r.item);
    }

    return { exato, similares };
}

module.exports = { normalizarTexto, buscarProduto };
