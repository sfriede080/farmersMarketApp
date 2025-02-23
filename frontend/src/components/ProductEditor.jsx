import React, {useContext} from "react";
import '../styles.css';
import ProductGrid from "./ProductGrid";
import {Link} from "react-router-dom";
import UserContext from "../context/UserContext";

export default function ProductEditor({products, dispatch}) {

  const user = useContext(UserContext)
    return (
        <div>
            <nav>
              <ul>
                <li>
                  <Link to="/products/edits/add">Add Product</Link>
                </li>
              </ul>
            </nav>
            <div>
              <h3>Logged in as: {user.name}</h3>
            </div>
            <ProductGrid products={products} dispatch={dispatch}/>

        </div>
    )
}