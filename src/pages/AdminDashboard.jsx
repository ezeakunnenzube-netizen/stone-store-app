import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { query, orderBy, getDocs } from 'firebase/firestore';

import { RefreshCw, MessageSquare, LogOut, Mail, Lock, ShoppingBag, Phone } from 'lucide-react';
import './AdminDashboard.css';
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';


export default function AdminDashboard() {
  const [inquiries, setInquiries] = useState([]);
  const [inquiriesError, setInquiriesError] = useState('');
  const [orders, setOrders] = useState([]);
  const [ordersError, setOrdersError] = useState('');
  const [activeTab, setActiveTab] = useState('inquiries'); // 'inquiries' | 'orders' | 'add-products' | 'manage-products'

  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(false);
  const [productsError, setProductsError] = useState('');


  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const auth = getAuth();

  const fetchInquiries = async () => {
    try {
      setInquiriesError('');
      const q = query(collection(db, 'inquiries'), orderBy('timestamp', 'desc'));
      const querySnapshot = await getDocs(q);
      
      const inquiriesList = querySnapshot.docs.map(doc => {
        const data = doc.data();
        let formattedTimestamp = 'Just now';
        if (data.timestamp) {
          try {
            const date = data.timestamp.toDate();
            formattedTimestamp = date.toLocaleString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            });
          } catch (e) {
            formattedTimestamp = 'Just now';
          }
        }
        return {
          id: doc.id,
          fullName: data.fullName || 'Anonymous',
          email: data.email || 'No email provided',
          subject: data.subject || 'General Inquiry',
          message: data.message || '(Empty message body)',
          attachment: data.attachment,
          timestamp: formattedTimestamp
        };
      });
      
      setInquiries(inquiriesList);
    } catch (err) {
      console.error('Error fetching inquiries:', err);
      setInquiriesError(err.message || err.code || 'Could not load inquiries.');
    }
  };

  const fetchOrders = async () => {
    try {
      setOrdersError('');
      const q = query(collection(db, 'orders'), orderBy('timestamp', 'desc'));
      const querySnapshot = await getDocs(q);
      
      const ordersList = querySnapshot.docs.map(doc => {
        const data = doc.data();
        let formattedTimestamp = 'Just now';
        if (data.timestamp) {
          try {
            const date = data.timestamp.toDate();
            formattedTimestamp = date.toLocaleString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            });
          } catch (e) {
            formattedTimestamp = 'Just now';
          }
        }
        return {
          id: doc.id,
          customer: data.customer || {},
          items: data.items || [],
          total: data.total || 0,
          timestamp: formattedTimestamp
        };
      });
      
      setOrders(ordersList);
    } catch (err) {
      console.error('Error fetching orders:', err);
      setOrdersError(err.message || err.code || 'Could not load orders.');
    }
  };

  const fetchProducts = async () => {
    try {
      setProductsLoading(true);
      setProductsError('');

      const snap = await getDocs(collection(db, 'products'));
      const list = snap.docs.map((d) => {
        const data = d.data() || {};
        return {
          id: data.id ?? Number(d.id),
          firestoreId: d.id,
          ...data,
        };
      });

      setProducts(list);
    } catch (err) {
      console.error('Error fetching products:', err);
      const errorMsg = err.message || err.code || 'Unknown error';
      setProductsError(`Could not load products: ${errorMsg}`);
      setProducts([]);
    } finally {
      setProductsLoading(false);
    }
  };

  const fetchAllData = async () => {
    setLoading(true);
    setErrorMessage('');
    try {
      await Promise.all([fetchInquiries(), fetchOrders(), fetchProducts()]);
    } catch (err) {

      console.error('Error fetching data:', err);
      setErrorMessage('Could not load data. Check your Firebase setup.');
    } finally {
      setLoading(false);
    }
  };

  // Check auth state on load
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        fetchAllData();
      } else {
        setLoading(false);
        setInquiries([]);
        setOrders([]);
      }
    });
    return unsubscribe;
  }, []);

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error('Login error:', error);
      setLoginError('Invalid email or password.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const renderShortId = (id) => {
    if (!id) return 'Inquiry';
    return id.substring(0, 8);
  };

  // If not logged in, show login screen
  if (!user) {
    return (
      <div className="admin-dashboard-container">
        <header className="admin-header">
          <div className="admin-title-row">
            <h1>Stone Store Vault</h1>
            <span>INTERNAL MANAGEMENT PORTAL • LIVE STATUS</span>
          </div>
        </header>
        <div className="login-container">
          <div className="login-card">
            <h2>Admin Login</h2>
            <form onSubmit={handleLogin} className="login-form">
              <div className="form-group">
                <label htmlFor="admin-email">Email</label>
                <div className="input-wrapper">
                  <Mail size={16} />
                  <input
                    id="admin-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your-admin-email@example.com"
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="admin-password">Password</label>
                <div className="input-wrapper">
                  <Lock size={16} />
                  <input
                    id="admin-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>
              {loginError && (
                <p className="login-error">{loginError}</p>
              )}
              <button
                type="submit"
                className="login-button"
                disabled={isLoggingIn}
              >
                {isLoggingIn ? 'Signing in...' : 'Sign In'}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  const dashboardHeader = (
    <header className="admin-header">
      <div className="admin-title-row">
        <h1>Stone Store Vault</h1>
        <span>INTERNAL MANAGEMENT PORTAL • LIVE STATUS</span>
      </div>
      <div className="header-actions">
        <button className="refresh-btn" onClick={fetchAllData} disabled={loading}>
          <RefreshCw size={16} className={loading ? 'spinning-icon' : ''} />
          {loading ? 'Syncing...' : 'Refresh Logs'}
        </button>
        <button className="logout-btn" onClick={handleLogout}>
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </header>
  );

  if (loading) {
    return (
      <div className="admin-dashboard-container">
        {dashboardHeader}
        <div className="dashboard-loading-state">
          <RefreshCw size={32} className="spinning-icon" style={{ color: '#d4af37', marginBottom: '15px' }} />
          <p>Authenticating stream and retrieving cloud inquiries...</p>
        </div>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="admin-dashboard-container">
        {dashboardHeader}
        <div className="dashboard-empty-state" style={{ border: '1px solid #ff4444', color: '#ff4444' }}>
          <p>⚠️ {errorMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard-container">
      {dashboardHeader}
      
      {/* Tab Navigation */}
      <div className="admin-tabs">
        <button
          className={`admin-tab ${activeTab === 'inquiries' ? 'active' : ''}`}
          onClick={() => setActiveTab('inquiries')}
        >
          <MessageSquare size={16} />
          Inquiries
        </button>
        <button
          className={`admin-tab ${activeTab === 'orders' ? 'active' : ''}`}
          onClick={() => setActiveTab('orders')}
        >
          <ShoppingBag size={16} />
          Orders
        </button>
        <button
          className={`admin-tab ${activeTab === 'add-products' ? 'active' : ''}`}
          onClick={() => setActiveTab('add-products')}
        >
          <MessageSquare size={16} />
          Add Products
        </button>

        <button
          className={`admin-tab ${activeTab === 'manage-products' ? 'active' : ''}`}
          onClick={() => {
            setActiveTab('manage-products');
            fetchProducts();
          }}
        >
          <ShoppingBag size={16} />
          Manage Products
        </button>

      </div>

      {/* Inquiries Tab Content */}

      {activeTab === 'inquiries' && (
        <div className="inquiries-grid-layout">
          {inquiriesError ? (
            <div className="dashboard-empty-state" style={{ border: '1px solid #ff4444', color: '#ff4444' }}>
              <p>⚠️ {inquiriesError}</p>
            </div>
          ) : inquiries.length === 0 ? (
            <div className="dashboard-empty-state">
              <MessageSquare size={40} style={{ color: '#333', marginBottom: '15px' }} />
              <p>No customer inquiries logged inside the database yet.</p>
            </div>
          ) : (
            inquiries.map((item) => {
              const shortId = renderShortId(item.id);
              
              return (
                <div key={item.id} className="luxury-inquiry-card">
                  <div>
                    <div className="card-meta-header">
                      <span>ID: {shortId}...</span>
                      <span className="card-meta-time">{item.timestamp}</span>
                    </div>

                    <h2 className="client-name-title">{item.fullName}</h2>
                    <a href={`mailto:${item.email}`} className="client-email-link">
                      {item.email}
                    </a>

                    <div className="inquiry-subject-badge">
                      🎯 {item.subject}
                    </div>

                    <p className="inquiry-message-body">
                      {item.message}
                    </p>

                    {item.attachment && (
                      <div className="attachment-badge">
                        <span>📎 {item.attachment}</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* Orders Tab Content */}
      {activeTab === 'orders' && (

        <div className="inquiries-grid-layout">

          {ordersError ? (
            <div className="dashboard-empty-state" style={{ border: '1px solid #ff4444', color: '#ff4444' }}>
              <p>⚠️ {ordersError}</p>
            </div>
          ) : orders.length === 0 ? (
            <div className="dashboard-empty-state">
              <ShoppingBag size={40} style={{ color: '#333', marginBottom: '15px' }} />
              <p>No orders received yet.</p>
            </div>
          ) : (
            orders.map((order) => {
              const shortId = renderShortId(order.id);
              
              return (
                <div key={order.id} className="luxury-inquiry-card">
                  <div>
                    <div className="card-meta-header">
                      <span>Order: {shortId}...</span>
                      <span className="card-meta-time">{order.timestamp}</span>
                    </div>

                    <h2 className="client-name-title">{order.customer.name || 'Unknown Customer'}</h2>
                    <a href={`mailto:${order.customer.email}`} className="client-email-link">
                      {order.customer.email || 'No email'}
                    </a>
                    
                    {order.customer.phone && (
                      <div className="client-phone-link">
                        <Phone size={14} style={{ marginRight: '6px' }} />
                        <a href={`tel:${order.customer.phone}`}>
                          {order.customer.phone}
                        </a>
                      </div>
                    )}

                    <div className="inquiry-subject-badge">
                      🛒 Total: ${order.total.toFixed(2)}
                    </div>

                    <div className="order-items-list">
                      <p style={{ fontWeight: 'bold', marginBottom: '8px', color: '#666' }}>Items:</p>
                      {order.items.map((item, index) => (
                        <div key={index} className="order-item-row">
                          <span>{item.name} x{item.quantity}</span>
                          <span>${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>

                    <div className="customer-details">
                      <p style={{ fontWeight: 'bold', marginBottom: '8px', color: '#666' }}>Shipping Address:</p>
                      <p>{order.customer.address}</p>
                      <p>{order.customer.city}, {order.customer.zipCode}</p>
                      <p>{order.customer.country}</p>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* Manage Products Tab Content */}
      {activeTab === 'manage-products' && (
        <ManageProductsPanel
          products={products}
          loading={productsLoading}
          errorMessage={productsError}
          onDeleted={async () => {
            await fetchProducts();
          }}
        />
      )}

      {/* Add Products Tab Content */}
      {activeTab === 'add-products' && (
        <AddProductsForm
          onAdded={async () => {
            setActiveTab('manage-products');
            await fetchProducts();
          }}
        />
      )}
    </div>
  );
}

function ManageProductsPanel({ products, loading, errorMessage, onDeleted }) {
  const [confirmingId, setConfirmingId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = products.filter((p) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      (p.name && p.name.toLowerCase().includes(query)) ||
      (p.material && p.material.toLowerCase().includes(query)) ||
      (p.finish && p.finish.toLowerCase().includes(query)) ||
      (p.colorName && p.colorName.toLowerCase().includes(query)) ||
      (p.origin && p.origin.toLowerCase().includes(query)) ||
      (p.tag && p.tag.toLowerCase().includes(query))
    );
  });

  const handleDelete = async (firestoreId) => {
    if (!firestoreId) return;

    try {
      // Confirm step (basic)
      const ok = window.confirm('Delete this product? This cannot be undone.');
      if (!ok) return;

      // Lazy-load to avoid extra imports at top level
      const { deleteDoc, doc } = await import('firebase/firestore');
      await deleteDoc(doc(db, 'products', firestoreId));

      setConfirmingId(null);
      await onDeleted?.();
    } catch (err) {
      console.error('Error deleting product:', err);
      alert('Failed to delete product.');
      setConfirmingId(null);
    }
  };

  return (
    <div style={{ maxWidth: 1340, margin: '0 auto', paddingBottom: 40 }}>
      <div style={{ marginBottom: 20 }}>
        <input
          className="tilecalc-input"
          type="text"
          placeholder="Search products by name, material, finish, color, origin, or tag..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ width: '100%', padding: '12px 16px', fontSize: '16px' }}
        />
      </div>
      <div className="inquiries-grid-layout manage-products-grid">
        {loading ? (
          <div className="dashboard-loading-state">Loading products...</div>
        ) : errorMessage ? (
          <div className="dashboard-empty-state" style={{ border: '1px solid #ff4444', color: '#ff4444' }}>
            <p>⚠️ {errorMessage}</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="dashboard-empty-state">
            <p>{searchQuery ? 'No products match your search.' : 'No products found.'}</p>
          </div>
        ) : (
          filteredProducts.map((p) => (
            <div key={p.firestoreId} className="luxury-inquiry-card" style={{ minHeight: 0, padding: 20 }}>
              <div>
                <div className="card-meta-header" style={{ marginBottom: 12 }}>
                  <span>ID: {p.id ?? '—'}</span>
                  <span className="card-meta-time">{p.tag || '—'}</span>
                </div>

                <div className="admin-card-image-wrapper" style={{ height: 140, marginBottom: 16 }}>
                  <img src={p.imageUrl || p.image || ''} alt={p.name || 'Product'} onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                </div>

                <h2 className="client-name-title" style={{ fontSize: 22 }}>
                  {p.name || 'Untitled'}
                </h2>
                <p style={{ color: '#71717a', margin: '6px 0 0 0' }}>{p.material} • {p.finish} • {p.colorName}</p>
                <p style={{ fontWeight: 700, marginTop: 10, color: '#ffffff' }}>
                  ${Number(p.price || 0).toFixed(2)} <span style={{ color: '#71717a', fontWeight: 400 }}>/ sqft</span>
                </p>

                <div style={{ display: 'flex', gap: 12, marginTop: 16, flexWrap: 'wrap' }}>
                  <button
                    className="login-button"
                    type="button"
                    style={{ maxWidth: 200 }}
                    onClick={() => {
                      setConfirmingId(p.firestoreId);
                      handleDelete(p.firestoreId);
                    }}
                    disabled={confirmingId === p.firestoreId}
                  >
                    {confirmingId === p.firestoreId ? 'Deleting...' : 'Delete'}
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}



function AddProductsForm({ onAdded }) {
  const [form, setForm] = useState({
    id: '',
    name: '',
    origin: '',
    material: '',
    finish: '',
    colorName: '',
    price: '',
    tag: 'NEW',
    imageUrl: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const update = (key, value) => setForm((p) => ({ ...p, [key]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    setSuccess('');

    try {
      const payload = {
        id: form.id === '' ? undefined : Number(form.id),
        name: form.name,
        origin: form.origin,
        material: form.material,
        finish: form.finish,
        colorName: form.colorName,
        price: Number(form.price),
        tag: form.tag,
        imageUrl: form.imageUrl
      };

      // Remove undefined keys
      Object.keys(payload).forEach((k) => payload[k] === undefined && delete payload[k]);

      await addDoc(collection(db, 'products'), {
        ...payload,
        timestamp: serverTimestamp()
      });

      setSuccess('Product added successfully.');
      onAdded?.();
    } catch (err) {
      console.error('Error adding product:', err);
      setError('Failed to add product. Check Firestore rules and field types.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: 720, margin: '0 auto' }}>
      <div className="dashboard-empty-state" style={{ textAlign: 'left', maxWidth: 720, marginTop: 0 }}>
        <h2 style={{ color: '#ffffff', marginBottom: 18 }}>Add Product</h2>
        <form onSubmit={handleSubmit} className="login-form add-product-form">
          <div className="form-group">
            <label>Numeric ID (matches /product/:id)</label>
            <input className="tilecalc-input" value={form.id} onChange={(e) => update('id', e.target.value)} type="number" min="0" step="1" placeholder="e.g. 1" required />
          </div>

          <div className="form-group">
            <label>Name</label>
            <input className="tilecalc-input" value={form.name} onChange={(e) => update('name', e.target.value)} type="text" placeholder="e.g. Carrara" required />
          </div>

          <div className="form-group">
            <label>Origin</label>
            <input className="tilecalc-input" value={form.origin} onChange={(e) => update('origin', e.target.value)} type="text" placeholder="e.g. Italy" required />
          </div>

          <div className="form-group">
            <label>Material</label>
            <input className="tilecalc-input" value={form.material} onChange={(e) => update('material', e.target.value)} type="text" placeholder="e.g. Marble" required />
          </div>

          <div className="form-group">
            <label>Finish</label>
            <input className="tilecalc-input" value={form.finish} onChange={(e) => update('finish', e.target.value)} type="text" placeholder="e.g. Polished" required />
          </div>

          <div className="form-group">
            <label>Color Name</label>
            <input className="tilecalc-input" value={form.colorName} onChange={(e) => update('colorName', e.target.value)} type="text" placeholder="e.g. Grey" required />
          </div>

          <div className="form-group">
            <label>Price</label>
            <input className="tilecalc-input" value={form.price} onChange={(e) => update('price', e.target.value)} type="number" min="0" step="0.01" placeholder="e.g. 120.5" required />
          </div>

          <div className="form-group">
            <label>Tag</label>
            <input className="tilecalc-input" value={form.tag} onChange={(e) => update('tag', e.target.value)} type="text" placeholder="e.g. NEW" />
          </div>

          <div className="form-group full-span">
            <label>Image URL (paste a direct public image link)</label>
            <input className="tilecalc-input" value={form.imageUrl} onChange={(e) => update('imageUrl', e.target.value)} type="url" placeholder="https://.../image.png" required />
          </div>

          {form.imageUrl ? (
            <div className="admin-card-image-wrapper full-span" style={{ height: 160 }}>
              <img src={form.imageUrl} alt="preview" onError={() => {}} />
            </div>
          ) : null}

          {error ? <p className="login-error">{error}</p> : null}
          {success ? <p className="login-error" style={{ borderColor: 'rgba(201,168,76,0.35)', color: '#c9a84c', background: 'rgba(201,168,76,0.08)' }}>{success}</p> : null}

          <button className="login-button full-span" type="submit" disabled={submitting}>
            {submitting ? 'Adding...' : 'Add to Firestore'}
          </button>
        </form>
      </div>
    </div>
  );
}

