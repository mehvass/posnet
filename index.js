const express = require("express");
const app = express();

// Railway debug
console.log("ENV PORT:", process.env.PORT);

// ROOT TEST
app.get("/", (req, res) => {
  res.send("OK ROOT");
});

// PAY TEST
app.get("/pay", (req, res) => {
  res.send("OK PAY");
});

// 🔥 EN KRİTİK KISIM
const PORT = parseInt(process.env.PORT) || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("SERVER STARTED ON:", PORT);
});
