const iniciarCliente = require("./whatsapp/cliente");
const registrarEventos = require("./whatsapp/eventos");
// inicia cleite do whatsapp
const client = iniciarCliente();

// Registra eventos de QR Code, mensagens, etc.

registrarEventos(client);

// const { Client, LocalAuth } = require("whatsapp-web.js");
// const qrcode = require("qrcode-terminal");
// const { verificarPedidoPreco } = require("./utils/analiseMensagem");
// const { registrarLog } = require("../utils/log");
// const { buscarProduto } = require("./utils/buscador");

// const client = new Client({
//     authStrategy: new LocalAuth(),
// });

// // QR code para login
// client.on("qr", (qr) => {
//     qrcode.generate(qr, { small: true });
//     console.log("🟢 Escaneie o QR code no WhatsApp");
// });

// // Confirma quando conectado
// client.on("ready", () => {
//     console.log("✅ Bot conectado com sucesso!");
// });

// client.on("message", async (message) => {
//     const msg = message.body;
//     const { isPedido, metodo } = verificarPedidoPreco(msg);

//     if (isPedido) {
//         const resultado = await buscarProduto(msg);

//         if (resultado.exato) {
//             const resposta = `📦 Produto encontrado:\n\n${resultado.exato.nome} - R$ ${resultado.exato.preco}`;
//             await message.reply(resposta);

//             registrarLog({
//                 dataHora: new Date().toISOString(),
//                 mensagemCliente: msg,
//                 metodoDeteccao: metodo,
//                 produtoEncontrado: resultado.exato,
//                 respostaEnviada: resposta,
//             });
//         } else if (resultado.similares.length > 0) {
//             const sugestoes = resultado.similares
//                 .slice(0, 5)
//                 .map((p, i) => `#${i + 1} ${p.nome} - R$ ${p.preco}`)
//                 .join("\n");

//             const resposta = `🤔 Não encontrei exato, mas veja opções:\n\n${sugestoes}`;
//             await message.reply(resposta);

//             registrarLog({
//                 dataHora: new Date().toISOString(),
//                 mensagemCliente: msg,
//                 metodoDeteccao: metodo,
//                 produtoEncontrado: null,
//                 respostaEnviada: resposta,
//             });
//         } else {
//             const resposta = "❌ Desculpe, não encontrei produtos parecidos.";
//             await message.reply(resposta);

//             registrarLog({
//                 dataHora: new Date().toISOString(),
//                 mensagemCliente: msg,
//                 metodoDeteccao: metodo,
//                 produtoEncontrado: null,
//                 respostaEnviada: resposta,
//             });
//         }
//     }
// });

// // Inicializa o cliente!
// client.initialize();
