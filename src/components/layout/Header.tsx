"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

const BBB_PROFILE_URL =
  'https://www.bbb.org/us/co/denver/profile/web-design/web-design-pros-365-1296-1000176091';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'Platform Engineering', href: '/platform-engineering' },
  { name: 'Portfolio', href: '/portfolio' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'About', href: '/about' },
];

const navCTA = {
  name: 'Real Estate & Finance',
  href: '/verticals/real-estate-financial',
};

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-[#1a1830] border-b border-[#2e2c4a]',
        isScrolled ? 'py-3 shadow-lg' : 'py-5'
      )}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="relative z-10 flex-shrink-0"
            onClick={(e) => {
              if (pathname === '/') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
          >
            <Image
              src="/logo-opt.png"
              alt="Web Design Pros 365"
              width={200}
              height={50}
              className="h-[50px] w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200',
                  'text-[#a8a4c8] hover:text-[#8734E1] hover:bg-[#8734E1]/8',
                  pathname === item.href
                    ? 'text-[#8734E1] font-semibold'
                    : ''
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* CTA cluster: BBB badge + RE&Finance + Start Your Project */}
          <div className="hidden lg:flex items-center gap-2.5">
            {/* BBB Badge */}
            <a
              href={BBB_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="BBB Accredited Business"
              className="group inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#252640] border border-[#0c5ba2]/30 hover:border-[#0c5ba2] hover:shadow-md transition-all"
              title="BBB Accredited · A Rating"
            >
              <ShieldCheck className="w-4 h-4 text-[#0c5ba2]" />
              <div className="flex items-baseline gap-1 leading-none">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#0c5ba2]">BBB</span>
                <span className="text-[10px] font-semibold text-[#8a87a8] group-hover:text-[#0c5ba2] transition-colors">A · Accredited</span>
              </div>
            </a>

            {/* Real Estate & Finance — outline pill */}
            <Link href={navCTA.href}>
              <motion.button
                className={cn(
                  'px-4 py-2 text-sm font-semibold rounded-xl border transition-all',
                  pathname === navCTA.href
                    ? 'bg-[#8734E1] text-white border-[#8734E1]'
                    : 'bg-transparent text-[#8734E1] border-[#8734E1] hover:bg-[#8734E1] hover:text-white'
                )}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {navCTA.name}
              </motion.button>
            </Link>

            {/* Start Your Project — filled */}
            <Link href="/contact">
              <motion.button
                className="px-5 py-2 bg-[#8734E1] text-white text-sm font-semibold rounded-xl hover:bg-[#7020c8] transition-all shadow-md"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Start Your Project
              </motion.button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-[#8734E1] hover:bg-[#8734E1]/10 rounded-lg transition-colors"
            aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-[#8734E1]/10 bg-[#252640]"
          >
            <div className="container-custom py-4">
              <nav className="flex flex-col gap-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      'px-4 py-3 text-sm font-medium rounded-lg transition-colors',
                      'text-[#c4c0e0] hover:text-[#8734E1] hover:bg-[#8734E1]/5',
                      pathname === item.href && 'text-[#8734E1] font-semibold bg-[#8734E1]/5'
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
                <Link
                  href={navCTA.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    'px-4 py-3 text-sm font-semibold rounded-lg border text-center transition-colors',
                    'text-[#8734E1] border-[#8734E1] hover:bg-[#8734E1] hover:text-white',
                    pathname === navCTA.href && 'bg-[#8734E1] text-white'
                  )}
                >
                  {navCTA.name}
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="mt-2 px-4 py-3 bg-[#8734E1] text-white font-semibold rounded-xl text-center hover:bg-[#7020c8] transition-colors"
                >
                  Start Your Project
                </Link>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
