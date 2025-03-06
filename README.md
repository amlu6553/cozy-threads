JavaScript notes 

=========================================
Cozy Threads - E-Commerce Web App (React + Stripe)
=========================================
Overview: 
This is a simple e-commerce web app that allows users to browse products, add them to a shopping cart,
and securely check out using Stripe’s Payment Element.

Key Features:
- 🛒 Product Catalog: Display a list of available products
- ✅ Shopping Cart: Allow users to add/remove products
- 💳 Checkout Flow: Secure payment processing with Stripe
- 📦 Order Confirmation: Display success message upon purchase

Technologies Used:
- React (State Management, Hooks, Context API for cart state)
- Stripe API (Payment processing, Payment Element integration)
- React Router (Client-side routing between Home, Cart, Checkout, and Success pages)
- Express (Backend API to handle payment requests)
- Fetch API (Client-server communication)


Directory Structure: 

COZY-THREADS
│── client
│   ├── node_modules/
│   ├── public/
│   │   ├── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   ├── ProductCard.js
│   │   ├── pages/
│   │   │   ├── Cart.js
│   │   │   ├── Checkout.js
│   │   │   ├── Home.js
│   │   │   ├── Success.js
│   │   ├── App.js
│   │   ├── cartState.js
│   │   ├── index.js
│   │   ├── styles.css
│   ├── .gitignore
│   ├── package-lock.json
│   ├── package.json
│   ├── README.md
│
│── server
│   ├── node_modules/
│   ├── .env
│   ├── package-lock.json
│   ├── package.json
│   ├── server.js
│   ├── README.md


Frontend Flow: (checkout.js)
    Checkout.js Stripe Payment Element Integration: 
    The user loads the checkout page:

1. The total price of the cart is calculated.
- A request is sent to the backend (/create-payment-intent) to create a PaymentIntent in Stripe.
- Stripe responds with a clientSecret, which is needed to complete the payment.
- The user enters payment details and submits the form:

2. The Stripe Payment Element collects the card details.
- When the user clicks "Pay Now," stripe.confirmPayment() sends the payment information to Stripe.
- If the payment is successful, the user is redirected to the Success Page.

Backend Overview: 
    Express.js server that:

1. Serves static files for frontend (e.g., /, /checkout).

2. Handles Stripe API integration:
- Sends the publishable key to the frontend (/publishable-key).
- Creates a PaymentIntent for transactions (/create-payment-intent).
- Listens for Stripe webhooks to track payments (/webhook).

3. Uses Middleware:
- CORS: Allows requests from your React frontend.
- body-parser: Parses JSON request bodies.


Stripe: 
Publishable key: Used on the frontend (safe to expose).
Secret key: Used on the backend (MUST be kept private).



Server deleted code: 
/* DELETED 
const stripePromise = loadStripe(process.env.STRIPE_PUBLISHABLE_KEY);

// ✅ Endpoint to Fetch Publishable Key for Stripe Frontend
app.get("/publishable-key", (req, res) => {
  res.json({ key: process.env.STRIPE_PUBLISHABLE_KEY });
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


checkout comments: 
  /* 
  
  Handling Payment Submission 

Prevents form reload (e.preventDefault()).
Checks if Stripe has loaded (if (!stripe || !elements) return;).
Calls stripe.confirmPayment():
Sends payment details to Stripe.
If the payment is successful, Stripe updates the paymentIntent.status.
If the payment was successful, the user is redirected to /success.
If there is an error, it is displayed (setMessage(error.message)).

  */