# 🤖 Bot de Atendimento WhatsApp com Preços Automatizados

Bem-vindo ao **Bot WhatsApp Node.js**!

Este projeto foi desenvolvido para automatizar o atendimento comercial no WhatsApp, respondendo automaticamente **preços de produtos** com base em uma **planilha exportada do sistema ERP do lojista**. Ele é voltado para uso **local em computadores com Windows** e pode ser distribuído como um `.exe` com **interface gráfica (Electron)**.

---

## 📌 Sobre o Projeto

Este bot se conecta ao WhatsApp via biblioteca [`whatsapp-web.js`](https://github.com/pedroslopez/whatsapp-web.js) e interpreta mensagens de clientes como:

> **"Quanto está a tela do A30s?"**  
> **"Tem frontal do iPhone 8 com aro?"**

Em seguida, ele **entende a intenção**, busca os produtos no banco (arquivo JSON ou MySQL) e responde automaticamente com o preço mais relevante.

---

## ⚙️ Funcionalidades

- ✅ Responde automaticamente dúvidas de clientes sobre preços.
- 📤 Aceita importação de planilhas (.xls, .xlsx, .csv) exportadas do sistema do lojista.
- 🔄 Converte automaticamente a planilha para um `produtos.json` padronizado.
- 🔍 Realiza busca inteligente com Fuse.js (tolerante a erros de digitação).
- 🧠 Refina as mensagens para extrair peça, modelo e detalhes.
- 📈 Inclui sistema de logs para análise e melhorias futuras.
- 🧩 Estrutura modular e pronta para expansão.
- 🖥️ Interface sendo desenvolvida com Electron para facilitar o uso por leigos.

---

## 📁 Estrutura do Projeto

```
BOT-WHATSAPP-PRECO/
├── app/
│   ├── config/            # Configurações do sistema
│   ├── dados/             # Parser da planilha + banco local
│   ├── logs/              # Logs e utilitários de registro
│   ├── mensagens/         # Lógica de análise e resposta
│   ├── whatsapp/          # Cliente e eventos do WhatsApp
│   └── index.js           # Ponto principal do sistema
├── frontend/              # Interface gráfica (Electron)
│   ├── screens/           # Telas (login, home, importar)
│   └── scripts/           # Scripts do frontend
├── public/                # Assets públicos
├── produtos_novo.json     # Banco gerado da planilha (exemplo)
├── package.json
└── README.md
```

## 🛠️ Em desenvolvimento

- [ ] Sistema de login com verificação de pagamento
- [ ] Atualizações automáticas
- [ ] Conectores para bancos Firebird, SQL Server, API externa

---

## 👨‍💻 Autor

Projeto mantido por [@ebert-g](https://github.com/ebert-g), com foco em **automatização para pequenos negócios**, estabilidade e facilidade de uso.
