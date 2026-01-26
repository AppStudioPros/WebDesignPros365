import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';

const navigation = [
  { name: 'Home', href: '/' },
  {
    name: 'Services',
    href: '/services',
    submenu: [
      { name: 'GEO - Generative Engine Optimization', href: '/services#geo' },
      { name: 'AI Integration & Chatbots', href: '/services#ai' },
      { name: 'Next.js Development', href: '/services#development' },
      { name: 'SEO & Performance', href: '/services#seo' },
      { name: 'View All Services', href: '/services' },
    ],
  },
  { name: 'Portfolio', href: '/portfolio' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'Blog', href: '/blog' },
  { name: 'About', href: '/about' },
  { name: 'FAQ', href: '/faq' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-[#0f1419]/80 backdrop-blur-xl border-b border-white/10 py-3'
          : 'bg-transparent py-5'
      )}
    >
      <div className="container-custom">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="relative z-10">
            <motion.div
              className="flex items-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#00d9ff] to-[#0066cc] flex items-center justify-center">
                <span className="text-white font-bold text-lg">W</span>
              </div>
              <div className="hidden sm:block">
                <span className="font-bold text-lg text-white">
                  Web Design Pros
                </span>
                <span className="font-bold text-lg gradient-text"> 365</span>
              </div>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navigation.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => item.submenu && setActiveSubmenu(item.name)}
                onMouseLeave={() => setActiveSubmenu(null)}
              >
                <Link
                  to={item.href}
                  className={cn(
                    'px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200',
                    'text-white/80 hover:text-white hover:bg-white/10',
                    'flex items-center gap-1',
                    location.pathname === item.href && 'text-white bg-white/10'
                  )}
                >
                  {item.name}
                  {item.submenu && <ChevronDown className="w-4 h-4" />}
                </Link>

                {/* Submenu */}
                <AnimatePresence>
                  {item.submenu && activeSubmenu === item.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 w-72 py-2 glass rounded-xl shadow-xl"
                    >
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.name}
                          to={subItem.href}
                          className="block px-4 py-2.5 text-sm text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Link to="/contact">
              <motion.button
                className="btn-accent text-sm"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Start Your Project
              </motion.button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-[#0f1419]/95 backdrop-blur-xl border-b border-white/10"
          >
            <div className="container-custom py-6 space-y-2">
              {navigation.map((item) => (
                <div key={item.name}>
                  <Link
                    to={item.href}
                    className="block px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                  >
                    {item.name}
                  </Link>
                </div>
              ))}
              <div className="pt-4">
                <Link to="/contact">
                  <button className="btn-accent w-full">Start Your Project</button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
