import { Link } from 'react-router-dom';
import '../styles/ProductCard.css';

const ProductCard = ({ product }) => {
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  return (
    <div className="product-card">
      <Link to={`/product/${product._id}`}>
        <img
          src={`${API_URL}/uploads/${product.imageUrl}`}
          alt={product.name}
          className="product-card-image"
        />
      </Link>
      <div className="product-card-content">
        <span className="product-card-category">{product.category}</span>
        <Link to={`/product/${product._id}`}>
          <h3 className="product-card-title">{product.name}</h3>
        </Link>
        <p className="product-card-price">${product.price}</p>
        <p className="product-card-stock">
          {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
        </p>
        <Link to={`/product/${product._id}`} className="product-card-button">
          BUY NOW
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
