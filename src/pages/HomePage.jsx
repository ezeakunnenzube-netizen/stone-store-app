import { ArrowRight, Shield, Truck, Gem, Calculator } from "lucide-react";
import { Link } from "react-router-dom";
import './HomePage.css'
import { useState, useEffect } from 'react'

function HomePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');

  const calculatedArea = (parseFloat(length) || 0) * (parseFloat(width) || 0);

  return (
    <div className="home-page">

      {/* ================================================================
          HERO — Full-Viewport Cinematic
          ================================================================ */}
      <div className="hero">
        <div className="hero-text-boxes">
          <div className="hero-eyebrow">
            Est. Carrara, Italy
          </div>
          <div className="hero-text-box1">
            Timeless Elegance<br />In Every Slab
          </div>
          <div className="hero-divider" />
          <div className="hero-text-box2">
            A curated house of marble, travertine, and natural stone — sourced from the world's most storied quarries.
          </div>
          <div className="hero-text-box3">
            — Stone is never just material
          </div>
          <div className="hero-cta-row">
            <Link to="/products" className="hero-cta-primary">Explore Collection</Link>
            <Link to="/contact" className="hero-cta-secondary">Request a Consultation</Link>
          </div>
        </div>
      </div>

      {/* ================================================================
          CURATED COLLECTIONS
          ================================================================ */}
      <div className="curated-collections">
        <div className="curated-collections-top">
          <div className="curated-texts">
            <div className="curated-eyebrow">Our Collections</div>
            <h2 className="curated-texts-heading">Curated Collections</h2>
            <div className="curated-texts-paragraph">
              Expertly sourced materials from quarries worldwide, processed with cutting-edge technology and an obsessive eye for quality.
            </div>
          </div>
          <div className="categories-btn-div">
            <Link to="/products">
              <button className="categories-btn">
                <span>View All Categories</span>
                <ArrowRight size={16} className="categories-btn-arrow" />
              </button>
            </Link>
          </div>
        </div>

        <div className="curated-collections-images">
          <div className="curated-collections-image">
            <img
              src="https://images.unsplash.com/photo-1615873968403-89e068629265?w=1200&q=80"
              alt="Carrara Classic Collection"
            />
            <div className="curated-collections-image-text">
              <p className="curated-collections-image-unit">142 Products</p>
              <h2 className="curated-collections-image-name">Carrara Classic</h2>
            </div>
          </div>
          <div className="curated-collections-image">
            <img
              src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=900&q=80"
              alt="Roman Travertine Collection"
            />
            <div className="curated-collections-image-text">
              <p className="curated-collections-image-unit">87 Products</p>
              <h2 className="curated-collections-image-name">Roman Travertine</h2>
            </div>
          </div>
          <div className="curated-collections-image">
            <img
              src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=900&q=80"
              alt="Nero Marquina Collection"
            />
            <div className="curated-collections-image-text">
              <p className="curated-collections-image-unit">64 Products</p>
              <h2 className="curated-collections-image-name">Nero Marquina</h2>
            </div>
          </div>
        </div>
      </div>

      {/* ================================================================
          COMPANY FEATURES — Dark Strip
          ================================================================ */}
      <div className="company-features">
        <div className="company-feature">
          <div className="feature-icon">
            <Shield size={36} />
          </div>
          <div className="company-feature-textbox1">Eco-Certified Materials</div>
          <div className="company-feature-textbox2">
            We prioritize sustainable quarrying practices and environmentally friendly shipping methods.
          </div>
        </div>
        <div className="company-feature">
          <div className="feature-icon">
            <Truck size={36} />
          </div>
          <div className="company-feature-textbox1">Global White-Glove Shipping</div>
          <div className="company-feature-textbox2">
            Secure, insured transit from our Italian logistics center directly to your project site.
          </div>
        </div>
        <div className="company-feature">
          <div className="feature-icon">
            <Gem size={36} />
          </div>
          <div className="company-feature-textbox1">Hand-Selected Quality</div>
          <div className="company-feature-textbox2">
            Every slab and batch is inspected by our experts to ensure consistent veining and tone.
          </div>
        </div>
      </div>

      {/* ================================================================
          TILE CALCULATOR — Obsidian Panel
          ================================================================ */}
      <div className="tiles-calculator-div">
        <div className="calculator-and-description">
          <div className="calculator-description">
            <div className="calculator-desc-textbox1">
              <Calculator size={14} />
              <span>Free Estimation Tool</span>
            </div>
            <div className="calculator-desc-textbox2">
              Plan with Precision.<br />Calculate with Ease.
            </div>
            <div className="calculator-desc-textbox3">
              Don't guess your project needs. Our smart tile calculator handles room dimensions, wastage, and grout spacing for a perfect quote.
            </div>
            <button
              className="launch-calculator-button"
              type="button"
              onClick={() => window.location.assign("/calculator")}
            >
              Launch Full Calculator
            </button>
          </div>

          <div className="tiles-calculator">
            <div className="calculator-input-fields">
              <div className="calculator-input-field">
                <label>Length (m)</label>
                <input
                  className="calculator-input-element"
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                  type="number"
                  placeholder="e.g. 8"
                />
              </div>
              <div className="calculator-input-field">
                <label>Width (m)</label>
                <input
                  className="calculator-input-element"
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                  type="number"
                  placeholder="e.g. 5"
                />
              </div>
            </div>
            <div className="total-area">
              <p>
                Total Area
                <span>{calculatedArea.toFixed(2)} m²</span>
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default HomePage;