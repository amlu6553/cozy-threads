import React, { useEffect } from "react"; 
import { useNavigate } from "react-router-dom";
import { useCart } from "../cartState";

const Success = () => {
    const navigate = useNavigate();
    const { clearCart } = useCart(); //  Access clearCart via useCart()

    useEffect(() => {
        if (typeof clearCart === "function") { // added for wa
            clearCart(); // Clears cart only once when page loads
        }
    }, []);
    
    return (
        <div style={{ textAlign: "center", padding: "50px" }}>
            <h1>🎉 Payment Successful! 🎉</h1>
            <p>Thank you for your purchase! Your order has been processed successfully.</p>
            <button 
                onClick={() => navigate("/")} 
                style={{ padding: "10px 20px", background: "green", color: "white", border: "none", cursor: "pointer" }}
            >
                Return to Home
            </button>
        </div>
    );
};

export default Success;
