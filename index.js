require("dotenv").config();
const makeWASocket = require("@whiskeysockets/baileys").default;
const { useSingleFileAuthState } = require("@whiskeysockets/baileys");
const qrcode = require("qrcode-terminal");
const fs = require("fs");
const path = require("path");
require("./server");

const { state, saveState } = useSingleFileAuthState("./sessions/auth_info.json");

async function startBot() {
    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: true,
    });

    sock.ev.on("creds.update", saveState);

    sock.ev.on("messages.upsert", async ({ messages, type }) => {
        if (type !== "notify") return;
        const msg = messages[0];
        if (!msg.message || msg.key.fromMe) return;

        const from = msg.key.remoteJid;
        const body = msg.message.conversation || msg.message.extendedTextMessage?.text || "";

        if (body === "!ping") {
            await sock.sendMessage(from, { text: "Pong 🏓" });
        }

        if (body === "!menu") {
            await sock.sendMessage(from, { text: "✅ Available commands:
!ping
!menu
!about
!sticker
... (more coming)" });
        }

        if (body === "!about") {
            await sock.sendMessage(from, { text: "🤖 Render WhatsApp Bot
Made with Baileys + Express
By EdithBot" });
        }
    });

    console.log("✅ Bot is running.");
}

startBot();