import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cartItems } = useCart();

  return (
    <>
      <ul>
        {cartItems.map((item) => (
          <li key={item.product_FK}>
            <p>Product: {item.Product.name}</p>
            <p>Quantity: {item.quantity}</p>
            <p>Price: {item.quantity * item.Product.price}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
