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
    const KeyPreco = palavraChavePreco.some((p) => mensagem.includes(p));
    const KeyPeca = palavraChavePeca.some((p) => mensagem.includes(p));

    if (KeyPreco || KeyPeca) {
        return { pedido: true };
    }

    if (regexPreco.test(mensagem)) {
        return { pedido: true };
    }

    return { pedido: false };
}

module.exports = { verificarPedidoPreco };
