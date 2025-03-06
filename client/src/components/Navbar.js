import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../cartState";

const Navbar = () => {
    const { cart } = useCart();

    return (
        <nav className="navbar">
            {/* Left: Home Button */}
            <Link to="/" className="nav-button home-button">🏠 Home</Link>

            {/* Center: Cozy Threads Logo */}
            <h1 className="navbar-title">
                <Link to="/">Cozy Threads</Link>
            </h1>

            {/* Right: Checkout & Cart Buttons */}
            <div className="nav-buttons">
                <Link to="/checkout" className="checkout-button">Checkout</Link>
                <Link to="/cart" className="cart-button">
                    🛒 Cart <span className="cart-count">({cart.length})</span>
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;



/*
import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../cartState"; // ✅ Ensure correct cart context import
//import { useCart } from "../context/CartContext";



const Navbar = () => {
    const navigate = useNavigate();
    const { cart } = useCart();
    return (
        <nav style={{ background: "#333", color: "white", padding: "10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            {}
            <button onClick={() => navigate("/")} style={{ background: "white", border: "none", cursor: "pointer", padding: "5px 10px", marginRight: "10px" }}>
                🏠 Home
            </button>

            <h1 style={{ margin: 0, cursor: "pointer" }} onClick={() => navigate("/")}>
                Cozy Threads
            </h1>

            {/* Cart Button (Now Navigates to /cart) }
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
*/