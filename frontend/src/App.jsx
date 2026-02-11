import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import Home from './pages/Home';
import Store from './pages/Store';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import About from './pages/About'
import './styles/App.css';

function App() {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (token) {
      // Decode token to get user info (simple approach)
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUser({
          _id: payload.userId,
          email: payload.email,
          role: payload.role,
          name: payload.email.split('@')[0], // Simple name extraction
        });
      } catch (error) {
        console.error('Invalid token:', error);
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setCart(null);
    window.location.href = '/';
  };

  const cartItemCount = cart?.items?.length || 0;

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', fontSize: '24px', fontWeight: 'bold' }}>
        LOADING...
      </div>
    );
  }

  return (
    <div className="app">
      <Navbar user={user} cartItemCount={cartItemCount} onLogout={handleLogout} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails user={user} />} />

        <Route
          path="/cart"
          element={
            <PrivateRoute user={user}>
              <Cart setCart={setCart} />
            </PrivateRoute>
          }
        />
        <Route
          path="/store"
          element={
            <PrivateRoute user={user}>
              <Store />
            </PrivateRoute>
          }
        />

        <Route
          path="/checkout"
          element={
            <PrivateRoute user={user}>
              <Checkout />
            </PrivateRoute>
          }
        />

        <Route
          path="/order-success"
          element={
            <PrivateRoute user={user}>
              <OrderSuccess />
            </PrivateRoute>
          }
        />

        <Route
          path="/login"
          element={user ? <Navigate to="/" replace /> : <Login setUser={setUser} />}
        />

        <Route
          path="/register"
          element={user ? <Navigate to="/" replace /> : <Register setUser={setUser} />}
        />

        <Route
          path="/dashboard"
          element={
            <AdminRoute user={user}>
              <Dashboard />
            </AdminRoute>
          }
        />
        <Route path="/about" element={<About />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
