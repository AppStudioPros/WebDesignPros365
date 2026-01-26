'use client'

import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, Loader2, Shield } from 'lucide-react'
import { Card, CardContent, Badge, Button, Input, Textarea, Select } from '@/components/ui'

// Declare grecaptcha global type
declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void
      execute: (siteKey: string, options: { action: string }) => Promise<string>
    }
  }
}

const serviceOptions = [
  { value: '', label: 'Select a service...' },
  { value: 'GEO', label: 'Generative Engine Optimization (GEO)' },
  { value: 'AI', label: 'AI Integration & Chatbots' },
  { value: 'Development', label: 'Next.js Development' },
  { value: 'SEO', label: 'SEO & Performance' },
  { value: 'CMS', label: 'Headless CMS (Sanity.io)' },
  { value: 'Marketing', label: 'Digital Marketing' },
  { value: 'E-Commerce', label: 'E-Commerce Development' },
  { value: 'Design', label: 'UI/UX Design' },
  { value: 'Other', label: 'Other / Not Sure' },
]

const budgetOptions = [
  { value: '', label: 'Select your budget...' },
  { value: '5-7k', label: '$5,000 - $7,000 (Starter)' },
  { value: '10-15k', label: '$10,000 - $15,000 (Growth)' },
  { value: '18-30k', label: '$18,000 - $30,000 (Premium)' },
  { value: '30k+', label: '$30,000+ (Enterprise)' },
  { value: 'retainer', label: 'Monthly Retainer' },
  { value: 'not-sure', label: 'Not Sure Yet' },
]

const timelineOptions = [
  { value: '', label: 'Select timeline...' },
  { value: 'asap', label: 'ASAP (0-30 days)' },
  { value: '1-2-months', label: '1-2 Months' },
  { value: '3-6-months', label: '3-6 Months' },
  { value: 'exploring', label: 'Still Exploring' },
]

type FormState = 'idle' | 'submitting' | 'success' | 'error'

export default function ContactPageClient() {
  const [formState, setFormState] = useState<FormState>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    service: '',
    budget: '',
    timeline: '',
    message: '',
    agreeToContact: false,
    honeypot: '', // Spam protection
    website_url: '', // Additional honeypot from guide
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : null

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  // Get reCAPTCHA token
  const getRecaptchaToken = useCallback(async (): Promise<string | null> => {
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
    
    if (!siteKey) {
      console.log('reCAPTCHA: No site key configured, skipping verification')
      return null
    }

    if (typeof window === 'undefined' || !window.grecaptcha) {
      console.warn('reCAPTCHA: Script not loaded')
      return null
    }

    return new Promise((resolve) => {
      window.grecaptcha.ready(async () => {
        try {
          const token = await window.grecaptcha.execute(siteKey, { action: 'contact_form' })
          resolve(token)
        } catch (error) {
          console.error('reCAPTCHA: Failed to get token', error)
          resolve(null)
        }
      })
    })
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormState('submitting')
    setErrorMessage('')

    try {
      // Get reCAPTCHA token
      const recaptchaToken = await getRecaptchaToken()

      // Send form data + token to backend API route
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          recaptchaToken,
        }),
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
        phone: '',
        service: '',
        budget: '',
        timeline: '',
        message: '',
        agreeToContact: false,
        honeypot: '',
        website_url: '',
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
                <div className="flex items-center gap-2 text-sm text-white/60">
                  <Shield className="w-4 h-4 text-accent" />
                  Protected by reCAPTCHA v3
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
                    <h3 className="text-xl font-semibold text-white mb-2">Message Sent Successfully!</h3>
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
                    {/* Honeypot fields - invisible to users */}
                    <input
                      type="text"
                      name="honeypot"
                      value={formData.honeypot}
                      onChange={handleChange}
                      className="hidden"
                      tabIndex={-1}
                      autoComplete="off"
                    />
                    <input
                      type="text"
                      name="website_url"
                      value={formData.website_url}
                      onChange={handleChange}
                      style={{ display: 'none', position: 'absolute', left: '-5000px', top: '-5000px' }}
                      tabIndex={-1}
                      autoComplete="off"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-white/80 mb-2">
                          Name <span className="text-error">*</span>
                        </label>
                        <Input
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Your Name"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-white/80 mb-2">
                          Email <span className="text-error">*</span>
                        </label>
                        <Input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="your@email.com"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                      <div>
                        <label className="block text-sm font-medium text-white/80 mb-2">
                          Phone
                        </label>
                        <Input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-white/80 mb-2">
                          Service Interest
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
                      <div>
                        <label className="block text-sm font-medium text-white/80 mb-2">
                          Timeline
                        </label>
                        <Select
                          name="timeline"
                          value={formData.timeline}
                          onChange={handleChange}
                          options={timelineOptions}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">
                        Project Description <span className="text-error">*</span>
                      </label>
                      <Textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us about your project, goals, and vision..."
                        rows={6}
                        required
                      />
                    </div>

                    {/* Agreement Checkbox */}
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        id="agreeToContact"
                        name="agreeToContact"
                        checked={formData.agreeToContact}
                        onChange={handleChange}
                        required
                        className="mt-1 w-4 h-4 rounded border-white/20 bg-white/5 text-accent focus:ring-accent"
                      />
                      <label htmlFor="agreeToContact" className="text-sm text-white/60">
                        I understand the privacy policy and want to be contacted about my project
                      </label>
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

                    {/* reCAPTCHA Badge Notice */}
                    <p className="text-xs text-white/40 text-center">
                      This site is protected by reCAPTCHA and the Google{' '}
                      <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                        Privacy Policy
                      </a>{' '}
                      and{' '}
                      <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                        Terms of Service
                      </a>{' '}
                      apply.
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
