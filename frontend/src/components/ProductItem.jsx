import React from "react";
import ProductCard from "./ProductCard";
import '../styles.css';

export default function ProductItem({product}){

    const id = product.id
    return ( 
        <div key = {id} className="product-container">
            <ProductCard product={product}> </ProductCard>
            <div className="button-wrapper">
                <button className="button" onClick={() => console.log("delete")}>
                    Delete
                </button>
                <button className="button" onClick={() => console.log("update")}>
                    Update
                </button>
            </div>
        </div>
    )
}