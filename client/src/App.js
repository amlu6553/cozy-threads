import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CartProvider } from "./cartState"; // ✅ Import CartProvider
//import { CartProvider } from "./cartState";// ✅ Update import
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Checkout from "./pages/Checkout";
import Cart from "./pages/Cart";
import "./styles.css";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Success from "./pages/Success"; // ✅ Import Success page


// Load Stripe using the publishable key
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

function App() {
    return (
        <CartProvider> {/* ✅ Wrap entire app in CartProvider */}
            <Router>
            <Elements stripe={stripePromise}>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path='/cart' element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/success" element={<Success />} />
                </Routes>
                </Elements>
            </Router>
        </CartProvider>
    );
}

export default App;
