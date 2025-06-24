import useDeleteProduct from "../api/hooks/products/useDeleteProduct";

export default function DeleteProductModal({ onClose, product }) {
  const mutation = useDeleteProduct();

  const handleClick = (e) => {
    const id = product.ID;
    mutation.mutate(id);
  };

  let content = (
    <>
      <p>Are you sure you want to delete {product.name}?</p>
      <button onClick={handleClick}>Delete</button>
    </>
  );

  if (mutation.isPending) {
    content = (
      <>
        <p>Deleting product...</p>
      </>
    );
  }
  if (mutation.isError) {
    content = (
      <>
        <p>Error deleting product.</p>
      </>
    );
  }

  if (mutation.isSuccess) {
    content = <div>Product deleted!</div>;
  }
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {content}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
