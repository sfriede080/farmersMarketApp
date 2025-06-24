import "../styles/styles.css";
import defaultImage from "../assets/default.jpg";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart, cartItems } = useCart();

  const handleError = (e) => {
    e.target.src = defaultImage;
  };

  const cartItem = cartItems.find((item) => item.product_FK == product.ID);

  return (
    <div className="card">
      <img
        src={`/${product.image_path}`}
        alt={product.name}
        onError={handleError}
      />
      <div>
        <h2>{product.name}</h2>
        <p className="description">
          {product.description}
          <br />${product.price} / {product.unit}
        </p>
        <div className="card-footer">
          <a
            href="#"
            className="button"
            onClick={async () => {
              await addToCart(product, 1);
            }}
          >
            Add to Cart
          </a>
          {cartItem && <p className="in-cart">In Cart: {cartItem.quantity}</p>}
        </div>
      </div>
    </div>
  );
}
