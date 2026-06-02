"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, Check, X } from 'lucide-react';

const STORAGE_KEY = 'wdp365.cookie_consent';
type Consent = 'accepted' | 'rejected' | null;

/**
 * Cookie consent banner — both 'Accept All' and 'Reject All' get EQUAL prominence.
 * No dark patterns. Reject is right there, same size, same color weight, one click.
 *
 * Storage: writes 'accepted' | 'rejected' to localStorage so it doesn't re-prompt.
 * Analytics: gate any GA4 / Vercel Analytics calls on `getConsent() === 'accepted'`.
 */
export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored = window.localStorage.getItem(STORAGE_KEY) as Consent;
    if (!stored) {
      // Delay slightly so it doesn't fight the hero animation on first paint
      const t = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(t);
    }
  }, []);

  const handleConsent = (choice: 'accepted' | 'rejected') => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(STORAGE_KEY, choice);
    // Fire a custom event so analytics modules can react
    window.dispatchEvent(new CustomEvent('cookie-consent', { detail: { choice } }));
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 md:max-w-md z-50"
          role="dialog"
          aria-live="polite"
          aria-label="Cookie consent"
        >
          <div className="bg-white border border-gray-200 rounded-2xl shadow-2xl p-5">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#f0e6fb] flex items-center justify-center flex-shrink-0">
                <Cookie className="w-5 h-5 text-[#8734E1]" strokeWidth={2} />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-gray-900 mb-1">We use cookies</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Essential cookies keep the site working. Analytics cookies help us understand
                  what content is useful. You choose.{' '}
                  <Link href="/privacy" className="text-[#8734E1] hover:underline">
                    Privacy policy
                  </Link>
                  .
                </p>
              </div>
            </div>
            {/* Two buttons, equal visual weight, side by side */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleConsent('rejected')}
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-900 text-sm font-medium transition-colors"
              >
                <X className="w-4 h-4" strokeWidth={2.25} />
                Reject All
              </button>
              <button
                onClick={() => handleConsent('accepted')}
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-gradient-to-r from-[#8734E1] to-[#BF5DE0] hover:opacity-90 text-white text-sm font-medium transition-opacity"
              >
                <Check className="w-4 h-4" strokeWidth={2.25} />
                Accept All
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * Helper for analytics: returns whether the user has consented to non-essential cookies.
 * Use this to gate GA4, Vercel Analytics, ad pixels, etc.
 */
export function hasCookieConsent(): boolean {
  if (typeof window === 'undefined') return false;
  return window.localStorage.getItem(STORAGE_KEY) === 'accepted';
}
