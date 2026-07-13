import React, { useEffect, useMemo, useState } from 'react';
import { ChevronDown, ShoppingBag } from 'lucide-react';
import './Products.css';
import Header from "../components/Header.jsx";
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Link, useSearchParams } from 'react-router-dom';

export default function Products() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') || '';

  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  // Shared Application States
  const [filters, setFilters] = useState({ materials: [], finishes: [], colors: [], maxPrice: 50000 });
  const [sortBy, setSortBy] = useState('featured');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const materialOptions = ['Marble', 'Limestone', 'Travertine', 'Granite', 'Quartzite'];
  const finishOptions = ['Polished', 'Honed', 'Brushed', 'Tumbled', 'Leathered'];
  const colorOptions = [
    { name: 'Cream', hex: '#fdf6e2' },
    { name: 'Grey', hex: '#9ca3af' },
    { name: 'Black', hex: '#111827' },
    { name: 'Green', hex: '#15803d' }
  ];

  const handleCheckboxChange = (category, value) => {
    setFilters((prev) => {
      const currentList = prev[category];
      const updatedList = currentList.includes(value)
        ? currentList.filter((item) => item !== value)
        : [...currentList, value];
      return { ...prev, [category]: updatedList };
    });
    setCurrentPage(1);
  };

  const handleClearAll = () => {
    setFilters({ materials: [], finishes: [], colors: [], maxPrice: 150 });
    setCurrentPage(1);
  };

  // Jump back to page 1 whenever the header search query changes, so a new
  // search never leaves the user stranded on an out-of-range page.
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // Fetch products once from Firestore
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoadingProducts(true);
        const snap = await getDocs(collection(db, 'products'));
        const list = snap.docs.map((d) => {
          const data = d.data();
          return {
            id: data.id ?? Number(d.id),
            ...data,
          };
        });
        console.log('Products page - Fetched products:', list);
        setProducts(list);
      } catch (e) {
        console.error('Error fetching products:', e);
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    console.log('Products page - Filtering products, current filters:', filters);
    console.log('Products page - Products before filter:', products);
    
    const query = searchQuery.trim().toLowerCase();

    const filtered = products.filter((product) => {
      if (filters.materials.length > 0 && !filters.materials.includes(product.material)) return false;
      if (filters.finishes.length > 0 && !filters.finishes.includes(product.finish)) return false;
      if (filters.colors.length > 0 && !filters.colors.includes(product.colorName)) return false;
      if (Number(product.price) > filters.maxPrice) return false;

      if (query) {
        const haystack = [product.name, product.material, product.finish, product.colorName, product.origin, product.tag]
          .filter(Boolean)
          .join(' ')
          .toLowerCase();
        if (!haystack.includes(query)) return false;
      }

      return true;
    });
    
    console.log('Products page - Products after filter:', filtered);
    return filtered;
  }, [products, filters, searchQuery]);

  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    if (sortBy === 'lowToHigh') return list.sort((a, b) => Number(a.price) - Number(b.price));
    if (sortBy === 'highToLow') return list.sort((a, b) => Number(b.price) - Number(a.price));
    return list;
  }, [filteredProducts, sortBy]);

  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage) || 1;

  const displayedProducts = useMemo(() => {
    const offset = (currentPage - 1) * itemsPerPage;
    return sortedProducts.slice(offset, offset + itemsPerPage);
  }, [sortedProducts, currentPage]);

  return (
    <div className="product-page">
      <div className="store-layout-container">
        <div className="catalog-layout-split">
          <aside className="filter-sidebar">
            <div className="filter-header-row">
              <h3>Filters</h3>
              <button onClick={handleClearAll} className="clear-btn">Clear All</button>
            </div>
            <p className="results-subtext">Showing {filteredProducts.length} architectural choices</p>

            <div className="filter-group">
              <div className="group-trigger"><span>Material</span><ChevronDown size={14} /></div>
              <div className="group-content">
                {materialOptions.map((mat) => (
                  <label key={mat} className="checkbox-row">
                    <input
                      type="checkbox"
                      checked={filters.materials.includes(mat)}
                      onChange={() => handleCheckboxChange('materials', mat)}
                    />
                    <span>{mat}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="filter-group">
              <div className="group-trigger"><span>Finish</span><ChevronDown size={14} /></div>
              <div className="group-content">
                {finishOptions.map((fin) => (
                  <label key={fin} className="checkbox-row">
                    <input
                      type="checkbox"
                      checked={filters.finishes.includes(fin)}
                      onChange={() => handleCheckboxChange('finishes', fin)}
                    />
                    <span>{fin}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="filter-group">
              <div className="group-trigger"><span>Color Palette</span><ChevronDown size={14} /></div>
              <div className="color-swatch-row">
                {colorOptions.map((col) => (
                  <button
                    key={col.name}
                    className={`swatch-circle ${filters.colors.includes(col.name) ? 'selected-swatch' : ''}`}
                    style={{ backgroundColor: col.hex }}
                    onClick={() => handleCheckboxChange('colors', col.name)}
                    aria-label={col.name}
                  />
                ))}
              </div>
            </div>

            <div className="filter-group">
              <div className="group-trigger"><span>Price Target</span><ChevronDown size={14} /></div>
              <div className="slider-wrapper">
                <input
                  type="range"
                  min="20"
                  max="50000"
                  value={filters.maxPrice}
                  onChange={(e) => setFilters({ ...filters, maxPrice: Number(e.target.value) })}
                />
                <div className="slider-labels"><span>$20</span><span>Max: ${filters.maxPrice}</span></div>
              </div>
            </div>
          </aside>

          <main className="catalog-feed-main">
            <div className="feed-control-header">
              <div className="sorting-dropdown-box">
                <label>Sort By:</label>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                  <option value="featured">Featured Collection</option>
                  <option value="lowToHigh">Price: Low to High</option>
                  <option value="highToLow">Price: High to Low</option>
                </select>
              </div>
            </div>

            {loadingProducts ? (
              <div className="product-flex-row-wrap">
                {Array.from({ length: itemsPerPage }).map((_, idx) => (
                  <div key={idx} className="skeleton-card">
                    <div className="skeleton-media" />
                    <div className="skeleton-lines">
                      <div className="skeleton-line w-60" />
                      <div className="skeleton-line w-40" />
                    </div>
                  </div>
                ))}
              </div>
            ) : displayedProducts.length === 0 ? (
              <div className="product-flex-row-wrap">
                <div className="empty-catalog-state">
                  <h4>No stones match these filters</h4>
                  <p>Try widening your price range or clearing a filter to see the full collection.</p>
                  <button onClick={handleClearAll}>Clear All Filters</button>
                </div>
              </div>
            ) : (
              <div className="product-flex-row-wrap">
                {displayedProducts.map((product, idx) => (
                  <Link
                    key={product.id}
                    to={`/product/${product.id}`}
                    className="catalog-product-card"
                    style={{ animationDelay: `${Math.min(idx, 8) * 0.06}s` }}
                  >
                    <div className="card-media-wrapper">
                      <span className={`media-badge ${product.tag === 'NEW' ? 'blue-badge' : 'white-badge'}`}>
                        {product.tag}
                      </span>
                      <img src={product.imageUrl || product.image} alt={product.name} loading="lazy" />
                    </div>
                    <div className="card-details">
                      <h4>{product.name}</h4>
                      <p className="details-origin">{product.origin}</p>
                      <p className="details-pricing">${Number(product.price).toFixed(2)} <span>/ sqft</span></p>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {!loadingProducts && totalPages > 1 && (
              <div className="pagination-footer-strip">
                <button disabled={currentPage === 1} onClick={() => setCurrentPage((p) => p - 1)} className="p-nav-btn">
                  Prev
                </button>
                {Array.from({ length: totalPages }, (_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentPage(idx + 1)}
                    className={`p-num-btn ${currentPage === idx + 1 ? 'p-active' : ''}`}
                  >
                    {idx + 1}
                  </button>
                ))}
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => p + 1)}
                  className="p-nav-btn"
                >
                  Next
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

