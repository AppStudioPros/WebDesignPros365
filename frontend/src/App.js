import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import PortfolioPage from './pages/PortfolioPage';
import BlogPage from './pages/BlogPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import PricingPage from './pages/PricingPage';
import FAQPage from './pages/FAQPage';
import './App.css';

// ScrollToTop component to reset scroll position on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// Layout component with light background
function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}

function AppRoutes() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/faq" element={<FAQPage />} />
      </Routes>
    </Layout>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppRoutes />
    </Router>
  );
}

export default App;
