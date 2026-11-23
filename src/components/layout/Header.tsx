"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShieldCheck, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const BBB_PROFILE_URL =
  'https://www.bbb.org/us/co/denver/profile/web-design/web-design-pros-365-1296-1000176091';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'Platform Engineering', href: '/platform-engineering' },
  { name: 'ACI Business Ops', href: '/business-applications' },
  { name: 'Pricing', href: '/pricing' },
];

const aboutNavigation = [
  { name: 'About Us', href: '/about' },
  { name: 'Portfolio', href: '/portfolio' },
];

const navCTA = {
  name: 'Real Estate & Finance',
  href: '/verticals/real-estate-financial',
};

function AboutNavigation({
  pathname,
  mobile = false,
  onNavigate,
}: {
  pathname: string;
  mobile?: boolean;
  onNavigate?: () => void;
}) {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const isActive = aboutNavigation.some((item) => pathname === item.href);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (detailsRef.current && !detailsRef.current.contains(event.target as Node)) {
        detailsRef.current.open = false;
      }
    };
    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, []);

  useEffect(() => {
    if (detailsRef.current) detailsRef.current.open = false;
  }, [pathname]);

  return (
    <details
      ref={detailsRef}
      className="group relative"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          event.currentTarget.open = false;
        }
      }}
      onKeyDown={(event) => {
        if (event.key === 'Escape' && event.currentTarget.open) {
          event.stopPropagation();
          event.currentTarget.open = false;
          event.currentTarget.querySelector('summary')?.focus();
        }
      }}
    >
      <summary
        className={cn(
          'flex cursor-pointer list-none items-center gap-1.5 rounded-lg text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b68aff] [&::-webkit-details-marker]:hidden',
          mobile ? 'justify-between px-4 py-3 text-[#c4c0e0] hover:bg-[#8734E1]/5' : 'px-3 py-2 text-[#a8a4c8] hover:text-[#f0eef8]',
          isActive && 'text-[#f0eef8] font-semibold'
        )}
      >
        About
        <ChevronDown aria-hidden="true" className="h-3.5 w-3.5 transition-transform group-open:rotate-180" />
      </summary>
      <div
        className={cn(
          mobile
            ? 'ml-6 mb-2 flex flex-col border-l border-[#51435f] pl-2'
            : 'absolute right-0 top-full mt-2 flex min-w-44 flex-col rounded-xl border border-[#51435f] bg-[#252640] p-2 shadow-xl'
        )}
      >
        {aboutNavigation.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            aria-current={pathname === item.href ? 'page' : undefined}
            className={cn(
              'rounded-lg px-4 py-3 text-sm text-[#c4c0e0] transition-colors hover:bg-[#8734E1]/15 hover:text-white focus-visible:outline-2 focus-visible:outline-[#b68aff]',
              pathname === item.href && 'bg-[#8734E1]/15 text-white font-semibold'
            )}
            onClick={() => {
              if (detailsRef.current) detailsRef.current.open = false;
              onNavigate?.();
            }}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </details>
  );
}

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hidden pages — no global nav
  if (pathname === '/benefits') return null;

  return (
    <header
      onKeyDown={(event) => {
        if (event.key === 'Escape' && isMobileMenuOpen) {
          setIsMobileMenuOpen(false);
          mobileMenuButtonRef.current?.focus();
        }
      }}
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
              setIsMobileMenuOpen(false);
              if (pathname === '/') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
          >
            <Image
              src="/logo-wdp365.png"
              alt="Web Design Pros 365"
              width={197}
              height={72}
              className="h-[72px] w-auto"
              
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav aria-label="Primary navigation" className="hidden xl:flex items-center whitespace-nowrap">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                aria-current={pathname === item.href ? 'page' : undefined}
                className={cn(
                  'px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b68aff]',
                  'text-[#a8a4c8] hover:text-[#f0eef8]',
                  pathname === item.href
                    ? 'text-[#f0eef8] font-semibold'
                    : ''
                )}
              >
                {item.name}
              </Link>
            ))}
            <AboutNavigation pathname={pathname} />
          </nav>

          {/* CTA cluster: BBB badge + RE&Finance + Start Your Project */}
          <div className="hidden xl:flex items-center gap-2.5 whitespace-nowrap">
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


          </div>

          {/* Mobile Menu Button */}
          <button
            ref={mobileMenuButtonRef}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="xl:hidden p-2 text-[#8734E1] hover:bg-[#8734E1]/10 rounded-lg transition-colors"
            aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-navigation"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="xl:hidden max-h-[calc(100dvh-112px)] overflow-y-auto border-t border-[#8734E1]/10 bg-[#252640]"
          >
            <div className="container-custom py-4">
              <nav aria-label="Mobile navigation" className="flex flex-col gap-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    aria-current={pathname === item.href ? 'page' : undefined}
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
                <AboutNavigation
                  pathname={pathname}
                  mobile
                  onNavigate={() => setIsMobileMenuOpen(false)}
                />
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
