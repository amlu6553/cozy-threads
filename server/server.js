require('dotenv').config({ path: './.env' });
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "../client/public"))); // Serve static files

console.log("STRIPE_SECRET_KEY:", process.env.STRIPE_SECRET_KEY);
console.log("Script is running...");

app.get("/publishable-key", (req, res) => {
    res.json({ key: process.env.STRIPE_PUBLISHABLE_KEY });
});


// ✅ Serve the Home Page (Frontend)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/public/index.html"));
});

// ✅ Serve the Checkout Page
app.get("/checkout", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/public/checkout.html"));
});

// ✅ Endpoint to Fetch Publishable Key for Stripe Frontend
app.get("/publishable-key", (req, res) => {
  res.json({ key: process.env.STRIPE_PUBLISHABLE_KEY });
});

// ✅ Create a Payment Intent
app.post("/create-payment-intent", async (req, res) => {
  try {
    const { amount } = req.body; // Amount should be in cents (5000 = $50.00)
    
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res.status(500).json({ error: error.message });
  }
});

// ✅ Webhook Endpoint (Stripe -> Server)
app.post("/webhook", (req, res) => {
  let event = req.body;

  switch (event.type) {
    case "checkout.session.completed":
      console.log("✅ Checkout Session Completed!", event.data.object.id);
      break;
    case "payment_intent.succeeded":
      console.log("✅ Payment Succeeded!", event.data.object.id);
      break;
    default:
      console.warn("⚠️ Unhandled event:", event.type);
  }

  res.json({ received: true });
});

// ✅ Start the Server
const PORT = process.env.PORT || 4242;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
