const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const { lerProdutosDaPlanilha } = require("./utils/planilha");
const produtos = lerProdutosDaPlanilha();
const { verificarPedidoPreco } = require("./utils/analiseMensagem");
const { registrarLog } = require("./utils/log");

const client = new Client({
    authStrategy: new LocalAuth(),
});

client.on("qr", (qr) => {
    qrcode.generate(qr, { small: true });
    console.log("🟢 Escaneie o QR code acima no WhatsApp");
});

client.on("ready", () => {
    console.log("✅ Bot conectado com sucesso!");
});

client.on("message", async (message) => {
    const msg = message.body.toLowerCase();
    const { isPedido, metodo } = verificarPedidoPreco(msg);
    if (isPedido) {
        const produtoEncontrado = produtos.find((p) => {
            const nomeProduto = p.Produto.toLowerCase();
            const palavrasProduto = nomeProduto.split(" ");

            const todasPalavrasNaMsg = palavrasProduto.every((palavra) =>
                msg.includes(palavra)
            );

            return todasPalavrasNaMsg;
        });

        let resposta = "";

        if (produtoEncontrado) {
            resposta = `📦 O produto '${
                produtoEncontrado.Produto
            }' custa R$ ${produtoEncontrado.Preco.toFixed(2)}`;
        } else {
            resposta = "❌ Desculpe, não encontrei esse produto.";
        }

        //Responde Cliente
        await message.reply(resposta);

        //Registrar log
        registrarLog({
            mensagemCliente: msg,
            metodoDeteccao: metodo,
            produtoEncontrado: produtoEncontrado
                ? produtoEncontrado.Produto
                : null,
            respostaEnviada: resposta,
        });
    }
});

client.initialize();
