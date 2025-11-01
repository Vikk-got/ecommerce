import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = ({ user, cartItemCount, onLogout }) => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          TECH STORE
        </Link>

        <div className="navbar-links">
          <Link to="/" className="navbar-link">
            HOME
          </Link>
          <Link to="/cart" className="navbar-link cart-link">
            CART
            {cartItemCount > 0 && (
              <span className="cart-badge">{cartItemCount}</span>
            )}
          </Link>

          {user ? (
            <>
              <span className="navbar-user">HELLO, {user.name.toUpperCase()}</span>
              {user.role === 'admin' && (
                <Link to="/dashboard" className="navbar-link">
                  DASHBOARD
                </Link>
              )}
              <button onClick={onLogout} className="navbar-button">
                LOGOUT
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="navbar-link">
                LOGIN
              </Link>
              <Link to="/register" className="navbar-link">
                REGISTER
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
