import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import { useCart } from "../cartState"; // Ensure cart context is properly imported
import { useNavigate } from "react-router-dom";

// ✅ Load Stripe with publishable key dynamically
const stripePromise = fetch("http://localhost:4242/publishable-key")
  .then((res) => res.json())
  .then((data) => loadStripe(data.key))
  .catch((err) => console.error("Error fetching publishable key:", err));

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

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: window.location.origin },
      redirect: "if_required",
    });

    if (error) {
      setMessage(error.message);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      //setMessage("Payment successful! 🎉");
      navigate("/success"); // ✅ Redirect user to success page!
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
  const { cart } = useCart(); // Fetch cart items
  const totalAmount = cart.reduce((sum, item) => sum + item.price, 0); // Ensure proper cart total calculation

  useEffect(() => {
    // ✅ Create a payment intent dynamically from the server
    fetch("http://localhost:4242/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: totalAmount * 100 }), // Convert total to cents
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret))
      .catch((err) => console.error("Error fetching client secret:", err));
  }, [totalAmount]);

  return (
    <div style={{ maxWidth: "900px", margin: "auto", padding: "20px", display: "flex", justifyContent: "space-between" }}>
      {/* Order Summary Section */}
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

      {/* Payment Section */}
      <div style={{ width: "45%", padding: "20px", background: "#f9f9f9", borderRadius: "5px" }}>
        <h3>Complete Your Purchase</h3>

        {clientSecret && (
          <Elements options={{ clientSecret }} stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        )}
      </div>
    </div>
  );
};

export default Checkout;
