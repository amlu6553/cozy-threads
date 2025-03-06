import React from "react";
import { useCart } from "../cartState";

//  Sample Product Data (Can be fetched from a real API)
const products = [
    {
      id: 1,
      name: "Cozy Hoodie",
      description: "A high-quality, ethically-sourced hoodie made from organic cotton.",
      price: 49.99,
      image: "/images/hoodie.jpg",
    },
    {
      id: 2,
      name: "Ethical Scarf",
      description: "Soft, stylish, and made from 100% sustainable materials.",
      price: 29.99,
      image: "/images/scarf.jpg",
    },
    {
      id: 3,
      name: "Comfortable Joggers",
      description: "Perfect for lounging or casual wear, made with breathable fabric.",
      price: 59.99,
      image: "/images/joggers.jpg",
    },
    {
      id: 4,
      name: "Organic Cotton T-Shirt",
      description: "A classic and comfortable fit, made from ethically sourced cotton.",
      price: 19.99,
      image: "/images/tshirt.jpg",
    },
  ];

  

const Home = () => {
    const { addToCart } = useCart();
    return (
        <div>
          <h2 className="product-list-title">🛍️ Product Catalog</h2> {/* 🔹 Added Title with Padding */}
          <div className="product-list">
            {products.map((product) => (
              <div key={product.id} className="product-card">
                <img src={product.image} alt={product.name} />
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p><strong>${product.price.toFixed(2)}</strong></p>
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
