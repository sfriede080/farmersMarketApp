import React from "react";
import '../styles.css';

export default function ProductCard({product}) {

    const handleError = (e) => {
        e.target.src = "default.jpg";
    }
    return (
        <div key = {product.id} className='card'>
            <img src ={`/${product.image}`} alt = {product.name} onError={handleError}/>
            <div className='card-content'>
                <h2>{product.name}</h2>
                <p>{product.description}</p>
                <a href="#" className="button">
                    Add to Cart
                </a>
            </div>
        </div>
    )
}