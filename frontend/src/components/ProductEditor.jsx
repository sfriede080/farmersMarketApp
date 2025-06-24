import React, { useContext } from "react";
import "../styles/styles.css";
import ProductGrid from "./ProductGrid";
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext.js";
import { createPortal } from "react-dom";
import UpdateProductModal from "./UpdateProductModal";
import { useState } from "react";

export default function ProductEditor() {
  const { user, isAuthenticated, isLoading } = useContext(UserContext);
  const [showAddProductModal, setShowAddProductModal] = useState(false);

  if (isLoading) {
    return <div> Loading... </div>;
  }

  if (!isAuthenticated) {
    return <div> User is not authenticated! </div>;
  }

  return (
    <div>
      {showAddProductModal &&
        createPortal(
          <UpdateProductModal onClose={() => setShowAddProductModal(false)} />,
          document.body
        )}
      <div className="item-wrapper">
        <h3>Logged in as: {user && user.name ? user.name : "Unknown Admin"}</h3>

        <button className="button" onClick={() => setShowAddProductModal(true)}>
          Add Product
        </button>
      </div>
      <ProductGrid />
    </div>
  );
}
