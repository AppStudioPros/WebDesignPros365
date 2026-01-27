import React from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Twitter, Github, Mail, Phone } from 'lucide-react';

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
  { name: 'LinkedIn', href: 'https://linkedin.com', icon: Linkedin },
  { name: 'Twitter', href: 'https://twitter.com', icon: Twitter },
  { name: 'GitHub', href: 'https://github.com', icon: Github },
];

export default function Footer() {
  return (
    <footer className="bg-gradient-to-tr from-[#a487e0] via-[#9a7de0] to-[#2F73EE]">
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
            <p className="text-white/80 mb-3 max-w-sm text-sm">
              Crafting next-gen web experiences with cutting-edge technology. Your vision,
              our expertise.
            </p>

            {/* Contact Info */}
            <div className="space-y-2 text-sm text-white/80">
              <a
                href="mailto:info@webdesignpros365.com"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4" />
                info@webdesignpros365.com
              </a>
              <a
                href="tel:+17202760797"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4" />
                +1 (720) 276-0797
              </a>
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-white mb-3">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-white/80 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-white mb-3">Resources</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-white/80 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-6 pt-4 border-t border-white/20 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-sm text-white/70">
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
                className="p-2 text-white/70 hover:text-white hover:bg-white/20 rounded-lg transition-all"
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
