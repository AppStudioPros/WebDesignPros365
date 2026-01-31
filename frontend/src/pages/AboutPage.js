import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Card, Badge } from '../components/ui';
import { CTASection } from '../components/sections';

const values = [
  { title: 'Innovation First', description: 'We stay ahead of the curve, adopting cutting-edge technologies like GEO and AI integration before they become mainstream.', icon: '/icons/svg/gradient/rocket.svg' },
  { title: 'Client-Centric', description: 'Your success is our success. We work closely with you to understand your needs and deliver tailored solutions.', icon: '/icons/svg/gradient/chat.svg' },
  { title: 'Quality Obsessed', description: "We don't cut corners. Every project undergoes rigorous testing and optimization before launch.", icon: '/icons/svg/gradient/shield.svg' },
  { title: 'Transparent Process', description: "Clear communication, honest pricing, and no surprises. You'll always know where your project stands.", icon: '/icons/svg/gradient/vision.svg' },
];

const stats = [
  { value: '50+', label: 'Projects Completed' },
  { value: '98%', label: 'Client Satisfaction' },
  { value: '5+', label: 'Years Experience' },
  { value: '24/7', label: 'Support Available' },
];

const whyChooseUs = [
  { title: 'Senior Developers', description: 'No juniors, no handoffs - direct access to experts' },
  { title: 'Innovative Practices', description: 'GEO, AI integration, and cutting-edge tech' },
  { title: 'Tailored Solutions', description: 'Every project is unique - no templates' },
  { title: 'Rigorous Testing', description: 'Every project is thoroughly QA\'d before launch' },
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
                {whyChooseUs.map((item) => (
                  <li key={item.title} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#f0e6fb] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-[#8734E1]" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{item.title}</p>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                  </li>
                ))}
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
              <Card key={value.title} className="p-6 text-center hover:shadow-lg transition-shadow relative overflow-hidden">
                {/* Background Icon - bottom right, large, transparent, cut off */}
                <img 
                  src={value.icon} 
                  alt="" 
                  className="absolute -bottom-6 -right-6 w-32 h-32 opacity-10 pointer-events-none"
                />
                <div className="relative z-10">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{value.title}</h3>
                  <p className="text-sm text-gray-600">{value.description}</p>
                </div>
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
                        <a key={social.platform} href={social.url} className="p-2 text-gray-400 hover:text-[#8734E1] hover:bg-[#f0e6fb] rounded-lg transition-all" target="_blank" rel="noopener noreferrer">
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
