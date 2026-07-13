import { Routes, Route } from 'react-router-dom'
import './App.css'
import HomePage from "./pages/HomePage"
import Products from './pages/Products'
import SearchResults from './pages/SearchResult.jsx' 
import Header from "./components/Header.jsx"
import Footer from "./components/Footer.jsx"
import About from "./pages/About.jsx"
import Contact from "./pages/Contact.jsx"
import AdminDashboard from "./pages/AdminDashboard.jsx" 
import ProductDetail from "./pages/ProductDetail.jsx";
import CartSidebar from "./components/CartSidebar.jsx";
import CheckoutModal from "./components/CheckoutModal.jsx";
import TileCalculator from "./pages/TileCalculator.jsx";

function App() {
  // 💡 This uses raw JavaScript to check the browser URL.
  // It checks if the current link ends with "/admin"
  const isMinimalAdminView = window.location.pathname === '/admin';

  return (
    <div className="app-container">
      
      {/* If we are NOT on the admin page, show the normal store Header */}
      {!isMinimalAdminView && (
        <Header />
      )}     
      
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/products' element={<Products/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path='/search' element={<SearchResults />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/calculator" element={<TileCalculator />} />
        
        {/* Added your gold and black dashboard path right here */}
        <Route path="/admin" element={<AdminDashboard/>}/>
      </Routes>     
      
      {/* If we are NOT on the admin page, show the normal store Footer */}
      {!isMinimalAdminView && (
        <Footer />
      )}
      <CartSidebar />
      <CheckoutModal />
    </div>
  );
}

export default App;