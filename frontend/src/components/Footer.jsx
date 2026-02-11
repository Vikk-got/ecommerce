import { Link } from 'react-router-dom';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-main">
          {/* Column 1: Newsletter */}
          <div className="footer-column newsletter">
            <h3 className="footer-heading">JOIN THE INNER CIRCLE</h3>
            <p className="footer-newsletter-text">
              Be the first to know about new collections, exclusive deals, and more.
            </p>
            <form className="footer-newsletter-form">
              <input type="email" placeholder="Enter your email" className="footer-input" />
              <button type="submit" className="footer-button">→</button>
            </form>
          </div>

          {/* Column 2: Shop Links */}
          <div className="footer-column links">
            <h3 className="footer-heading">Shop</h3>
            <ul>
              <li><Link to="/store">All Products</Link></li>
              <li><Link to="/store/laptops">Laptops</Link></li>
              <li><Link to="/store/phones">Phones</Link></li>
              <li><Link to="/store/headphones">Headphones</Link></li>
              <li><Link to="/store/accessories">Accessories</Link></li>
            </ul>
          </div>

          {/* Column 3: Help Links */}
          <div className="footer-column links">
            <h3 className="footer-heading">Help</h3>
            <ul>
              <li><Link to="/faq">FAQ</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><Link to="/shipping">Shipping & Returns</Link></li>
              <li><Link to="/terms">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Column 4: Info Links */}
          <div className="footer-column links">
            <h3 className="footer-heading">Info</h3>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/careers">Careers</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-secondary">
            {/* Social Media Links */}
            <div className="footer-social">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">IG</a>
                <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer">TT</a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">TW</a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">YT</a>
            </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-copyright">
            &copy; {new Date().getFullYear()} Vatsal koriya. All Rights Reserved.
          </div>
          <div className="footer-payment-icons">
            <span>VISA</span>
            <span>MC</span>
            <span>AMEX</span>
            <span>PYPL</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;