import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = ({ user, cartItemCount, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  }

  return (
    <header className="header">
      <nav className="navbar">
        <div className="navbar-container">
          {/* Left Section: Main Navigation */}
          <div className="navbar-left">
            <Link to="/store" className="navbar-link" onClick={closeMenu}>
              STORE
            </Link>
            <Link to="/about" className="navbar-link" onClick={closeMenu}>
              ABOUT
            </Link>
          </div>

          {/* Center Section: Brand Logo */}
          <div className="navbar-center">
            <Link to="/home" className="navbar-brand" onClick={closeMenu}>
              TECH STORE
            </Link>
          </div>

          {/* Right Section: Icons and Auth */}
          <div className="navbar-right">
            {user ? (
              <>
                {user.role === 'admin' && (
                  <Link to="/dashboard" className="navbar-link icon-link" onClick={closeMenu}>
                    DASHBOARD
                  </Link>
                )}
                <button onClick={() => { onLogout(); closeMenu(); }} className="navbar-button icon-link">
                  LOGOUT
                </button>
              </>
            ) : (
              <Link to="/login" className="navbar-link icon-link" onClick={closeMenu}>
                ACCOUNT
              </Link>
            )}
            <Link to="/cart" className="navbar-link cart-link" onClick={closeMenu}>
              CART
              {cartItemCount > 0 && (
                <span className="cart-badge">{cartItemCount}</span>
              )}
            </Link>
          </div>

          {/* Hamburger Menu Toggler */}
          <div className="navbar-toggler" onClick={toggleMenu}>
            <div className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></div>
            <div className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></div>
            <div className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
        <Link to="/store" className="mobile-menu-link" onClick={closeMenu}>Store</Link>
        <Link to="/about" className="mobile-menu-link" onClick={closeMenu}>About</Link>
        <hr className="mobile-menu-divider" />
        {user ? (
            <>
              {user.role === 'admin' && (
                  <Link to="/dashboard" className="mobile-menu-link" onClick={closeMenu}>Dashboard</Link>
              )}
               <button onClick={() => { onLogout(); closeMenu(); }} className="mobile-menu-button">Logout</button>
            </>
        ) : (
            <Link to="/login" className="mobile-menu-link" onClick={closeMenu}>Account</Link>
        )}
        <Link to="/cart" className="mobile-menu-link" onClick={closeMenu}>Cart ({cartItemCount})</Link>
      </div>
    </header>
  );
};

export default Navbar;