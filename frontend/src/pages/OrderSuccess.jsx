import { Link } from 'react-router-dom';
import '../styles/OrderSuccess.css';

const OrderSuccess = () => {
  return (
    <div className="order-success-container">
      <div className="order-success-card">
        <div className="order-success-icon">✓</div>
        <h1 className="order-success-title">ORDER PLACED SUCCESSFULLY!</h1>
        <p className="order-success-message">
          Thank you for your purchase. Your order will be processed shortly.
        </p>
        <Link to="/" className="order-success-button">
          CONTINUE SHOPPING
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccess;
