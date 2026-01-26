import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, Loader2, Shield } from 'lucide-react';
import { Card, CardContent, Badge, Button, Input, Textarea, Select } from '../components/ui';

const serviceOptions = [
  { value: '', label: 'Select a service...' },
  { value: 'GEO', label: 'Generative Engine Optimization (GEO)' },
  { value: 'AI', label: 'AI Integration & Chatbots' },
  { value: 'Development', label: 'Next.js Development' },
  { value: 'SEO', label: 'SEO & Performance' },
  { value: 'CMS', label: 'Headless CMS (Sanity.io)' },
  { value: 'E-Commerce', label: 'E-Commerce Development' },
  { value: 'Other', label: 'Other / Not Sure' },
];

const budgetOptions = [
  { value: '', label: 'Select your budget...' },
  { value: '5-7k', label: '$5,000 - $7,000 (Starter)' },
  { value: '10-15k', label: '$10,000 - $15,000 (Growth)' },
  { value: '18-30k', label: '$18,000 - $30,000 (Premium)' },
  { value: '30k+', label: '$30,000+ (Enterprise)' },
  { value: 'retainer', label: 'Monthly Retainer' },
  { value: 'not-sure', label: 'Not Sure Yet' },
];

export default function ContactPage() {
  const [formState, setFormState] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    name: '', email: '', company: '', phone: '', service: '', budget: '', message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormState('submitting');
    setErrorMessage('');

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.detail || 'Something went wrong');

      setFormState('success');
      setFormData({ name: '', email: '', company: '', phone: '', service: '', budget: '', message: '' });
    } catch (error) {
      setFormState('error');
      setErrorMessage(error.message);
    }
  };

  return (
    <>
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-mesh" />
        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="accent" className="mb-4">Contact Us</Badge>
            <h1 className="heading-xl mb-6">Let's Build Something <span className="gradient-text">Amazing</span></h1>
            <p className="text-lg text-white/60">
              Ready to transform your digital presence? Get in touch and let's discuss your project.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="space-y-8">
              <div>
                <h2 className="heading-md mb-4">Get in Touch</h2>
                <p className="text-white/60">Fill out the form and we'll get back to you within 24-48 hours.</p>
              </div>

              <div className="space-y-6">
                <Card className="p-4 flex items-center gap-4 hover:bg-[#2F73EE]/10 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-[#2F73EE]/20 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-[#2F73EE]" />
                  </div>
                  <div>
                    <p className="text-sm text-white/40">Email</p>
                    <a href="mailto:info@webdesignpros365.com" className="text-white hover:text-[#2F73EE] transition-colors">info@webdesignpros365.com</a>
                  </div>
                </Card>

                <Card className="p-4 flex items-center gap-4 hover:bg-[#8734E1]/10 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-[#8734E1]/20 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-[#BF5DE0]" />
                  </div>
                  <div>
                    <p className="text-sm text-white/40">Phone</p>
                    <a href="tel:+17202760797" className="text-white hover:text-[#BF5DE0] transition-colors">+1 (720) 276-0797</a>
                  </div>
                </Card>

                <Card className="p-4 flex items-center gap-4 hover:bg-[#FFD700]/10 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-[#FFD700]/20 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-[#FFD700]" />
                  </div>
                  <div>
                    <p className="text-sm text-white/40">Location</p>
                    <p className="text-white">Remote-First Agency</p>
                  </div>
                </Card>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-white/60"><CheckCircle className="w-4 h-4 text-[#00ff88]" />Free consultation</div>
                <div className="flex items-center gap-2 text-sm text-white/60"><CheckCircle className="w-4 h-4 text-[#00ff88]" />No obligation quote</div>
                <div className="flex items-center gap-2 text-sm text-white/60"><CheckCircle className="w-4 h-4 text-[#00ff88]" />24-48 hour response time</div>
                <div className="flex items-center gap-2 text-sm text-white/60"><Shield className="w-4 h-4 text-[#2F73EE]" />Spam protected form</div>
              </div>
            </div>

            <Card className="lg:col-span-2 p-8">
              <CardContent className="p-0">
                {formState === 'success' ? (
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
                    <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#00ff88]/20 flex items-center justify-center">
                      <CheckCircle className="w-8 h-8 text-[#00ff88]" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">Message Sent Successfully!</h3>
                    <p className="text-white/60 mb-6">Thank you for reaching out. We'll get back to you within 24-48 hours.</p>
                    <Button variant="outline" onClick={() => setFormState('idle')}>Send Another Message</Button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-white/80 mb-2">Name <span className="text-[#BF5DE0]">*</span></label>
                        <Input name="name" value={formData.name} onChange={handleChange} placeholder="Your Name" required />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-white/80 mb-2">Email <span className="text-[#BF5DE0]">*</span></label>
                        <Input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="your@email.com" required />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-white/80 mb-2">Company</label>
                        <Input name="company" value={formData.company} onChange={handleChange} placeholder="Your company name" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-white/80 mb-2">Phone</label>
                        <Input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+1 (555) 123-4567" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-white/80 mb-2">Service Interest</label>
                        <Select name="service" value={formData.service} onChange={handleChange} options={serviceOptions} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-white/80 mb-2">Budget Range</label>
                        <Select name="budget" value={formData.budget} onChange={handleChange} options={budgetOptions} />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">Project Description <span className="text-[#BF5DE0]">*</span></label>
                      <Textarea name="message" value={formData.message} onChange={handleChange} placeholder="Tell us about your project, goals, and vision..." rows={6} required />
                    </div>

                    {formState === 'error' && (
                      <div className="flex items-center gap-2 p-4 rounded-xl bg-[#ff3366]/10 border border-[#ff3366]/30 text-[#ff3366]">
                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                        <p className="text-sm">{errorMessage}</p>
                      </div>
                    )}

                    <Button type="submit" variant="accent" size="lg" className="w-full" disabled={formState === 'submitting'}>
                      {formState === 'submitting' ? (<><Loader2 className="w-5 h-5 animate-spin" />Sending...</>) : (<><Send className="w-5 h-5" />Send Message</>)}
                    </Button>

                    <p className="text-xs text-white/40 text-center">By submitting this form, you agree to our privacy policy.</p>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
