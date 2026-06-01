const express = require("express");
const crypto = require("crypto");

const app = express();

app.get("/", (req, res) => {
  res.send("OK ROOT");
});

app.get("/pay", (req, res) => {
  const orderId = "ORDER123";
  const amount = "100";

  const MID = "6700972665";
  const TID = "67C36594";
  const POSNET_ID = "1010082528833803";
  const ENCKEY = "10,10,10,10,10,10,10,10";

  // 🔥 BASİT HASH (test için)
  const hash = crypto
    .createHash("sha256")
    .update(orderId + amount + MID)
    .digest("hex");

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
          <input type="hidden" name="hash" value="${hash}" />

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
