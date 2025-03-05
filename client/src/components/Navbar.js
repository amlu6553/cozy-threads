import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../cartState"; // ✅ Ensure correct cart context import

const Navbar = () => {
    const navigate = useNavigate();
    const { cart } = useCart();

    return (
        <nav style={{ background: "#333", color: "white", padding: "10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            {/* Home Button */}
            <button onClick={() => navigate("/")} style={{ background: "white", border: "none", cursor: "pointer", padding: "5px 10px", marginRight: "10px" }}>
                🏠 Home
            </button>

            <h1 style={{ margin: 0, cursor: "pointer" }} onClick={() => navigate("/")}>
                Cozy Threads
            </h1>

            {/* Cart Button (Now Navigates to /cart) */}
            <button 
                onClick={() => navigate("/cart")}  // ✅ Changed from "/checkout" to "/cart"
                style={{ background: "white", border: "none", cursor: "pointer", padding: "5px 10px" }}
            >
                🛒 Cart ({cart.length})
            </button>
        </nav>
    );
};

export default Navbar;
