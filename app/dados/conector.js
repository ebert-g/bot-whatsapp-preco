const mysql = require("mysql2/promise");

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "12123398Ww*",
    database: "bot_whatsapp_preco",
    waitForConnections: true,
    connectionLimit: 10,
});

module.exports = pool;
