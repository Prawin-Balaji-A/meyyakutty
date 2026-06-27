import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import PetDetailsPage from './pages/PetDetailsPage';
import SellCarePage from './pages/SellCarePage';
import AdminDashboard from './pages/AdminDashboard';
import CheckoutPage from './pages/CheckoutPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import MyOrdersPage from './pages/MyOrdersPage';
import OrderDetailsPage from './pages/OrderDetailsPage';
import InvoicePage from './pages/InvoicePage';
import AboutPage from './pages/AboutPage';
import CartPage from './pages/CartPage';
import { Phone, MessageCircle, Camera } from 'lucide-react';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="shop" element={<ShopPage />} />
        <Route path="pet/:id" element={<PetDetailsPage />} />
        <Route path="sell-care" element={<SellCarePage />} />
        <Route path="admin" element={<AdminDashboard />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="success" element={<OrderSuccessPage />} />
        <Route path="orders" element={<MyOrdersPage />} />
        <Route path="orders/:id" element={<OrderDetailsPage />} />
        
        {/* About page */}
        <Route path="about" element={<AboutPage />} />
      </Route>
      
      {/* Print-only routes outside of Layout */}
      <Route path="/invoice/:id" element={<InvoicePage />} />
    </Routes>
  );
}

export default App;
