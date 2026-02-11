import React from 'react';
import styled from 'styled-components';

const Card = () => {
  return (
    <StyledWrapper>
      <div className="brutalist-container">
        <div className="slab-bg slab-1" />
        <div className="slab-bg slab-2" />
        <div className="concrete-block">
          <div className="concrete-texture" />
          <div className="paper-texture" />
          <div className="main-content">
            <div className="title-text">SOCIALS</div>
            <div className="social-grid">
          <a href="https://x.com/vatyoi" target="_blank" rel="noopener noreferrer">
              <div className="social-cell">
                <svg viewBox="0 0 24 24" className="social-icon">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </div>
          </a>
          <a href="https://www.linkedin.com/in/vatsal-koriya-bb775233a/" target="_blank" rel="noopener noreferrer">
              <div className="social-cell">
                <svg viewBox="0 0 24 24" className="social-icon">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </div>
          </a>
          <a href="https://www.instagram.com/yovtsl/" target="_blank" rel="noopener noreferrer">
              <div className="social-cell">
                <svg viewBox="0 0 24 24" className="social-icon">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </div>
          </a>
          <a href="https://github.com/Vikk-got/" target="_blank" rel="noopener noreferrer">
              <div className="social-cell">
                <svg viewBox="0 0 24 24" className="social-icon">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </div>
          </a>
            </div>
          </div>
          <div className="scan-effect" />
          <div className="rivet" />
          <div className="rivet" />
          <div className="rivet" />
          <div className="rivet" />
        </div>
        <div className="type-accent">SYS//SOCIAL_LINKS</div>
        <div className="corner-bracket bracket-tl" />
        <div className="corner-bracket bracket-tr" />
        <div className="corner-bracket bracket-bl" />
        <div className="corner-bracket bracket-br" />
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .brutalist-container {
    position: relative;
    width: 300px;
    height: 110px;
    cursor: pointer;
  }
  .concrete-block {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #000;
    border: 8px solid #000;
    transition: all 0.6s cubic-bezier(0.19, 1, 0.22, 1);
    overflow: hidden;
  }
  .brutalist-container:hover .concrete-block {
    transform: translate(-12px, -12px) rotate(-2deg);
    box-shadow: 12px 12px 0 #333, 24px 24px 0 #666, 36px 36px 0 #999;
  }
  .concrete-texture {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: repeating-linear-gradient(
        45deg,
        #000 0px,
        #000 2px,
        #111 2px,
        #111 4px
      ),
      repeating-linear-gradient(
        -45deg,
        transparent 0px,
        transparent 8px,
        rgba(255, 255, 255, 0.05) 8px,
        rgba(255, 255, 255, 0.05) 10px
      );
    opacity: 0.3;
  }
  .main-content {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
  }
  .title-text {
    color: #fff;
    font-size: 32px;
    font-weight: 400;
    letter-spacing: 6px;
    text-transform: uppercase;
    transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    text-shadow: 2px 2px 0 #333, 4px 4px 0 #666;
  }
  .brutalist-container:hover .title-text {
    opacity: 0;
    transform: translateY(-40px) rotateX(90deg) scale(0.3);
    filter: blur(8px);
  }
  .social-grid {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    gap: 3px;
    padding: 14px;
    opacity: 0;
    transform: translateY(40px) rotateX(-90deg) scale(1.3);
    transition: all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }
  .brutalist-container:hover .social-grid {
    opacity: 1;
    transform: translateY(0) rotateX(0deg) scale(1);
  }
  .social-cell {
    position: relative;
    background: #fff;
    border: 4px solid #000;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    overflow: hidden;
  }
  .social-cell:nth-child(1),
  .social-cell:nth-child(2),
  .social-cell:nth-child(3),
  .social-cell:nth-child(4) {
    transition-delay: 0.1s;
  }
  .social-cell:hover {
    background: #000;
    transform: scale(1.1) rotate(5deg);
    border-color: #fff;
    z-index: 10;
    box-shadow: 8px 8px 0 rgba(0, 0, 0, 0.3);
  }
  .social-cell:hover .social-icon {
    fill: #fff;
    transform: scale(1.2) rotate(-5deg);
  }
  .social-icon {
    width: 24px;
    height: 24px;
    fill: #000;
    transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }
  /* Concrete slab backgrounds */
  .slab-bg {
    position: absolute;
    background: #ddd;
    border: 4px solid #000;
    z-index: -1;
    transition: all 0.6s cubic-bezier(0.19, 1, 0.22, 1);
  }
  .slab-1 {
    top: 18px;
    left: 18px;
    width: 264px;
    height: 74px;
  }
  .slab-2 {
    top: 36px;
    left: 36px;
    width: 228px;
    height: 38px;
  }
  .brutalist-container:hover .slab-1 {
    transform: translate(20px, 20px) rotate(1deg);
  }
  .brutalist-container:hover .slab-2 {
    transform: translate(-10px, 30px) rotate(-1deg);
  }
  /* Industrial corner brackets */
  .corner-bracket {
    position: absolute;
    width: 20px;
    height: 20px;
    border: 4px solid #000;
    background: #fff;
    transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }
  .bracket-tl {
    top: -10px;
    left: -10px;
    border-right: none;
    border-bottom: none;
  }
  .bracket-tr {
    top: -10px;
    right: -10px;
    border-left: none;
    border-bottom: none;
  }
  .bracket-bl {
    bottom: -10px;
    left: -10px;
    border-right: none;
    border-top: none;
  }
  .bracket-br {
    bottom: -10px;
    right: -10px;
    border-left: none;
    border-top: none;
  }
  .brutalist-container:hover .corner-bracket {
    transform: scale(1.5);
    background: #000;
    border-color: #fff;
  }
  /* Typography accent */
  .type-accent {
    position: absolute;
    top: -30px;
    left: 0;
    font-family: 'JetBrains Mono', monospace;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 2px;
    color: #000;
    transition: all 0.4s ease;
    opacity: 0;
  }
  .brutalist-container:hover .type-accent {
    opacity: 1;
    transform: translateY(5px);
  }
  /* Industrial rivets */
  .rivet {
    position: absolute;
    width: 8px;
    height: 8px;
    background: #000;
    border-radius: 50%;
    border: 2px solid #333;
    transition: all 0.3s ease;
  }
  .rivet:nth-child(1) {
    top: 10px;
    left: 10px;
  }
  .rivet:nth-child(2) {
    top: 10px;
    right: 10px;
  }
  .rivet:nth-child(3) {
    bottom: 10px;
    left: 10px;
  }
  .rivet:nth-child(4) {
    bottom: 10px;
    right: 10px;
  }
  .brutalist-container:hover .rivet {
    background: #fff;
    transform: scale(1.5);
  }
  /* Scan line effect */
  .scan-effect {
    position: absolute;
    top: 0;
    left: -100%;
    width: 4px;
    height: 100%;
    background: linear-gradient(180deg, transparent, #fff, transparent);
    transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    opacity: 0.8;
  }
  .brutalist-container:hover .scan-effect {
    left: 100%;
  }
  /* Paper texture overlay */
  .paper-texture {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(
        circle at 20% 50%,
        transparent 20%,
        rgba(255, 255, 255, 0.3) 21%,
        rgba(255, 255, 255, 0.3) 34%,
        transparent 35%,
        transparent
      ),
      linear-gradient(
        0deg,
        transparent 24%,
        rgba(255, 255, 255, 0.05) 25%,
        rgba(255, 255, 255, 0.05) 26%,
        transparent 27%,
        transparent 74%,
        rgba(255, 255, 255, 0.05) 75%,
        rgba(255, 255, 255, 0.05) 76%,
        transparent 77%,
        transparent
      );
    pointer-events: none;
  }
`;

export default Card;
