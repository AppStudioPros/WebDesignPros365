import Link from 'next/link'
import { Linkedin, Twitter, Github, Mail, Phone, MapPin } from 'lucide-react'

const footerLinks = {
  services: [
    { name: 'GEO - Generative Engine Optimization', href: '/services/geo' },
    { name: 'AI Integration', href: '/services/ai-integration' },
    { name: 'Next.js Development', href: '/services/nextjs-development' },
    { name: 'SEO & Performance', href: '/services/seo-performance' },
    { name: 'E-Commerce', href: '/services/e-commerce' },
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
}

const socialLinks = [
  { name: 'LinkedIn', href: 'https://linkedin.com', icon: Linkedin },
  { name: 'Twitter', href: 'https://twitter.com', icon: Twitter },
  { name: 'GitHub', href: 'https://github.com', icon: Github },
]

export default function Footer() {
  return (
    <footer className="bg-dark-secondary border-t border-white/10">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent to-primary flex items-center justify-center">
                  <span className="text-white font-bold text-lg">W</span>
                </div>
                <div>
                  <span className="font-heading font-bold text-lg text-white">
                    Web Design Pros
                  </span>
                  <span className="font-heading font-bold text-lg gradient-text"> 365</span>
                </div>
              </div>
            </Link>
            <p className="text-white/60 mb-6 max-w-sm">
              Crafting next-gen web experiences with cutting-edge technology. Your vision,
              our expertise.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 text-sm text-white/60">
              <a
                href="mailto:hello@webdesignpros365.com"
                className="flex items-center gap-2 hover:text-accent transition-colors"
              >
                <Mail className="w-4 h-4" />
                hello@webdesignpros365.com
              </a>
              <a
                href="tel:+1234567890"
                className="flex items-center gap-2 hover:text-accent transition-colors"
              >
                <Phone className="w-4 h-4" />
                +1 (234) 567-890
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
                    href={link.href}
                    className="text-sm text-white/60 hover:text-accent transition-colors"
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
                    href={link.href}
                    className="text-sm text-white/60 hover:text-accent transition-colors"
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
                    href={link.href}
                    className="text-sm text-white/60 hover:text-accent transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
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
                className="p-2 text-white/40 hover:text-accent hover:bg-white/10 rounded-lg transition-all"
                aria-label={social.name}
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>

          {/* Tech Badges */}
          <div className="flex items-center gap-3">
            <span className="badge text-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-success" />
              Next.js 15
            </span>
            <span className="badge text-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              Vercel
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
