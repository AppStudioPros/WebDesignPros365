'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import { Card, CardContent, Badge, Button, Input, Textarea, Select } from '@/components/ui'

const serviceOptions = [
  { value: '', label: 'Select a service...' },
  { value: 'geo', label: 'GEO - Generative Engine Optimization' },
  { value: 'ai-integration', label: 'AI Integration & Chatbots' },
  { value: 'nextjs-development', label: 'Next.js Development' },
  { value: 'seo-performance', label: 'SEO & Performance' },
  { value: 'headless-cms', label: 'Headless CMS' },
  { value: 'e-commerce', label: 'E-Commerce Development' },
  { value: 'other', label: 'Other / Not Sure' },
]

const budgetOptions = [
  { value: '', label: 'Select your budget...' },
  { value: 'starter', label: '$5,000 - $7,000 (Starter)' },
  { value: 'growth', label: '$10,000 - $15,000 (Growth)' },
  { value: 'premium', label: '$18,000 - $30,000 (Premium)' },
  { value: 'enterprise', label: '$30,000+ (Enterprise)' },
  { value: 'retainer', label: 'Monthly Retainer' },
  { value: 'not-sure', label: 'Not Sure Yet' },
]

type FormState = 'idle' | 'submitting' | 'success' | 'error'

export default function ContactPageClient() {
  const [formState, setFormState] = useState<FormState>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    budget: '',
    message: '',
    honeypot: '', // Spam protection
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormState('submitting')
    setErrorMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong')
      }

      setFormState('success')
      setFormData({
        name: '',
        email: '',
        company: '',
        service: '',
        budget: '',
        message: '',
        honeypot: '',
      })
    } catch (error) {
      setFormState('error')
      setErrorMessage(error instanceof Error ? error.message : 'Something went wrong')
    }
  }

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-mesh" />
        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="accent" className="mb-4">
              Contact Us
            </Badge>
            <h1 className="heading-xl mb-6">
              Let's Build Something <span className="gradient-text">Amazing</span>
            </h1>
            <p className="text-lg text-white/60">
              Ready to transform your digital presence? Get in touch and let's discuss your project.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="section">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="heading-md mb-4">Get in Touch</h2>
                <p className="text-white/60">
                  Fill out the form and we'll get back to you within 24-48 hours.
                </p>
              </div>

              <div className="space-y-6">
                <Card className="p-4 flex items-center gap-4 hover:bg-white/10 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-white/40">Email</p>
                    <a href="mailto:hello@webdesignpros365.com" className="text-white hover:text-accent transition-colors">
                      hello@webdesignpros365.com
                    </a>
                  </div>
                </Card>

                <Card className="p-4 flex items-center gap-4 hover:bg-white/10 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-primary-light" />
                  </div>
                  <div>
                    <p className="text-sm text-white/40">Phone</p>
                    <a href="tel:+1234567890" className="text-white hover:text-accent transition-colors">
                      +1 (234) 567-890
                    </a>
                  </div>
                </Card>

                <Card className="p-4 flex items-center gap-4 hover:bg-white/10 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-success/20 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-success" />
                  </div>
                  <div>
                    <p className="text-sm text-white/40">Location</p>
                    <p className="text-white">Remote-First Agency</p>
                  </div>
                </Card>
              </div>

              {/* Trust Indicators */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-white/60">
                  <CheckCircle className="w-4 h-4 text-success" />
                  Free consultation
                </div>
                <div className="flex items-center gap-2 text-sm text-white/60">
                  <CheckCircle className="w-4 h-4 text-success" />
                  No obligation quote
                </div>
                <div className="flex items-center gap-2 text-sm text-white/60">
                  <CheckCircle className="w-4 h-4 text-success" />
                  24-48 hour response time
                </div>
              </div>
            </div>

            {/* Form */}
            <Card className="lg:col-span-2 p-8">
              <CardContent className="p-0">
                {formState === 'success' ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-success/20 flex items-center justify-center">
                      <CheckCircle className="w-8 h-8 text-success" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">Message Sent!</h3>
                    <p className="text-white/60 mb-6">
                      Thank you for reaching out. We'll get back to you within 24-48 hours.
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => setFormState('idle')}
                    >
                      Send Another Message
                    </Button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Honeypot field - hidden from users */}
                    <input
                      type="text"
                      name="honeypot"
                      value={formData.honeypot}
                      onChange={handleChange}
                      className="hidden"
                      tabIndex={-1}
                      autoComplete="off"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-white/80 mb-2">
                          Name *
                        </label>
                        <Input
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="John Doe"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-white/80 mb-2">
                          Email *
                        </label>
                        <Input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="john@example.com"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">
                        Company
                      </label>
                      <Input
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Your company name"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-white/80 mb-2">
                          Service Interested In
                        </label>
                        <Select
                          name="service"
                          value={formData.service}
                          onChange={handleChange}
                          options={serviceOptions}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-white/80 mb-2">
                          Budget Range
                        </label>
                        <Select
                          name="budget"
                          value={formData.budget}
                          onChange={handleChange}
                          options={budgetOptions}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">
                        Project Details *
                      </label>
                      <Textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us about your project, goals, and timeline..."
                        rows={6}
                        required
                      />
                    </div>

                    {formState === 'error' && (
                      <div className="flex items-center gap-2 p-4 rounded-xl bg-error/10 border border-error/30 text-error">
                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                        <p className="text-sm">{errorMessage}</p>
                      </div>
                    )}

                    <Button
                      type="submit"
                      variant="accent"
                      size="lg"
                      className="w-full"
                      disabled={formState === 'submitting'}
                    >
                      {formState === 'submitting' ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Send Message
                        </>
                      )}
                    </Button>

                    <p className="text-xs text-white/40 text-center">
                      By submitting this form, you agree to our privacy policy.
                    </p>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  )
}
