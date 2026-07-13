import "./About.css"
import { Gem, Leaf, CheckCircle, Globe, ShieldCheck } from "lucide-react"
import { useEffect } from "react"
import image1 from "../art of extraction image5.png"
import image2 from "../art of extraction image2.jpg"
import image3 from "../art of extraction image3.jpg"

function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="about-page">

      {/* ================================================================
          HERO
          ================================================================ */}
      <div className="hero-container">
        <div className="hero-textboxes">
          <p className="hero-textbox1">Our Legacy</p>
          <h1 className="hero-textbox2">From the Earth<br />to Your Home</h1>
          <p className="hero-textbox3">
            We supply premium quality tiles that blend timeless elegance with lasting durability, transforming every room into a beautifully crafted living space.
          </p>
        </div>
      </div>

      {/* ================================================================
          OUR MISSION
          ================================================================ */}
      <div className="our-mission">
        <div className="our-mission-left">
          <h2 className="our-mission-heading">Our Mission</h2>
          <hr className="our-mission-hr" />
          <div className="our-mission-textbox1">
            <p>
              Founded in the heart of the stone trade, Stone's Store was born from a passion for geological wonder. We believe that every slab tells a story millions of years in the making. Our mission is to preserve that story through ethical sourcing and master-level craftsmanship.
            </p>
          </div>
          <div className="our-mission-image-text-container">
            <div className="our-mission-textbox2-left">
              <h2 className="our-mission-exp-years">25+</h2>
              <p className="our-mission-exp-text">Years of Experience</p>
            </div>
            <div className="our-mission-textbox2-right">
              <h2 className="our-mission-patners-num">40+</h2>
              <p className="our-mission-patners-text">Global Quarry Partners</p>
            </div>
          </div>
        </div>
        <div className="our-mission-right">
          <img
            src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80"
            alt="Stone showroom interior"
          />
          <div className="our-mission-image-text">
            <span>Certified</span>
            <strong>Master-Grade Selection</strong>
          </div>
        </div>
      </div>

      {/* ================================================================
          ART OF EXTRACTION
          ================================================================ */}
      <div className="art-of-extraction-section">
        <span className="art-of-extraction-eyebrow">Our Process</span>
        <h2 className="art-of-extraction-title">The Art of Extraction</h2>
        <p className="art-of-extraction-text">
          Witness the journey of a single block of marble — from the mountainside to a precision-cut tile in your home.
        </p>
        <div className="art-of-extraction-images">
          <div className="art-of-extraction-image1">
            <img className="phase1-image" src={image1} alt="Phase 1 — Ethical Extraction" />
            <div className="image1-textboxes">
              <p className="image1-textbox1">Phase 01</p>
              <p className="image1-textbox2">Ethical Extraction</p>
            </div>
          </div>
          <div className="art-of-extraction-images-right">
            <div className="art-of-extraction-image2">
              <img className="phase2-image" src={image2} alt="Phase 2 — Precision Slicing" />
              <div className="image2-textboxes">
                <p className="image2-textbox1">Phase 02</p>
                <p className="image2-textbox2">Precision Slicing</p>
              </div>
            </div>
            <div className="art-of-extraction-image3">
              <img className="phase3-image" src={image3} alt="Phase 3 — Hand Finishing" />
              <div className="image3-textboxes">
                <p className="image3-textbox1">Phase 03</p>
                <p className="image3-textbox2">Hand Finishing</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================================================================
          PRODUCT FEATURES
          ================================================================ */}
      <div className="product-features">
        <div className="product-features-block">
          <Leaf color="var(--gold)" size={32} />
          <p className="product-features-heading">Sustainability</p>
          <p>Our quarries operate with strict environmental restoration plans, ensuring we respect the land that provides our materials.</p>
        </div>
        <div className="product-features-block">
          <CheckCircle color="var(--gold)" size={32} />
          <p className="product-features-heading">Quality Control</p>
          <p>Every single slab is inspected for structural integrity and aesthetic consistency by our master stonemasons.</p>
        </div>
        <div className="product-features-block">
          <Globe color="var(--gold)" size={32} />
          <p className="product-features-heading">Global Reach</p>
          <p>From Italian Carrara to Brazilian Quartzite, we source from only the most renowned geological sites worldwide.</p>
        </div>
        <div className="product-features-block">
          <ShieldCheck color="var(--gold)" size={32} />
          <p className="product-features-heading">Trade Trust</p>
          <p>We are the preferred partner for architectural firms and interior designers who demand reliability and luxury.</p>
        </div>
      </div>

    </div>
  )
}

export default About