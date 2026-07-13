import React, { useState, useMemo, useEffect } from 'react';
import './SearchResult.css'; // Reuses your existing product layout rules
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useSearchParams } from 'react-router-dom';

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  const [filters, setFilters] = useState({ materials: [], finishes: [], colors: [], maxPrice: 50000 });
  const [viewMode] = useState('grid');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const materialOptions = ['Marble', 'Limestone', 'Travertine', 'Granite'];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const snap = await getDocs(collection(db, 'products'));
        const list = snap.docs.map((d) => {
          const data = d.data() || {};
          return {
            id: data.id ?? Number(d.id),
            ...data,
          };
        });
        console.log('Fetched products:', list);
        setProducts(list);
      } catch (e) {
        console.error('Error fetching products for search:', e);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);


  // Checkbox state handler
  const handleCheckboxChange = (category, value) => {
    setFilters(prev => {
      const currentList = prev[category];
      const updatedList = currentList.includes(value)
        ? currentList.filter(item => item !== value)
        : [...currentList, value];
      return { ...prev, [category]: updatedList };
    });
  };

  // The Search & Filter Processor
  const searchFilteredProducts = useMemo(() => {
    console.log('Search query:', searchQuery);
    console.log('Total products before filter:', products.length);
    
    const filtered = products.filter((product) => {

      // 1. Text verification loop matches the input text typed in your nav bar
      // Matches the same fields as admin panel: name, material, finish, colorName, origin, tag
      const query = (searchQuery || '').toLowerCase();
      const matchesText =
        (product.name && product.name.toLowerCase().includes(query)) ||
        (product.material && product.material.toLowerCase().includes(query)) ||
        (product.finish && product.finish.toLowerCase().includes(query)) ||
        (product.colorName && product.colorName.toLowerCase().includes(query)) ||
        (product.origin && product.origin.toLowerCase().includes(query)) ||
        (product.tag && product.tag.toLowerCase().includes(query));
      
      if (!matchesText) return false;

      // 2. Sidebar checkboxes checks run simultaneously
      const productMaterial = product.material || product.finish || '';
      if (filters.materials.length > 0 && !filters.materials.includes(productMaterial)) return false;

      const price = Number(product.price);
      if (!Number.isNaN(price) && price > filters.maxPrice) return false;

      return true;
    });
    
    console.log('Filtered products count:', filtered.length);
    return filtered;
  }, [filters, searchQuery, products]);

  return (
    <div className="catalog-page-wrapper">
      
      {/* 1. THE VIEW TITLE (Direct match to WhatsApp Image 2026-06-27 at 4.16.12 PM_2.jpeg) */}
      <header className="search-results-header">
        <div className="header-text-block">
          <h1>
            Search Results for <span>"{searchQuery || 'All Products'}"</span>
          </h1>
          <p>
            Showing {searchFilteredProducts.length} results matching your criteria.
          </p>
        </div>
      </header>

      {/* 2. SPLIT LAYOUT (Keeps the clean layout design rules of your main catalog) */}
      <div className="catalog-layout-split">
        
        {/* Left Side: Filter Sidebar Panel */}
        <aside className="filter-sidebar">
          <div className="filter-section">
            <h3>Material</h3>
            {materialOptions.map(mat => (
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
        </aside>

        {/* Right Side: Product Card Grid Stream */}
        <main className="catalog-feed-main">
          <div className={`product-flex-row-wrap ${viewMode}-view`}>
            {searchFilteredProducts.map(product => (
              <div key={product.id} className="catalog-product-card">
                <div className="card-media-wrapper">
                  <span className="media-badge">
                    {product.tag}
                  </span>
                  <img src={product.imageUrl || product.image} alt={product.name} />
                </div>
                <div className="card-details">
                  <p>{product.material.toUpperCase()}</p>
                  <h4>{product.name}</h4>
                  <p>${product.price.toFixed(2)} <span>/ sqft</span></p>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State message when nothing matches */}
          {searchFilteredProducts.length === 0 && (
            <div className="empty-state">
              <p>No material items match your active search terms.</p>
            </div>
          )}
        </main>

      </div>
    </div>
  );
}