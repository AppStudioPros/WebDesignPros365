'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Home, Landmark, Shield } from 'lucide-react';

const verticals = [
  { id: 'real-estate', label: 'Real Estate', icon: Home, defaultDealValue: 8500 },
  { id: 'mortgage', label: 'Mortgage', icon: Landmark, defaultDealValue: 4200 },
  { id: 'insurance', label: 'Insurance', icon: Shield, defaultDealValue: 1800 },
];

function formatCurrency(amount: number): string {
  return '$' + Math.round(amount).toLocaleString();
}

export default function ROICalculator() {
  const [selectedVertical, setSelectedVertical] = useState('real-estate');
  const [visitors, setVisitors] = useState(500);
  const [dealValue, setDealValue] = useState(8500);
  const [conversionRate, setConversionRate] = useState(0.5);

  useEffect(() => {
    const v = verticals.find((v) => v.id === selectedVertical);
    if (v) setDealValue(v.defaultDealValue);
  }, [selectedVertical]);

  const currentRevenue = visitors * (conversionRate / 100) * dealValue;
  const aiRevenue = visitors * ((conversionRate / 100) * 2.3) * dealValue;
  const monthlyGap = aiRevenue - currentRevenue;
  const annualGap = monthlyGap * 12;

  return (
    <section className="bg-[#0d0d14] py-20">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-[#8734E1] uppercase tracking-widest text-4xl md:text-5xl font-bold text-center">
            CALCULATE YOUR VISIBILITY GAP
          </h2>

          {/* Vertical Picker */}
          <div className="flex flex-wrap justify-center gap-3 mt-10">
            {verticals.map((v) => {
              const Icon = v.icon;
              const isSelected = selectedVertical === v.id;
              return (
                <button
                  key={v.id}
                  onClick={() => setSelectedVertical(v.id)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm transition-all border ${
                    isSelected
                      ? 'bg-[#8734E1]/10 border-[#8734E1] text-white'
                      : 'bg-[#252640]/5 border-white/10 text-white/60 hover:border-white/20'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {v.label}
                </button>
              );
            })}
          </div>

          {/* Sliders */}
          <div className="mt-14 space-y-10">
            {/* Monthly Website Visitors */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm text-white/60">Monthly Website Visitors</label>
                <span className="text-sm font-mono text-white">{visitors.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min={500}
                max={20000}
                step={100}
                value={visitors}
                onChange={(e) => setVisitors(Number(e.target.value))}
                className="slider-input"
              />
            </div>

            {/* Average Deal Value */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm text-white/60">Average Deal Value</label>
                <span className="text-sm font-mono text-white">{formatCurrency(dealValue)}</span>
              </div>
              <input
                type="range"
                min={500}
                max={25000}
                step={100}
                value={dealValue}
                onChange={(e) => setDealValue(Number(e.target.value))}
                className="slider-input"
              />
            </div>

            {/* Current Lead Conversion Rate */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm text-white/60">Current Lead Conversion Rate</label>
                <span className="text-sm font-mono text-white">{conversionRate.toFixed(1)}%</span>
              </div>
              <input
                type="range"
                min={0.5}
                max={5}
                step={0.1}
                value={conversionRate}
                onChange={(e) => setConversionRate(Number(e.target.value))}
                className="slider-input"
              />
            </div>
          </div>

          {/* Results Panel */}
          <div className="mt-14">
            <div className="bg-[#252640]/5 border border-white/10 rounded-2xl p-8">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-white/70 font-medium">Currently:</span>
                  <span className="text-xl font-bold text-white">{formatCurrency(currentRevenue)}<span className="text-sm font-normal text-white/50">/mo</span></span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-white/70 font-medium">With AI Visibility:</span>
                  <span className="text-xl font-bold text-sky-400">{formatCurrency(aiRevenue)}<span className="text-sm font-normal text-sky-400/60">/mo</span></span>
                </div>
                <div className="border-t border-white/10 my-2" />
                <div className="flex justify-between items-center pt-2">
                  <span className="text-sm text-white/70 font-medium">Annual Visibility Gap:</span>
                  <span className="text-3xl font-bold text-emerald-400">{formatCurrency(annualGap)}</span>
                </div>
              </div>
              <p className="text-xs text-white/40 mt-6 leading-relaxed">
                Based on industry benchmarks for SEO + AEO + GEO optimized businesses vs non-optimized.
                The 2.3x visibility multiplier is derived from search and AI recommendation engine studies.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        .slider-input {
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
          width: 100%;
          height: 6px;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.1);
          outline: none;
          cursor: pointer;
        }
        .slider-input::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #8734E1;
          cursor: pointer;
          border: 2px solid rgba(255, 255, 255, 0.2);
        }
        .slider-input::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #8734E1;
          cursor: pointer;
          border: 2px solid rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </section>
  );
}
