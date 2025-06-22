const { normalizarPreco, normalizarTexto } = require("./buscador");

const palavraChavePreco = [
    "quanto",
    "preço",
    "custa",
    "valor",
    "quanto tá",
    "quanto custa",
    "qual o valor",
    "qual valor",
    "tá quanto",
    "quanto sai",
    "tem valor",
];

// 👉 Lista de palavras de peça
const palavraChavePeca = [
    "tela",
    "bateria",
    "frontal",
    "camera",
    "flex",
    "touch",
    "botão",
    "display",
];

const regexPreco = /(quanto custa|qual o preço|valor da|preço da|tá quanto)/i;

function verificarPedidoPreco(msg) {
    const mensagem = normalizarTexto(msg);

    // Verifica se tem palavra de preço ou peça
    const temKeyPreco = palavraChavePreco.some((p) => mensagem.includes(p));
    const temKeyPeca = palavraChavePeca.some((p) => mensagem.includes(p));

    if (temKeyPreco || temKeyPeca) {
        return { isPedido: true, metodo: "keyword" };
    }

    if (regexPreco.test(mensagem)) {
        return { isPedido: true, metodo: "regex" };
    }

    return { isPedido: false, metodo: null };
}

module.exports = { verificarPedidoPreco };
