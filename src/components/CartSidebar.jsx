import React from 'react';
import { useCart } from '../context/CartContext';
import { X, ShoppingBag, Plus, Minus, Trash2 } from 'lucide-react';
import './CartSidebar.css';

export default function CartSidebar() {
  const {
    cart,
    cartTotal,
    isCartOpen,
    setIsCartOpen,
    setIsCheckoutOpen,
    updateQuantity,
    removeFromCart
  } = useCart();

  return (
    <>
      {isCartOpen && (
        <>
          <div className="cart-overlay" onClick={() => setIsCartOpen(false)} />
          <div className="cart-sidebar">
            <div className="cart-header">
              <h2>Your Cart</h2>
              <button className="close-cart" onClick={() => setIsCartOpen(false)}>
                <X size={24} />
              </button>
            </div>

            <div className="cart-content">
              {cart.length === 0 ? (
                <div className="empty-cart">
                  <ShoppingBag size={48} style={{ color: 'var(--gold)', marginBottom: '16px' }} />
                  <p>Your cart is empty</p>
                </div>
              ) : (
                <>
                  <div className="cart-items">
                    {cart.map(item => (
                      <div key={item.id} className="cart-item">
                        <div className="cart-item-image">
                          <img src={item.image} alt={item.name} />
                        </div>
                        <div className="cart-item-details">
                          <div className="cart-item-header">
                            <h4>{item.name}</h4>
                            <button
                              className="remove-item"
                              onClick={() => removeFromCart(item.id)}
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                          <p className="cart-item-origin">{item.origin}</p>
                          <div className="cart-item-footer">
                            <div className="quantity-control">
                              <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                                <Minus size={12} />
                              </button>
                              <span className="quantity-number">{item.quantity}</span>
                              <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                                <Plus size={12} />
                              </button>
                            </div>
                            <span className="cart-item-price">${(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="cart-footer">
                    <div className="cart-total">
                      <span>Total</span>
                      <span className="total-price">${cartTotal.toFixed(2)}</span>
                    </div>
                    <button
                      className="checkout-button"
                      onClick={() => {
                        setIsCartOpen(false);
                        setIsCheckoutOpen(true);
                      }}
                    >
                      Proceed to Checkout
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}