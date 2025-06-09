import ProductForm from "./ProductForm";

export default function UpdateProductModal({ onClose, product }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <ProductForm product={product} />
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
