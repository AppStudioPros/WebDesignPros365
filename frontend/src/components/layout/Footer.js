import React from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Twitter, Github, Mail, Phone, MapPin } from 'lucide-react';

const footerLinks = {
  services: [
    { name: 'GEO - Generative Engine Optimization', href: '/services#geo' },
    { name: 'AI Integration', href: '/services#ai' },
    { name: 'Next.js Development', href: '/services#development' },
    { name: 'SEO & Performance', href: '/services#seo' },
    { name: 'E-Commerce', href: '/services#ecommerce' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Blog', href: '/blog' },
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
  { name: 'LinkedIn', href: 'https://linkedin.com', icon: Linkedin },
  { name: 'Twitter', href: 'https://twitter.com', icon: Twitter },
  { name: 'GitHub', href: 'https://github.com', icon: Github },
];

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-[#8a7fe9] via-[#b8a1e6] to-[#9fa6e9] border-t border-white/20">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-6">
              <img 
                src="https://customer-assets.emergentagent.com/job_designpros-test/artifacts/tf1dbj7e_Web%20Design%20Pros%20365%20noborder.png" 
                alt="Web Design Pros 365" 
                className="h-12 w-auto"
              />
            </Link>
            <p className="text-white/60 mb-6 max-w-sm">
              Crafting next-gen web experiences with cutting-edge technology. Your vision,
              our expertise.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 text-sm text-white/60">
              <a
                href="mailto:info@webdesignpros365.com"
                className="flex items-center gap-2 hover:text-[#2F73EE] transition-colors"
              >
                <Mail className="w-4 h-4" />
                info@webdesignpros365.com
              </a>
              <a
                href="tel:+17202760797"
                className="flex items-center gap-2 hover:text-[#2F73EE] transition-colors"
              >
                <Phone className="w-4 h-4" />
                +1 (720) 276-0797
              </a>
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Remote-First Agency
              </p>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-white mb-4">Services</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-white/60 hover:text-[#2F73EE] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-white/60 hover:text-[#2F73EE] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-white mb-4">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-white/60 hover:text-[#2F73EE] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-white/40">
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
                className="p-2 text-white/40 hover:text-[#2F73EE] hover:bg-[#2F73EE]/10 rounded-lg transition-all"
                aria-label={social.name}
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>

          {/* Tech Badges */}
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full bg-[#1A3A6E]/30 border border-[#2F73EE]/30">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88]" />
              Next.js 15
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full bg-[#8734E1]/20 border border-[#8734E1]/30">
              <span className="w-1.5 h-1.5 rounded-full bg-[#BF5DE0]" />
              Vercel
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
