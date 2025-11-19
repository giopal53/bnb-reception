import express from "express";
import axios from "axios";

const app = express();
const port = process.env.PORT || 3000;

// Le variabili d'ambiente vengono impostate su Render
const token = process.env.TELEGRAM_BOT_TOKEN;
const chatId = process.env.TELEGRAM_CHAT_ID;
const roomURL = process.env.ROOM_URL;  

app.get("/", (req, res) => {
  res.send("Server B&B attivo! 🙂");
});

app.get("/call-host", async (req, res) => {
  try {
    await axios.post(`https://api.telegram.org/bot${token}/sendMessage`, {
      chat_id: chatId,
      text: `📞 Un ospite sta chiamando dalla reception!\n👉 Clicca per entrare nella stanza video:\n${roomURL}`
    });

    res.send("Notifica inviata!");
  } catch (err) {
    console.error(err);
    res.status(500).send("Errore nell'invio della notifica");
  }
});

app.listen(port, () => {
  console.log(`Server B&B attivo sulla porta ${port}`);
});
