import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Youtube, Mail, Phone } from 'lucide-react';

// Custom X (formerly Twitter) icon
const XIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const footerLinks = {
  company: [
    { name: 'Services', href: '/services' },
    { name: 'About Us', href: '/about' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Contact', href: '/contact' },
  ],
  resources: [
    { name: 'FAQ', href: '/faq' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
  ],
};

const socialLinks = [
  { name: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61566930435901', icon: Facebook },
  { name: 'Instagram', href: 'https://www.instagram.com/webdesignpros365/', icon: Instagram },
  { name: 'X', href: 'https://x.com/WebDesignPro365', icon: XIcon },
  { name: 'YouTube', href: 'https://www.youtube.com/@WebDesignPros365', icon: Youtube },
];

export default function Footer() {
  return (
    <footer className="bg-[#e8daf8] border-t border-[#d4c4e8]">
      <div className="container-custom py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-3">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-3">
              <img 
                src="https://customer-assets.emergentagent.com/job_designpros-test/artifacts/tf1dbj7e_Web%20Design%20Pros%20365%20noborder.png" 
                alt="Web Design Pros 365" 
                className="h-[60px] w-auto"
              />
            </Link>
            <p className="text-gray-600 mb-3 max-w-sm text-sm">
              Crafting next-gen web experiences with cutting-edge technology. Your vision,
              our expertise.
            </p>

            {/* Contact Info */}
            <div className="space-y-2 text-sm text-gray-600">
              <a
                href="mailto:info@webdesignpros365.com"
                className="flex items-center gap-2 hover:text-[#8734E1] transition-colors"
              >
                <Mail className="w-4 h-4" />
                info@webdesignpros365.com
              </a>
              <a
                href="tel:+17202760797"
                className="flex items-center gap-2 hover:text-[#8734E1] transition-colors"
              >
                <Phone className="w-4 h-4" />
                +1 (720) 276-0797
              </a>
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-3">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-gray-600 hover:text-[#8734E1] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-3">Resources</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-gray-600 hover:text-[#8734E1] transition-colors"
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
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Web Design Pros 365. All rights reserved.
          </p>

          {/* Social Links - moved to the right */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-500 hover:text-[#8734E1] hover:bg-[#8734E1]/10 rounded-lg transition-all"
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
