import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './ProductDetail.css';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { ShoppingBag, ArrowLeft, Check, Gem, Truck, Clock, Shield } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function ProductDetail() {
  const { addToCart } = useCart();
  const { id } = useParams();
  const productId = Number(id);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        // Documents may be stored with numeric `id` field.
        // Since we are using `/product/:id`, we query by field `id` by scanning is not feasible here;
        // so we try both: direct doc id and fallback to field id scan.

        // 1) Try direct doc id match
        const directRef = doc(db, 'products', id);
        const directSnap = await getDoc(directRef);
        if (directSnap.exists()) {
          const data = directSnap.data();
          setProduct({ id: data.id ?? productId, ...data });
          return;
        }

        // 2) Fallback: if doc id is not numeric, we can’t query by field without an index.
        // For robustness, we still attempt a secondary approach by fetching all products
        // and matching `product.id`.
        const allSnap = await import('firebase/firestore').then(({ collection, getDocs }) =>
          getDocs(collection(db, 'products'))
        );
        const list = allSnap.docs
          .map((d) => ({ id: d.data().id ?? Number(d.id), ...d.data() }))
          .filter((p) => Number(p.id) === productId);

        setProduct(list[0] ?? null);
      } catch (e) {
        console.error('Error fetching product detail:', e);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (loading) {
    return (
      <div className="product-detail-container">
        <div className="not-found">Loading product...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-detail-container">
        <div className="not-found">
          <h2>Product Not Found</h2>
          <Link to="/products" className="back-link">
            <ArrowLeft size={20} />
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="product-detail-container">
      <div className="product-detail-wrapper">
        <Link to="/products" className="back-link">
          <ArrowLeft size={20} />
          Back to Collection
        </Link>

        <div className="product-detail-grid">
          <div className="product-image-section">
            <div className="main-image-wrapper">
              <img
                src={product.imageUrl || product.image}
                alt={product.name}
                className="main-product-image"
              />
            </div>
          </div>

          <div className="product-info-section">
            <div className="product-meta">
              <span className="product-tag">{product.tag}</span>
              <h1 className="product-name">{product.name}</h1>
              <p className="product-origin">{product.origin}</p>
            </div>

            <div className="product-price-section">
              <span className="product-price">${Number(product.price).toFixed(2)}</span>
              <span className="price-unit">/ sqft</span>
            </div>

            <div className="product-specs">
              <div className="spec-item">
                <Gem size={20} />
                <div>
                  <span className="spec-label">Material</span>
                  <span className="spec-value">{product.material}</span>
                </div>
              </div>
              <div className="spec-item">
                <Check size={20} />
                <div>
                  <span className="spec-label">Finish</span>
                  <span className="spec-value">{product.finish}</span>
                </div>
              </div>
              <div className="spec-item">
                <Shield size={20} />
                <div>
                  <span className="spec-label">Color</span>
                  <span className="spec-value">{product.colorName}</span>
                </div>
              </div>
            </div>

            <div className="product-actions">
              <button className="add-to-cart-button" onClick={() => addToCart(product)}>
                <ShoppingBag size={20} />
                Add to Cart
              </button>
              <button className="sample-button">Order Sample</button>
            </div>

            <div className="product-benefits">
              <div className="benefit-item">
                <Truck size={18} />
                <span>Fast Shipping</span>
              </div>
              <div className="benefit-item">
                <Clock size={18} />
                <span>24/7 Support</span>
              </div>
              <div className="benefit-item">
                <Shield size={18} />
                <span>Premium Quality</span>
              </div>
            </div>

            <div className="product-description">
              <h3>About This Stone</h3>
              <p>
                Elevate your space with {product.name}, a stunning {product.material?.toLowerCase()} quarried in{' '}
                {product.origin}.
                Its {product.finish?.toLowerCase()} finish and beautiful {product.colorName?.toLowerCase()} tones make it
                perfect for countertops, flooring, wall cladding, and more.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

