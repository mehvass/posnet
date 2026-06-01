const express = require("express");
const axios = require("axios");
const app = express();

app.use(express.urlencoded({ extended: true }));

// ROOT
app.get("/", (req, res) => {
  res.send("OK ROOT");
});

// 🔥 1. ADIM → POSNET XML REQUEST
app.get("/pay", async (req, res) => {
  const MID = "6700972665";
  const TID = "67C36594";

  const xml = `
  <posnetRequest>
    <mid>${MID}</mid>
    <tid>${TID}</tid>
    <oosRequestData>
      <amount>100</amount>
      <currencyCode>TL</currencyCode>
      <installment>00</installment>
      <orderID>ORDER123</orderID>
      <returnURL>https://proud-acceptance-production-b5b5.up.railway.app/callback</returnURL>
    </oosRequestData>
  </posnetRequest>
  `;

  try {
    const response = await axios.post(
      "https://setmpos.ykb.com/PosnetWebService/XML",
      xml,
      {
        headers: { "Content-Type": "text/xml" }
      }
    );

    const data = response.data;

    // ⚠️ burada XML parse yapılmalı (şimdilik basit bırakıyorum)
    // gerçek projede xml2js kullanacağız

    // DEMO olarak direkt yönlendirme
    res.send(`
      <html>
        <body>
          <h2>3D Yönlendiriliyor...</h2>
          <pre>${data}</pre>
        </body>
      </html>
    `);

  } catch (err) {
    res.send("HATA: " + err.message);
  }
});

// 🔥 2. ADIM → CALLBACK
app.post("/callback", (req, res) => {
  console.log("BANKA DÖNDÜ:", req.body);

  res.send("Ödeme sonucu alındı");
});

const PORT = process.env.PORT;

app.listen(PORT, "0.0.0.0", () => {
  console.log("PORT:", PORT);
});
