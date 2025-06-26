const { verificarPedidoPreco } = require("../mensagens/MensagemPreco");

function registrarEventos(client) {
    client.on("message", async (msg) => {
        console.log(`📩 Mensagem recebida: ${msg.body}`);

        const { pedido } = await verificarPedidoPreco(msg.body);

        if (pedido) {
            await msg.reply("Resposta");
        }
    });
}

module.exports = registrarEventos;
