const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("OK ROOT");
});

app.get("/pay", (req, res) => {
  const orderId = "ORDER123";
  const amount = "100"; // 1 TL = 100 kuruş

  const MID = "6700972665";
  const TID = "67C36594";
  const POSNET_ID = "1010082528833803";

  res.send(`
    <html>
      <body>
        <h2>Güvenli Ödeme</h2>

        <form method="POST" action="https://setmpos.ykb.com/PosnetWebService/XML">
          <input type="hidden" name="mid" value="${MID}" />
          <input type="hidden" name="tid" value="${TID}" />
          <input type="hidden" name="posnetId" value="${POSNET_ID}" />
          <input type="hidden" name="amount" value="${amount}" />
          <input type="hidden" name="orderId" value="${orderId}" />

          <button type="submit">Yapı Kredi ile Öde</button>
        </form>

      </body>
    </html>
  `);
});

const PORT = process.env.PORT;

app.listen(PORT, "0.0.0.0", () => {
  console.log("PORT:", PORT);
});
