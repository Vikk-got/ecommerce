import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCart, createOrder } from '../services/api';
import '../styles/Checkout.css';

const Checkout = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const [shippingAddress, setShippingAddress] = useState({
    fullName: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
  });

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const data = await getCart();
      setCart(data);
      if (!data.items || data.items.length === 0) {
        navigate('/cart');
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateTotal = () => {
    if (!cart || !cart.items) return 0;
    return cart.items.reduce(
      (total, item) => total + item.productId.price * item.quantity,
      0
    ).toFixed(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      await createOrder(shippingAddress);
      navigate('/order-success');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to place order');
      setSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setShippingAddress({
      ...shippingAddress,
      [e.target.name]: e.target.value,
    });
  };

  if (loading) return <div className="checkout-loading">LOADING...</div>;

  return (
    <div className="checkout-container">
      <h1 className="checkout-title">CHECKOUT</h1>

      <div className="checkout-content">
        <div className="checkout-form-section">
          <h2 className="checkout-section-title">SHIPPING ADDRESS</h2>
          {error && <div className="checkout-error">{error}</div>}

          <form onSubmit={handleSubmit} className="checkout-form">
            <div className="checkout-field">
              <label htmlFor="fullName">Full Name:</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={shippingAddress.fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="checkout-field">
              <label htmlFor="address">Address:</label>
              <input
                type="text"
                id="address"
                name="address"
                value={shippingAddress.address}
                onChange={handleChange}
                required
              />
            </div>

            <div className="checkout-field">
              <label htmlFor="city">City:</label>
              <input
                type="text"
                id="city"
                name="city"
                value={shippingAddress.city}
                onChange={handleChange}
                required
              />
            </div>

            <div className="checkout-field">
              <label htmlFor="postalCode">Postal Code:</label>
              <input
                type="text"
                id="postalCode"
                name="postalCode"
                value={shippingAddress.postalCode}
                onChange={handleChange}
                required
              />
            </div>

            <div className="checkout-field">
              <label htmlFor="country">Country:</label>
              <input
                type="text"
                id="country"
                name="country"
                value={shippingAddress.country}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" disabled={submitting} className="checkout-submit-button">
              {submitting ? 'PLACING ORDER...' : 'PLACE ORDER'}
            </button>
          </form>
        </div>

        <div className="checkout-summary-section">
          <h2 className="checkout-section-title">ORDER SUMMARY</h2>
          <div className="checkout-summary">
            {cart && cart.items && cart.items.map((item) => (
              <div key={item.productId._id} className="checkout-summary-item">
                <span className="checkout-summary-item-name">
                  {item.productId.name} × {item.quantity}
                </span>
                <span className="checkout-summary-item-price">
                  ${(item.productId.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
            <div className="checkout-summary-total">
              <span className="checkout-summary-total-label">TOTAL:</span>
              <span className="checkout-summary-total-amount">${calculateTotal()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
