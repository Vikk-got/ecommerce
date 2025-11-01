import '../styles/CartItem.css';

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  return (
    <div className="cart-item">
      <img
        src={`${API_URL}/uploads/${item.productId.imageUrl}`}
        alt={item.productId.name}
        className="cart-item-image"
      />
      <div className="cart-item-details">
        <h3 className="cart-item-name">{item.productId.name}</h3>
        <p className="cart-item-price">${item.productId.price}</p>
      </div>
      <div className="cart-item-quantity">
        <label htmlFor={`qty-${item.productId._id}`}>Quantity:</label>
        <select
          id={`qty-${item.productId._id}`}
          value={item.quantity}
          onChange={(e) => onUpdateQuantity(item.productId._id, Number(e.target.value))}
          className="cart-item-select"
        >
          {[...Array(Math.min(item.productId.stock, 10))].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
      </div>
      <div className="cart-item-subtotal">
        <p className="cart-item-subtotal-label">Subtotal:</p>
        <p className="cart-item-subtotal-amount">
          ${(item.productId.price * item.quantity).toFixed(2)}
        </p>
      </div>
      <button
        onClick={() => onRemove(item.productId._id)}
        className="cart-item-remove"
      >
        REMOVE
      </button>
    </div>
  );
};

export default CartItem;
