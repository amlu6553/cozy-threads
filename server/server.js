require('dotenv').config({ path: './.env' });
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "../client/public"))); // Serve static files

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/public/index.html"));
});

app.get("/checkout", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/public/checkout.html"));
});

app.post("/create-payment-intent", async (req, res) => {
  try {
    const { amount } = req.body; // Amount should be in cents (5000 = $50.00)
    if (!amount || isNaN(amount)) {
      return res.status(400).json({ error: "Invalid amount" });
    }
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Convert dollars to cents
      currency: "usd",
      automatic_payment_methods: { enabled: true },
    });
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 4242;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
