import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Twitter, Github } from 'lucide-react';
import { Card, Badge } from '../components/ui';
import { CTASection } from '../components/sections';

const team = [
  { name: 'Lead Developer', role: 'Senior Full-Stack Engineer', bio: 'Expert in Next.js, TypeScript, and AI integration. 10+ years of experience building high-performance web applications.', socialLinks: [{ platform: 'linkedin', url: '#' }, { platform: 'github', url: '#' }] },
  { name: 'Lead Designer', role: 'Senior UI/UX Designer', bio: 'Passionate about creating beautiful, user-centered designs. Specializes in modern web aesthetics and interaction design.', socialLinks: [{ platform: 'linkedin', url: '#' }, { platform: 'twitter', url: '#' }] },
];

const values = [
  { title: 'Innovation First', description: 'We stay ahead of the curve, adopting cutting-edge technologies like GEO and AI integration before they become mainstream.', icon: '🚀' },
  { title: 'Client-Centric', description: 'Your success is our success. We work closely with you to understand your needs and deliver tailored solutions.', icon: '🤝' },
  { title: 'Quality Obsessed', description: "We don't cut corners. Every project undergoes rigorous testing and optimization before launch.", icon: '✨' },
  { title: 'Transparent Process', description: "Clear communication, honest pricing, and no surprises. You'll always know where your project stands.", icon: '💬' },
];

const stats = [
  { value: '50+', label: 'Projects Completed' },
  { value: '98%', label: 'Client Satisfaction' },
  { value: '5+', label: 'Years Experience' },
  { value: '24/7', label: 'Support Available' },
];

export default function AboutPage() {
  return (
    <>
      <section className="pt-32 pb-20 relative overflow-hidden bg-gradient-to-b from-white to-[#f8f9fc]">
        <div className="absolute inset-0 bg-gradient-mesh" />
        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="accent" className="mb-4">About Us</Badge>
            <h1 className="heading-xl mb-6">We Build <span className="gradient-text">Next-Gen</span> Digital Experiences</h1>
            <p className="text-lg text-gray-600">
              A boutique web design agency powered by two senior developers with a passion for innovation and excellence.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gradient-to-r from-[#8734E1] to-[#BF5DE0]">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</p>
                <p className="text-sm text-white/80">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="primary" className="mb-4">Our Story</Badge>
              <h2 className="heading-lg mb-6">Born from a Passion for <span className="gradient-text">Excellence</span></h2>
              <div className="space-y-4 text-gray-600">
                <p>Web Design Pros 365 was founded with a simple mission: deliver exceptional digital experiences using the most innovative technologies available.</p>
                <p>Our team of senior developers brings over a decade of combined experience across startups, agencies, and enterprise organizations. We've seen what works and what doesn't - and we apply those lessons to every project.</p>
                <p>We specialize in Next.js, the React framework that powers some of the world's fastest websites. Combined with our expertise in AI integration and GEO (Generative Engine Optimization), we help businesses stay ahead of the curve.</p>
              </div>
            </div>
            <div className="bg-[#f8f9fc] border border-gray-200 rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Why Choose Us?</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3"><span className="text-2xl">👥</span><div><p className="font-medium text-gray-900">Senior Developers</p><p className="text-sm text-gray-600">No juniors, no handoffs - direct access to experts</p></div></li>
                <li className="flex items-start gap-3"><span className="text-2xl">🎯</span><div><p className="font-medium text-gray-900">Innovative Practices</p><p className="text-sm text-gray-600">GEO, AI integration, and cutting-edge tech</p></div></li>
                <li className="flex items-start gap-3"><span className="text-2xl">🛠️</span><div><p className="font-medium text-gray-900">Tailored Solutions</p><p className="text-sm text-gray-600">Every project is unique - no templates</p></div></li>
                <li className="flex items-start gap-3"><span className="text-2xl">✅</span><div><p className="font-medium text-gray-900">Rigorous Testing</p><p className="text-sm text-gray-600">Every project is thoroughly QA'd before launch</p></div></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-[#f8f9fc]">
        <div className="container-custom">
          <div className="text-center mb-12">
            <Badge variant="accent" className="mb-4">Our Values</Badge>
            <h2 className="heading-lg">What We <span className="gradient-text">Stand For</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <Card key={value.title} className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-sm text-gray-600">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <Badge variant="primary" className="mb-4">Our Team</Badge>
            <h2 className="heading-lg">Meet the <span className="gradient-text">Pros</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {team.map((member) => (
              <Card key={member.name} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-[#8734E1] to-[#BF5DE0] flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                    <p className="text-[#8734E1] text-sm mb-2">{member.role}</p>
                    <p className="text-gray-600 text-sm mb-4">{member.bio}</p>
                    <div className="flex gap-2">
                      {member.socialLinks.map((social) => (
                        <a key={social.platform} href={social.url} className="p-2 text-gray-400 hover:text-[#8734E1] hover:bg-[#8734E1]/10 rounded-lg transition-all" target="_blank" rel="noopener noreferrer">
                          {social.platform === 'linkedin' && <Linkedin className="w-4 h-4" />}
                          {social.platform === 'twitter' && <Twitter className="w-4 h-4" />}
                          {social.platform === 'github' && <Github className="w-4 h-4" />}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
