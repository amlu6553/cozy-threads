import React from "react";
import { useCart } from "../cartState";
import { useNavigate } from "react-router-dom";

const Cart = () => {
    const { cart } = useCart();
    const navigate = useNavigate();

    // Calculate total price
    const calculateTotal = () => {
        return cart.reduce((total, item) => total + item.price, 0);
    };

    return (
        <div style={{ maxWidth: "600px", margin: "auto", padding: "20px" }}>
            <h2>Shopping Cart</h2>

            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    {cart.map((item, index) => (
                        <div key={index} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px", borderBottom: "1px solid #ccc" }}>
                            <img src={item.image} alt={item.name} style={{ width: "50px", height: "50px", marginRight: "10px" }} />
                            <div>
                                <strong>{item.name}</strong>
                                <p>${item.price.toFixed(2)}</p>
                            </div>
                        </div>
                    ))}

                    {/* Display correct total */}
                    <h3>Total: ${calculateTotal().toFixed(2)}</h3>

                    {/* ✅ Pass entire cart to checkout */}
                    <button 
                        onClick={() => navigate("/checkout", { state: { cart, total: calculateTotal() }})} 
                        style={{ background: "green", color: "white", padding: "10px", border: "none", cursor: "pointer", width: "100%", marginTop: "10px" }}
                    >
                        Proceed to Checkout
                    </button>
                </>
            )}
        </div>
    );
};

export default Cart;
