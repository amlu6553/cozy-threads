require("dotenv").config();
console.log("FIRST TRY: STRIPE_SECRET_KEY:", process.env.STRIPE_SECRET_KEY ? "Loaded" : "Not Found");

const express = require("express");
const cors = require("cors");
const path = require("path");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
console.log("SECOND TRY: STRIPE_SECRET_KEY:", process.env.STRIPE_SECRET_KEY ? "Loaded" : "Not Found");

const app = express();

app.use(cors());
app.use(express.json({ 
  verify: (req, res, buf) => {
    if (req.originalUrl.startsWith("/webhook")) {
      req.rawBody = buf.toString(); // Required for webhook signature verification
    }
  },
}));

// Serve static files (Only needed if frontend is in same project)
app.use(express.static(path.join(__dirname, "../client/public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/public/index.html"));
});

app.get("/checkout", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/public/checkout.html"));
});

app.post("/create-payment-intent", async (req, res) => {
  try {
    const { amount } = req.body; 
    if (!amount || isNaN(amount)) {
      return res.status(400).json({ error: "Invalid amount" });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount, // No need to multiply by 100 again
      currency: "usd",
      automatic_payment_methods: { enabled: true },
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res.status(500).json({ error: error.message });
  }
});

// Webhook endpoint for Stripe events (optional but recommended)
app.post("/webhook", express.raw({ type: "application/json" }), (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error("⚠️  Webhook signature verification failed.", err.message);
    return res.sendStatus(400);
  }

  // Handle event types
  if (event.type === "payment_intent.succeeded") {
    console.log("💰 Payment successful:", event.data.object.id);
  } else if (event.type === "payment_intent.payment_failed") {
    console.log("❌ Payment failed.");
    
  }

  res.sendStatus(200);
});

const PORT = process.env.PORT || 4242;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
