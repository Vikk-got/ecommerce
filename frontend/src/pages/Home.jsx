import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../services/api';
import ProductCard from '../components/ProductCard';
import '../styles/Home.css';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInitialProducts = async () => {
      try {
        const allProducts = await getProducts();
        setFeaturedProducts(allProducts.slice(0, 6));
        setNewArrivals(allProducts.slice(4, 6));
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchInitialProducts();
  }, []);

  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-video-wrapper">
          <video autoPlay loop muted playsInline className="hero-video">
            <source src="https://videos.pexels.com/video-files/7578546/7578546-hd_1920_1080_25fps.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="hero-content">
          <h1 className="hero-title">TECH, REDEFINED</h1>
          <p className="hero-subtitle">Experience the future with our new collection.</p>
          <Link to="/store" className="hero-cta-button">
            SHOP THE COLLECTION
          </Link>
        </div>
      </section>

      <section className="product-carousel-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">FEATURED PRODUCTS</h2>
            <Link to="/store" className="section-cta">SHOP ALL</Link>
          </div>
          {loading ? (
            <div className="home-loading">LOADING...</div>
          ) : (
            <div className="products-grid">
              {featuredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
      
      <section className="promo-banner-section">
          <div className="promo-content">
              <h2 className="promo-title">FREE SHIPPING</h2>
              <p className="promo-subtitle">ON ALL ORDERS OVER $100</p>
          </div>
      </section>

      <section className="product-carousel-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">NEW ARRIVALS</h2>
            <Link to="/store" className="section-cta">SHOP ALL</Link>
          </div>
          {loading ? (
            <div className="home-loading">LOADING...</div>
          ) : (
            <div className="products-grid">
              {newArrivals.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="newsletter-section">
        <div className="container">
          <h2 className="section-title">JOIN THE INNER CIRCLE</h2>
          <p className="newsletter-subtitle">
            Get exclusive deals, early access to new drops, and more.
          </p>
          <form className="newsletter-form">
            <input
              type="email"
              placeholder="Enter your email"
              className="newsletter-input"
            />
            <button type="submit" className="newsletter-button">
              SUBSCRIBE
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;