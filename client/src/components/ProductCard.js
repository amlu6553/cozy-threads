import React from "react";

const ProductCard = ({ product, addToCart }) => {
    return (
        <div className="product-card" style={{ border: "1px solid #ddd", padding: "10px", textAlign: "center" }}>
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p><strong>${(product.price / 100).toFixed(2)}</strong></p>
            <button 
                onClick={() => addToCart(product)} 
                style={{ padding: "8px", background: "blue", color: "white", border: "none", cursor: "pointer" }}
            >
                Add to Cart
            </button>
        </div>
    );
};

export default ProductCard;
