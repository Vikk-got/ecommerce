import React from 'react';
import '../styles/About.css';

const About = () => {
  return (
    <div className="about-page">
      {/* SECTION 1: HERO */}
      <section className="about-hero-section">
        <div className="about-hero-content">
          <h1 className="about-hero-title">ABOUT TECH STORE</h1>
        </div>
      </section>

      {/* SECTION 2: OUR STORY */}
      <section className="about-content-section">
        <div className="container">
          <h2 className="about-section-title">BUILT BY ENTHUSIASTS, FOR ENTHUSIASTS</h2>
          <div className="about-story-text">
            <p>
              TECH STORE was born from a simple yet powerful idea: technology should be accessible, exciting, and empowering. We started not in a boardroom, but in a garage, surrounded by circuit boards and a shared passion for the next big thing. We were tired of the sterile, confusing landscape of tech retail and dreamed of creating a place where fellow enthusiasts could find expertly curated gear without the guesswork.
            </p>
            <p>
              Our mission is to cut through the noise. In an industry flooded with endless options, we hand-pick every product for its performance, design, and reliability. We are more than just a retailer; we are a hub for innovation, a community for creators, and your trusted partner in the world of technology.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3: OUR VALUES */}
      <section className="about-values-section">
        <div className="container">
          <h2 className="about-section-title">WHAT DRIVES US</h2>
          <div className="values-grid">
            <div className="value-item">
              <h3 className="value-title">Innovation First</h3>
              <p className="value-description">
                We live on the cutting edge. Our catalog is a living collection of the most innovative and forward-thinking products on the market.
              </p>
            </div>
            <div className="value-item">
              <h3 className="value-title">Uncompromising Quality</h3>
              <p className="value-description">
                If we wouldn't use it, we won't sell it. Every item is tested and vetted to meet our impossibly high standards for quality and performance.
              </p>
            </div>
            <div className="value-item">
              <h3 className="value-title">Customer-Obsessed</h3>
              <p className="value-description">
                Our customers are at the core of everything we do. We're dedicated to providing exceptional support and building lasting relationships.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;