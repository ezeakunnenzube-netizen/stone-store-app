import { NavLink, useNavigate, useSearchParams } from "react-router-dom"
import "./Header.css"
import { Mail, Phone, Search, ShoppingBag, Menu, X } from "lucide-react";
import { useState } from "react";
import { useCart } from '../context/CartContext';
function Header(){
  const { setIsCartOpen, cartCount } = useCart();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const searchQuery = searchParams.get('q') || '';

  return(
    <section className="header-wrapper">
            <div className="pre-header">
              <div className="pre-header-container">
                <div className="contact-info">
                  <a href="tel:+18007866378" className="contact-link" style={{color:'rgb(196, 167, 1)'}}>
                    <Phone size={12} />
                    <span>+1 (800) STONE-ST</span>
                  </a>
                  <a href="mailto:support@stonestore.com" className="contact-link" style={{color:'rgb(196, 167, 1)'}}>
                    <Mail size={12} />
                    <span>support@stonestore.com</span>
                  </a>
                </div>
                <div className="menu-links">
                  <a href="/trade-program" className="menu-link" style={{color:'rgb(196, 167, 1)'}}>Trade Program</a>
                  <span className="divider" style={{color:'rgb(196, 167, 1)'}}>|</span>
                  <a href="/inquiry" className="menu-link" style={{color:'rgb(196, 167, 1)'}}>Inquiry</a>
                </div>
              </div>
            </div>
            <div className='header'>
              <div className='header-left-sec'>
                {/* Use stone-logo.png beside the store name */}
                
                <p className='logo-text'>
                  Stone's Store
                </p>
              </div>

              {/* Desktop Navigation */}
              <ul className='pages-list header-middle-sec desktop-nav'>
                <li className='pages-item'>
                  <NavLink className={({ isActive }) => `pages-link ${isActive ? 'active-link' : ''}`} to="/">Home</NavLink>
                </li>
                <li className='pages-item'>
                  <NavLink className={({ isActive }) => `pages-link ${isActive ? 'active-link' : ''}`} to='/products'>Products</NavLink>
                </li>
                <li className='pages-item'>
                  <NavLink className={({ isActive }) => `pages-link ${isActive ? 'active-link' : ''}`} to='/about'>About</NavLink>
                </li>
                <li className='pages-item'>
                  <NavLink className={({ isActive }) => `pages-link ${isActive ? 'active-link' : ''}`} to='/contact'>Contact</NavLink>
                </li>
              </ul>

              <div className='header-right-sec'>
                <div className="nav-actions">
                  <div className='search-icon-input'>
                    <button
                      type="button"
                      className="search-icon-button"
                      aria-label="Search"
                      onClick={() => {
                        const q = (searchQuery || '').trim();
                        if (q) {
                          setSearchParams({ q });
                          navigate('/search');
                        } else {
                          setSearchParams({});
                          navigate('/products');
                        }
                      }}
                    >
                      <Search className="search-icon" size={17} />
                    </button>

                    <input
                      placeholder="search stone..."
                      className="search-input"
                      value={searchQuery}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value) {
                          setSearchParams({ q: value });
                          navigate('/search');
                        } else {
                          setSearchParams({});
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          const q = (searchQuery || '').trim();
                          if (q) {
                            setSearchParams({ q });
                            navigate('/search');
                          }
                        }
                      }}
                    />
                  </div>
                  <div className="shopping-bag" onClick={() => setIsCartOpen(true)} style={{ cursor: 'pointer', color: 'black' }}>
                    <ShoppingBag />
                    <span className="shopping-bag-badge">{cartCount}</span>
                  </div>
                  <button
                    className="hamburger-btn"
                    onClick={() => setMobileMenuOpen(true)}
                    aria-label="Open menu"
                  >
                    <Menu size={22} />
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile Menu Overlay */}
            {mobileMenuOpen && (
              <div className="mobile-menu-overlay" onClick={() => setMobileMenuOpen(false)}>
                <div className="mobile-menu" onClick={(e) => e.stopPropagation()}>
                  {/* Close Button */}
                  <button 
                    className="mobile-menu-close"
                    onClick={() => setMobileMenuOpen(false)}
                    aria-label="Close menu"
                  >
                    <X size={28} />
                  </button>

                  <ul className="mobile-nav-list">
                    <li>
                      <NavLink 
                        className="mobile-nav-link" 
                        to="/"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Home
                      </NavLink>
                    </li>
                    <li>
                      <NavLink 
                        className="mobile-nav-link" 
                        to='/products'
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Products
                      </NavLink>
                    </li>
                    <li>
                      <NavLink 
                        className="mobile-nav-link" 
                        to='/about'
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        About
                      </NavLink>
                    </li>
                    <li>
                      <NavLink 
                        className="mobile-nav-link" 
                        to='/contact'
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Contacts
                      </NavLink>
                    </li>
                  </ul>

                  {/* Premium divider/logo section */}
                  <div className="mobile-menu-footer">
                    <div className="mobile-menu-divider"></div>
                    <p className="mobile-menu-logo-text">Stone's Store</p>
                  </div>
                </div>
              </div>
            )}
            
            </section>
  )
}
export default Header