const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (_, res) => {
  res.send("WhatsApp Bot is Running on Render!");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));