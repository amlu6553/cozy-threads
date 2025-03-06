import React, { useState, useEffect } from "react";
import { useRef } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import { useCart } from "../cartState"; 
import { useNavigate } from "react-router-dom";

// Load Stripe only when key is available
const stripePromise = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY
  ? loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY)
  : null;

if (!stripePromise) {
  console.error(" ERROR: Stripe Publishable Key is missing!");
}


const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsProcessing(true);

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: { return_url: window.location.origin },
        redirect: "if_required",
      });

      if (error) {
        console.error("❌ Payment Error:", error);
        setMessage(error.message);
      } else if (paymentIntent?.status === "succeeded") {
        console.log("✅ Payment Successful:", paymentIntent);
        navigate("/success");
      } else {
        console.warn("⚠️ Unexpected PaymentIntent Status:", paymentIntent?.status);
      }
    } catch (err) {
      console.error("❌ Unexpected Error:", err);
      setMessage("An error occurred while processing your payment.");
    }

    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: "20px", background: "#f9f9f9", borderRadius: "5px", width: "100%" }}>
      <h2>Complete Your Purchase</h2>
      <PaymentElement />
      <button type="submit" disabled={!stripe || isProcessing} style={{ marginTop: "20px", padding: "10px", background: "green", color: "white", border: "none", cursor: "pointer", width: "100%" }}>
        {isProcessing ? "Processing..." : "Pay Now"}
      </button>
      {message && <p style={{ color: "red" }}>{message}</p>}
    </form>
  );
};

const Checkout = () => {
  const [clientSecret, setClientSecret] = useState("");
  const { cart } = useCart();
  const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);
  const hasFetchedPaymentIntent = useRef(false);
  

  useEffect(() => {
    if (!totalAmount || hasFetchedPaymentIntent.current) return; // ✅ Prevent re-fetching

    hasFetchedPaymentIntent.current = true;

    //fetch("http://localhost:4242/create-payment-intent", {      ****FOR LOCAL 
    fetch("https://cozy-threads-vjs4.onrender.com/create-payment-intent", {  // For Deployed App
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: Math.round(totalAmount * 100) }), 
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.clientSecret) {
          setClientSecret(data.clientSecret);
        } else {
          console.error("❌ ERROR: No clientSecret received from backend.");
        }
      })
      .catch((err) => console.error("❌ ERROR fetching client secret:", err));
  }, [totalAmount]);

  return (
    <div style={{ maxWidth: "900px", margin: "auto", padding: "20px", display: "flex", justifyContent: "space-between" }}>

<div style={{ width: "50%", paddingRight: "20px" }}>
        <h2>Checkout</h2>
        <h3>Order Summary</h3>

        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            {cart.map((item, index) => (
              <div key={index} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px", borderBottom: "1px solid #ccc" }}>
                <img src={item.image} alt={item.name} style={{ width: "50px", height: "50px", marginRight: "10px" }} />
                <div>
                  <strong>{item.name}</strong>
                  <p>${(item.price).toFixed(2)}</p>
                </div>
              </div>
            ))}
            <h3>Total: ${totalAmount.toFixed(2)}</h3>
          </>
        )}
      </div>

      <div style={{ width: "45%", padding: "20px", background: "#f9f9f9", borderRadius: "5px" }}>
        <h3>Complete Your Purchase</h3>
        {clientSecret ? (
          <Elements options={{ clientSecret }} stripe={stripePromise}>
            <CheckoutForm />
            </Elements>
            ) : (
            <p>Loading payment details...</p> // Avoid rendering Elements until ready
            )}
      </div>
    </div>
  );
};

export default Checkout;

