import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, Linkedin, Instagram, Facebook } from 'lucide-react';

const footerLinks = {
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Contact', href: '/contact' },
  ],
  resources: [
    { name: 'Blog', href: '/blog' },
    { name: 'Media', href: '/media' },
    { name: 'Partner Program', href: '/partnerprogram' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Partnerships', href: '/partnerships' },
  ],
};

const socialLinks = [
  { name: 'LinkedIn', href: 'https://linkedin.com/company/webdesignpros365', icon: Linkedin },
  { name: 'Instagram', href: 'https://instagram.com/webdesignpros365', icon: Instagram },
  { name: 'Facebook', href: 'https://facebook.com/webdesignpros365', icon: Facebook },
];

export default function Footer() {
  return (
    <footer className="bg-[#1e1c35] border-t border-[#8734E1]">
      <div className="container-custom py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-3">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-3">
              <Image
                src="/logo-wdp365.png"
                alt="Web Design Pros 365"
                width={132}
                height={48}
                className="h-[48px] w-auto"
              />
            </Link>
            <p className="text-[#a8a4c8] mb-3 max-w-sm text-sm">
              Building modern web experiences on an AI-native stack. Your vision,
              our expertise.
            </p>

            {/* Contact Info */}
            <div className="space-y-2 text-sm text-[#a8a4c8]">
              <a
                href="mailto:info@webdesignpros365.com"
                className="flex items-center gap-2 hover:text-[#8734E1] transition-colors underline underline-offset-2 decoration-gray-300"
              >
                <Mail className="w-4 h-4" />
                info@webdesignpros365.com
              </a>
              <a
                href="tel:+17202760797"
                className="flex items-center gap-2 hover:text-[#8734E1] transition-colors underline underline-offset-2 decoration-gray-300"
              >
                <Phone className="w-4 h-4" />
                +1 (720) 276-0797
              </a>
            </div>
          </div>

          {/* Company */}
          <div className="pt-4 lg:pt-6">
            <h3 className="font-semibold text-[#dddaf0] mb-3">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#a8a4c8] hover:text-[#8734E1] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="pt-4 lg:pt-6">
            <h3 className="font-semibold text-[#dddaf0] mb-3">Resources</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#a8a4c8] hover:text-[#8734E1] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-6 pt-4 border-t border-[#8734E1]/20 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-sm text-[#c4c0e0]">
            &copy; {new Date().getFullYear()} Web Design Pros 365. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-[#8a87a8] hover:text-[#8734E1] hover:bg-[#1e1c35] rounded-lg transition-all"
                aria-label={social.name}
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
