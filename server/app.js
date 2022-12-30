const express = require('express');
const cors = require('cors');
const midtrans = require('midtrans-client');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json({}));
app.use(express.urlencoded({ extended: true }));

app.post('/api/payment', cors(), (req, res) => {
  const {
    transaction_details,
    item_details,
    customer_details,
    enabled_payment,
    gopay,
  } = req.body;

  const paymentSnap = async () => {
    const snap = new midtrans.Snap({
      isProduction: false,
      serverKey: process.env.MIDTRANS_SERVER_KEY,
      clientKey: process.env.MIDTRANS_CLIENT_KEY,
    });

    let paramater = {
      transaction_details,
      credit_card: {
        secure: true,
      },
      item_details,
      customer_details,
      enabled_payment,
      gopay,
      callbacks: {
        finish: 'http://localhost:8080/pesanan',
      },
    };

    await snap.createTransactionToken(paramater).then((transactionToken) => {
      // pass transaction token to frontend
      res.json({
        token: transactionToken,
        clientKey: snap.apiConfig.clientKey,
      });
    });
  };

  paymentSnap();
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`running on port http://localhost:${port}`));
