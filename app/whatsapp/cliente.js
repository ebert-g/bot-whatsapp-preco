const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");

function iniciarCliente() {
    const client = new Client({
        authStrategy: new LocalAuth(),
        puppeteer: { headless: true },
    });

    client.initialize();

    // Gera QR Code no terminal
    client.on("qr", (qr) => {
        qrcode.generate(qr, { small: true });
        console.log("📲 Escaneie o QR Code com o WhatsApp");
    });

    client.on("ready", () => {
        console.log("✅ Bot está pronto!");
    });

    return client;
}

module.exports = iniciarCliente;
