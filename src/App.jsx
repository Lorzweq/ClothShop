import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header';
import Footer from './components/footer';
import HeaderCommercial from './components/headercommercial';
import MainContent from './components/maintop';
import Product from './components/product';
import ProductPage from './pages/ProductPage'; 
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Cart from './pages/Cart';
import Admin from './pages/Admin';
import Login from './pages/Login';
import UnderDevelopment from './pages/UnderDevelopment';
import SearchResults from './pages/SearchResults'; // Add this import

const stripePromise = loadStripe('your-publishable-key-here');

function App() {
  return (
    <Elements stripe={stripePromise}>
      <Router>
        <div className="flex flex-col min-h-screen">
          <HeaderCommercial />
          <Header />
          <main className="flex-grow mb-12">
            <Routes>
              {/* Home Page */}
              <Route path="/" element={<>
                <MainContent />
                <Product />
              </>} />

              {/* Product Detail Page */}
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/login" element={<Login />} />
              {/* Placeholder for pages under development */}
              <Route path="/men" element={<UnderDevelopment />} />
              <Route path="/women" element={<UnderDevelopment />} />
              <Route path="/kids" element={<UnderDevelopment />} />
              <Route path="/nordic-style" element={<UnderDevelopment />} />
              <Route path="/new" element={<UnderDevelopment />} />
              <Route path="/clothing" element={<UnderDevelopment />} />
              <Route path="/shoes" element={<UnderDevelopment />} />
              <Route path="/accessories" element={<UnderDevelopment />} />
              <Route path="/streetwear" element={<UnderDevelopment />} />
              <Route path="/sports" element={<UnderDevelopment />} />
              <Route path="/designer" element={<UnderDevelopment />} />
              <Route path="/pre-owned" element={<UnderDevelopment />} />
              <Route path="/outlet" element={<UnderDevelopment />} />
              <Route path="/search" element={<SearchResults />} /> {/* Add this route */}
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </Elements>
  );
}

export default App;