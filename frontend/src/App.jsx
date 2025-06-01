import { Toaster } from 'react-hot-toast';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import CartPage from '../components/cartPage';
import CatalogPage from '../components/catalog';
import CheckoutPage from '../components/checkoutPage';
import Contact from '../components/contact';
import Footer from '../components/footer';
import Header from '../components/header';
import HomePage from '../components/home';
import OrderSuccessPage from '../components/orderSuccess';
import './App.css';

function App() {
  return (
    <Router>
      <Toaster position="top-center" />
      <div className="flex flex-col min-h-screen">
        <Header />
        
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<CatalogPage />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/order-success" element={<OrderSuccessPage />} />

          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
