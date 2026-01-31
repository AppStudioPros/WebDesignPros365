'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Loader2, CheckCircle2, XCircle, AlertCircle, Zap, Globe, Smartphone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ScanResult {
  url: string;
  performance: {
    score: number;
    metrics: {
      fcp: number;
      lcp: number;
      cls: number;
      tbt: number;
      si: number;
    };
  };
  accessibility: {
    score: number;
    issues: number;
  };
  seo: {
    score: number;
    issues: string[];
  };
  bestPractices: {
    score: number;
  };
  mobile: {
    score: number;
  };
  timestamp: string;
}

export default function ScannerPage() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [error, setError] = useState('');

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url) {
      setError('Please enter a valid URL');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch('/api/pagespeed', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        throw new Error('Failed to scan website');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBg = (score: number) => {
    if (score >= 90) return 'bg-green-100 border-green-300';
    if (score >= 50) return 'bg-yellow-100 border-yellow-300';
    return 'bg-red-100 border-red-300';
  };

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gradient-to-b from-[#f5f0fa] to-white">
      <div className="container-custom max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#f0e6fb] border border-[#8734E1] text-[#8734E1] mb-6">
            <Zap className="w-4 h-4" />
            <span className="text-sm font-medium">Free Website Analysis</span>
          </div>
          <h1 className="heading-xl mb-4">
            Website Performance <span className="gradient-text">Scanner</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get instant insights into your website's performance, SEO, accessibility, and best practices.
          </p>
        </motion.div>

        {/* Scan Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-8 mb-8">
            <form onSubmit={handleScan} className="flex gap-4">
              <div className="flex-1">
                <Input
                  type="url"
                  placeholder="https://example.com"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="h-14 text-lg"
                  disabled={loading}
                  data-testid="scanner-url-input"
                />
              </div>
              <Button
                type="submit"
                disabled={loading}
                className="h-14 px-8 bg-gradient-to-r from-[#8734E1] to-[#BF5DE0] hover:opacity-90"
                data-testid="scanner-submit-button"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Scanning...
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5 mr-2" />
                    Scan Website
                  </>
                )}
              </Button>
            </form>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3"
              >
                <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-red-800">{error}</p>
              </motion.div>
            )}
          </Card>
        </motion.div>

        {/* Results */}
        <AnimatePresence mode="wait">
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Score Overview */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { label: 'Performance', score: result.performance.score, icon: Zap },
                  { label: 'Accessibility', score: result.accessibility.score, icon: CheckCircle2 },
                  { label: 'Best Practices', score: result.bestPractices.score, icon: AlertCircle },
                  { label: 'SEO', score: result.seo.score, icon: Globe },
                ].map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className={`p-6 ${getScoreBg(item.score)} border-2`}>
                      <div className="flex items-center justify-between mb-4">
                        <item.icon className={`w-6 h-6 ${getScoreColor(item.score)}`} />
                        <span className={`text-3xl font-bold ${getScoreColor(item.score)}`}>
                          {item.score}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-gray-700">{item.label}</p>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Detailed Metrics */}
              <Tabs defaultValue="performance" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="performance">Performance</TabsTrigger>
                  <TabsTrigger value="accessibility">Accessibility</TabsTrigger>
                  <TabsTrigger value="seo">SEO</TabsTrigger>
                  <TabsTrigger value="mobile">Mobile</TabsTrigger>
                </TabsList>

                <TabsContent value="performance" className="mt-6">
                  <Card className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Performance Metrics</h3>
                    <div className="space-y-4">
                      {[
                        { label: 'First Contentful Paint', value: result.performance.metrics.fcp, unit: 's' },
                        { label: 'Largest Contentful Paint', value: result.performance.metrics.lcp, unit: 's' },
                        { label: 'Cumulative Layout Shift', value: result.performance.metrics.cls, unit: '' },
                        { label: 'Total Blocking Time', value: result.performance.metrics.tbt, unit: 'ms' },
                        { label: 'Speed Index', value: result.performance.metrics.si, unit: 's' },
                      ].map((metric) => (
                        <div key={metric.label} className="flex justify-between items-center pb-3 border-b border-gray-200 last:border-0">
                          <span className="text-gray-700">{metric.label}</span>
                          <span className="font-semibold">
                            {metric.value}{metric.unit}
                          </span>
                        </div>
                      ))}
                    </div>
                  </Card>
                </TabsContent>

                <TabsContent value="accessibility" className="mt-6">
                  <Card className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Accessibility Report</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">Score</span>
                        <span className={`text-2xl font-bold ${getScoreColor(result.accessibility.score)}`}>
                          {result.accessibility.score}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">Issues Found</span>
                        <span className="font-semibold text-gray-900">
                          {result.accessibility.issues}
                        </span>
                      </div>
                    </div>
                  </Card>
                </TabsContent>

                <TabsContent value="seo" className="mt-6">
                  <Card className="p-6">
                    <h3 className="text-xl font-semibold mb-4">SEO Analysis</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-gray-700">SEO Score</span>
                        <span className={`text-2xl font-bold ${getScoreColor(result.seo.score)}`}>
                          {result.seo.score}
                        </span>
                      </div>
                      {result.seo.issues.length > 0 && (
                        <div>
                          <h4 className="font-medium mb-2 text-gray-900">Issues to Address:</h4>
                          <ul className="space-y-2">
                            {result.seo.issues.map((issue, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <AlertCircle className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-1" />
                                <span className="text-gray-700">{issue}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </Card>
                </TabsContent>

                <TabsContent value="mobile" className="mt-6">
                  <Card className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Mobile Performance</h3>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Smartphone className="w-8 h-8 text-[#8734E1]" />
                        <span className="text-gray-700">Mobile Score</span>
                      </div>
                      <span className={`text-4xl font-bold ${getScoreColor(result.mobile.score)}`}>
                        {result.mobile.score}
                      </span>
                    </div>
                  </Card>
                </TabsContent>
              </Tabs>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Card className="p-8 bg-gradient-to-r from-[#8734E1] to-[#2F73EE] text-white">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold mb-4">Want to Improve Your Score?</h3>
                    <p className="text-white/90 mb-6 max-w-2xl mx-auto">
                      Our team of experts can help optimize your website for better performance, SEO, and user experience.
                    </p>
                    <Button
                      className="bg-white text-[#8734E1] hover:bg-white/90 h-12 px-8"
                      onClick={() => window.location.href = '/contact'}
                    >
                      Get Expert Help
                    </Button>
                  </div>
                </Card>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
