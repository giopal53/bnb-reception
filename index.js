import express from "express";
import axios from "axios";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// ✅ NUOVO ENDPOINT PER WEBHOOK DAILY
app.post("/daily-webhook", async (req, res) => {
  const { event, payload } = req.body;

  if (event === "participant-joined") {
    try {
      await axios.post(`https://api.telegram.org/bot${process.env.8233140543:AAEz3O5dmXzGGXX417l7MLqZXAl-pGfqC7Q}/sendMessage`, {
        chat_id: process.env.7048201438,
        text: `🚪 Un ospite è entrato nella stanza!\n👤 ${payload.user_name || "Ospite"}`
      });
      console.log("Notifica Telegram inviata");
    } catch (err) {
      console.error("Errore Telegram:", err.message);
    }
  }

  res.sendStatus(200);
});

// Endpoint principale di test
app.get("/", (req, res) => {
  res.send("Server B&B attivo 😊");
});

// Endpoint per notificare l'host manualmente
app.get("/call-host", async (req, res) => {
  try {
    await axios.post(`https://api.telegram.org/bot${process.env.8233140543:AAEz3O5dmXzGGXX417l7MLqZXAl-pGfqC7Q}/sendMessage`, {
      chat_id: process.env.7048201438,
      text: `📞 Un ospite ti sta chiamando dalla reception!\n👉 Entra nella stanza video:\n${process.env.ROOM_URL}`
    });
    res.send("Notifica inviata!");
  } catch (err) {
    console.error(err);
    res.status(500).send("Errore nell'invio della notifica.");
  }
});

// Avvio server
app.listen(port, () => {
  console.log(`Server B&B attivo sulla porta ${port}`);
});