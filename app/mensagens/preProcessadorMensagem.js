const removerAcentos = require("remove-accents");

const palavrasIrrelevantes = [
    "bom dia",
    "boa tarde",
    "boa noite",
    "oi",
    "olá",
    "e aí",
    "vc tem",
    "tem aí",
    "tem a",
    "tem",
    "me diz",
    "por favor",
    "diz aí",
];

const tipoPeca = [
    "tela",
    "bateria",
    "frontal",
    "camera",
    "display",
    "flex",
    "botao",
    "touch",
];

function normalizarTexto(texto) {
    return removerAcentos(texto.toLowerCase()) // tudo minúsculo e sem acento
        .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "") // remove pontuação
        .replace(/\s{2,}/g, " ") // remove espaços duplicados
        .trim();
}

function removerIrrelevantes(texto) {
    let resultado = texto;

    for (const lixo of palavrasIrrelevantes) {
        resultado = resultado.replaceAll(lixo, "");
    }

    return resultado.trim().replace(/\s{2,}/g, " ");
}

function tratarMensagem(msg) {
    const textoNormalizado = normalizarTexto(msg);
    const textoLimpo = removerIrrelevantes(textoNormalizado);

    // Próximo passo: extrair peça, modelo, detalhe

    return {
        original: msg,
        textoNormalizado,
        textoLimpo,
    };
}

module.exports = { tratarMensagem };
