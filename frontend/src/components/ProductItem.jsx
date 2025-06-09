import React from "react";
import ProductCard from "./ProductCard";
import "../styles/styles.css";
import { useState } from "react";
import { createPortal } from "react-dom";
import DeleteProductModal from "./DeleteProductModal";
import UpdateProductModal from "./UpdateProductModal";

export default function ProductItem({ product }) {
  const [showModal, setShowModal] = useState("none");
  return (
    <div className="product-container">
      <ProductCard product={product}> </ProductCard>
      <div className="button-wrapper">
        <button className="button" onClick={() => setShowModal("delete")}>
          Delete
        </button>
        <button className="button" onClick={() => setShowModal("update")}>
          Update
        </button>
        {showModal === "delete" &&
          createPortal(
            <DeleteProductModal
              onClose={() => setShowModal("none")}
              product={product}
            />,
            document.body
          )}
        {showModal === "update" &&
          createPortal(
            <UpdateProductModal
              onClose={() => setShowModal("none")}
              product={product}
            />,
            document.body
          )}
      </div>
    </div>
  );
}
