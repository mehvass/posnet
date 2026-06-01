const express = require("express");
const app = express();

app.get("/pay", (req, res) => {
  res.send("POSNET SERVER ÇALIŞIYOR");
});

app.listen(3000, () => console.log("Server çalışıyor"));