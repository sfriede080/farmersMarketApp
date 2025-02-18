import React from "react";
import '../styles.css';

export default function ProductCard({product}) {

    const handleError = (e) => {
        e.target.src = "default.jpg";
    }
    return (
        <div key = {product.id} className='card'>
            <img src ={`/${product.image_path}`} alt = {product.title} onError={handleError}/>
            <div className='card-content'>
                <h2>{product.title}</h2>
                <p>{product.description}</p>
                <a href="#" className="button">
                    Add to Cart
                </a>
            </div>
        </div>
    )
}