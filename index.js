const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

async function sendTelegram(text) {
  await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    chat_id: CHAT_ID,
    text: text
  });
}
app.post("/daily-webhook", (req, res) => {
  // rispondi subito 200 a Daily
  res.status(200).json({ ok: true });

  console.log("DAILY WEBHOOK:", JSON.stringify(req.body, null, 2));

  const type = req.body?.type;        // es: "participant.joined"
  const payload = req.body?.payload || {};

  if (type === "participant.joined") {
    const name = payload.user_name || "Sconosciuto";
    sendTelegram(`🚪 ${name} è entrato nella stanza!`).catch(console.error);
  }
});

app.post("/webhook", async (req, res) => {
  console.log("WEBHOOK RICEVUTO:", JSON.stringify(req.body));
  res.status(200).json({ ok: true });
});

app.post("/webhook", async (req, res) => {
  const data = req.body;

  const event = data.event;
  const participant = data.participant?.user_name || "Sconosciuto";

  if (event === "participant-joined") {
    await sendTelegram(`🚪 ${participant} è entrato nella stanza Daily.co!`);
  }

  res.json({ status: "ok" });
});

app.get("/", (req, res) => {
  res.send("Bot attivo!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server avviato sulla porta " + PORT));
