import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById, addToCart } from '../services/api';
import '../styles/ProductDetails.css';

const ProductDetails = ({ user }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const data = await getProductById(id);
      setProduct(data);
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      await addToCart(product._id, quantity);
      setMessage('Added to cart successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to add to cart');
    }
  };

  if (loading) return <div className="product-details-loading">LOADING...</div>;
  if (!product) return <div className="product-details-loading">PRODUCT NOT FOUND</div>;

  return (
    <div className="product-details-container">
      <div className="product-details-image-section">
        <img
          src={`${API_URL}/uploads/${product.imageUrl}`}
          alt={product.name}
          className="product-details-image"
        />
      </div>

      <div className="product-details-info-section">
        <span className="product-details-category">{product.category}</span>
        <h1 className="product-details-title">{product.name}</h1>
        <p className="product-details-price">${product.price}</p>
        <p className="product-details-description">{product.description}</p>

        <div className="product-details-stock">
          {product.stock > 0 ? (
            <span className="stock-available">{product.stock} in stock</span>
          ) : (
            <span className="stock-out">Out of stock</span>
          )}
        </div>

        {product.stock > 0 && (
          <div className="product-details-actions">
            <div className="product-details-quantity">
              <label htmlFor="quantity">Quantity:</label>
              <select
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
              >
                {[...Array(Math.min(product.stock, 10))].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>

            <button onClick={handleAddToCart} className="product-details-button">
              ADD TO CART
            </button>
          </div>
        )}

        {message && (
          <div className={`product-details-message ${message.includes('success') ? 'success' : 'error'}`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
