const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("SERVER OK");
});

app.get("/pay", (req, res) => {
  res.send("PAY OK");
});

const PORT = process.env.PORT;

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server çalışıyor, port:", PORT);
});
