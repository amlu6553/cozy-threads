import React from "react";
import { useCart } from "../cartState";

const products = [
    {
        id: 1,
        name: "Cozy Hoodie",
        description: "Soft and warm hoodie.",
        price: 49.99,
        image: "hoodie.jpg",
    },
    {
        id: 2,
        name: "Ethical Scarf",
        description: "Sustainable fabric scarf.",
        price: 29.99,
        image: "scarf.jpg",
    },
];

const Home = () => {
    const { addToCart } = useCart();

    return (
        <div>
            <h2 style={{ textAlign: "center" }}>Our Products</h2>
            <div className="products-container">
                {products.map((product) => (
                    <div key={product.id} className="product-card">
                        <img src={product.image} alt={product.name} />
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <strong>${product.price.toFixed(2)}</strong>
                        <br />
                        <button className="add-to-cart-btn" onClick={() => addToCart(product)}>
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
