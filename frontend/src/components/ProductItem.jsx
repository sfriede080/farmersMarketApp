import React from "react";
import ProductCard from "./ProductCard";
import '../styles.css';

export default function ProductItem({product, dispatch}){

    const  {
        name, 
        category,
        description, 
        image,
        id,
        status,
        unit,
        unitsInStock,
        price
    } = product;

    return ( 
        <div key = {product.id}>
            <ProductCard product={product}> </ProductCard>
            <button className="button" onClick={() => dispatch({type: "DELETE_PRODUCT", payload: {id}})}>
                Delete
            </button>
            <button className="button" onClick={() => dispatch({type: "SET_EDITING_TICKET", payload: product})}>
                Edit
            </button>
        </div>
    )
}