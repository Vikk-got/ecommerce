import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCart, updateCartItem, removeFromCart } from '../services/api';
import CartItem from '../components/CartItem';
import '../styles/Cart.css';

const Cart = ({ setCart }) => {
  const [cartData, setCartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const data = await getCart();
      setCartData(data);
      setCart(data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateQuantity = async (productId, quantity) => {
    try {
      const data = await updateCartItem(productId, quantity);
      setCartData(data);
      setCart(data);
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };

  const handleRemoveItem = async (productId) => {
    try {
      const data = await removeFromCart(productId);
      setCartData(data);
      setCart(data);
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const calculateTotal = () => {
    if (!cartData || !cartData.items) return 0;
    return cartData.items.reduce(
      (total, item) => total + item.productId.price * item.quantity,
      0
    ).toFixed(2);
  };

  if (loading) return <div className="cart-loading">LOADING CART...</div>;

  return (
    <div className="cart-container">
      <h1 className="cart-title">SHOPPING CART</h1>

      {!cartData || cartData.items.length === 0 ? (
        <div className="cart-empty">
          <p>Your cart is empty</p>
          <Link to="/" className="cart-continue-button">
            CONTINUE SHOPPING
          </Link>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cartData.items.map((item) => (
              <CartItem
                key={item.productId._id}
                item={item}
                onUpdateQuantity={handleUpdateQuantity}
                onRemove={handleRemoveItem}
              />
            ))}
          </div>
          <div className="cart-summary">
            <div className="cart-total">
              <span className="cart-total-label">TOTAL:</span>
              <span className="cart-total-amount">${calculateTotal()}</span>
            </div>
            <button onClick={() => navigate('/checkout')} className="cart-checkout-button">
              PROCEED TO CHECKOUT
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
 