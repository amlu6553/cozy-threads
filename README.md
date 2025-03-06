=========================================
Cozy Threads - E-Commerce Web App (React + Stripe)
=========================================
Overview: 
This is a simple e-commerce web app that allows users to browse products, add them to a shopping cart,and securely check out using Stripe’s Payment Element.

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

COZY-THREADS │── client/ # React Frontend │ ├── public/ │ │ ├── index.html │ ├── src/ │ │ ├── components/ │ │ │ ├── Navbar.js │ │ ├── pages/ │ │ │ ├── Cart.js │ │ │ ├── Checkout.js │ │ │ ├── Home.js │ │ │ ├── Success.js │ │ ├── App.js │ │ ├── cartState.js │ │ ├── index.js │ │ ├── styles.css │ ├── .gitignore │ ├── package-lock.json │ ├── package.json │ │── server/ # Express Backend │ ├── .env # Environment variables (not in Git) │ ├── package.json │ ├── server.js # API & Payment Processing │ │── README.md # Project Documentation

---

## 🛠️ Setup Instructions

### Frontend (Client)
```sh
cd client
npm install
npm start

### Backend (Server)
cd server
npm install
npm start


