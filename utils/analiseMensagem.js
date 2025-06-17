const palavraChave = [
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

const regexPreco = /(quanto custa|qual o preço|valor da|preço da|tá quanto)/i;

function verificarPedidoPreco(msg) {
    const mensagem = msg.toLowerCase();

    const temKeyWord = palavraChave.some((p) => mensagem.includes(p));
    if (temKeyWord) {
        return { isPedido: true, metodo: "keyword" };
    }

    if (regexPreco.test(mensagem)) {
        return { isPedido: true, metodo: "regex" };
    }

    return { isPedido: false, metodo: null };
}

module.exports = { verificarPedidoPreco };
