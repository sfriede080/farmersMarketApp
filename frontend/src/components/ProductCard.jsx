import React from "react";
import '../styles.css';

export default function ProductCard({product}) {

    const handleError = (e) => {
        e.target.src = "default.jpg";
    }

    return (
        <div key = {product.id} className='card'>
            <img src ={`/${product.image_path}`} alt = {product.name} onError={handleError}/>
            <div className='card-content'>
                <h2>{product.name}</h2>
                <p>{product.description}
                <br/>
                ${product.price} / {product.unit}</p>
                <a href="#" className="button">
                    Add to Cart
                </a>
            </div>
        </div>
    )
}