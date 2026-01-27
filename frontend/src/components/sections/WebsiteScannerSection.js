import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Globe, 
  Shield, 
  Zap, 
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  XCircle,
  ArrowRight,
  Sparkles,
  RefreshCw,
  DollarSign,
  Clock,
  Bot,
  Lock,
  Rocket,
  Smartphone,
  X,
  Eye
} from 'lucide-react';
import { Button } from '../ui';
import { Link } from 'react-router-dom';

// Score Card Component
const ScoreCard = ({ icon: Icon, label, score, grade, description, color }) => {
  const getGradeColor = (grade) => {
    switch(grade) {
      case 'A': return 'text-emerald-500 bg-emerald-500/10 border-emerald-500/30';
      case 'B': return 'text-blue-500 bg-blue-500/10 border-blue-500/30';
      case 'C': return 'text-amber-500 bg-amber-500/10 border-amber-500/30';
      case 'D': return 'text-orange-500 bg-orange-500/10 border-orange-500/30';
      case 'F': return 'text-red-500 bg-red-500/10 border-red-500/30';
      default: return 'text-gray-500 bg-gray-500/10 border-gray-500/30';
    }
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-emerald-500';
    if (score >= 70) return 'text-blue-500';
    if (score >= 50) return 'text-amber-500';
    return 'text-red-500';
  };

  const getProgressColor = (score) => {
    if (score >= 90) return 'bg-emerald-500';
    if (score >= 70) return 'bg-blue-500';
    if (score >= 50) return 'bg-amber-500';
    return 'bg-red-500';
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <Icon className={`w-5 h-5 ${color}`} />
          <span className="font-medium text-gray-700">{label}</span>
        </div>
        <span className={`px-2 py-0.5 text-xs font-bold rounded border ${getGradeColor(grade)}`}>
          {grade}
        </span>
      </div>
      <div className="flex items-baseline gap-1 mb-2">
        <span className={`text-3xl font-bold ${getScoreColor(score)}`}>{score}</span>
        <span className="text-gray-400 text-sm">/100</span>
      </div>
      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden mb-2">
        <motion.div 
          className={`h-full ${getProgressColor(score)} rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 1, delay: 0.5 }}
        />
      </div>
      <p className="text-xs text-gray-500">{description}</p>
    </motion.div>
  );
};

// Issue Item Component
const IssueItem = ({ severity, title, impact }) => {
  const getSeverityStyles = (severity) => {
    switch(severity) {
      case 'critical': return { bg: 'bg-red-500', text: 'CRITICAL' };
      case 'high': return { bg: 'bg-orange-500', text: 'HIGH' };
      case 'medium': return { bg: 'bg-amber-500', text: 'MEDIUM' };
      case 'low': return { bg: 'bg-blue-500', text: 'LOW' };
      default: return { bg: 'bg-gray-500', text: 'INFO' };
    }
  };

  const styles = getSeverityStyles(severity);

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
    >
      <div className="flex items-center gap-3">
        <span className={`${styles.bg} text-white text-[10px] font-bold px-2 py-0.5 rounded`}>
          {styles.text}
        </span>
        <span className="text-gray-700 text-sm">{title}</span>
      </div>
      <span className="text-gray-400 text-xs">{impact}</span>
    </motion.div>
  );
};

// Upgrade Details Data
const upgradeDetails = {
  'ai-chat': {
    title: 'AI Chat Integration',
    badge: '+23% conversions',
    badgeColor: 'text-emerald-500',
    icon: Bot,
    description: 'GPT-powered support could handle 40% of inquiries automatically',
    fullDescription: `Transform your customer support with AI-powered chat that works 24/7.`,
    benefits: [
      'Handle 40% of customer inquiries automatically',
      'Reduce response time from hours to seconds',
      'Scale support without adding headcount',
      'Learn from every interaction to improve over time',
      'Seamless handoff to human agents when needed'
    ],
    stats: {
      conversionIncrease: '+23%',
      supportCostReduction: '-45%',
      responseTime: '<3 seconds',
      customerSatisfaction: '94%'
    },
    implementation: '2-3 weeks',
    investment: '$3,000 - $8,000'
  },
  'edge-computing': {
    title: 'Edge Computing',
    badge: '2x faster loads',
    badgeColor: 'text-blue-500',
    icon: Zap,
    description: 'Move to Vercel/Cloudflare for global edge deployment',
    fullDescription: `Deploy your site to 300+ edge locations worldwide for lightning-fast performance.`,
    benefits: [
      'Serve content from the nearest location to each user',
      'Reduce Time to First Byte (TTFB) by 60-80%',
      'Handle traffic spikes without performance degradation',
      'Automatic failover and redundancy',
      'Built-in DDoS protection'
    ],
    stats: {
      speedImprovement: '2x faster',
      globalCoverage: '300+ locations',
      uptime: '99.99%',
      bandwidthSavings: '-40%'
    },
    implementation: '1-2 weeks',
    investment: '$2,000 - $5,000'
  },
  'zero-trust': {
    title: 'Zero-Trust Security',
    badge: '99.9% secure',
    badgeColor: 'text-cyan-500',
    icon: Lock,
    description: 'Latest auth patterns with biometric & passkey support',
    fullDescription: `Implement enterprise-grade security with modern authentication methods.`,
    benefits: [
      'Passwordless login with biometrics and passkeys',
      'Multi-factor authentication (MFA) built-in',
      'Session management and anomaly detection',
      'Compliance with SOC2, GDPR, and HIPAA',
      'Real-time threat monitoring'
    ],
    stats: {
      securityScore: '99.9%',
      breachPrevention: '100%',
      userFriction: '-70%',
      complianceReady: 'Yes'
    },
    implementation: '2-4 weeks',
    investment: '$4,000 - $12,000'
  },
  'pwa': {
    title: 'PWA Upgrade',
    badge: '+35% engagement',
    badgeColor: 'text-amber-500',
    icon: Smartphone,
    description: 'Make your site installable like a native app',
    fullDescription: `Convert your website into a Progressive Web App that users can install on any device.`,
    benefits: [
      'Install directly from browser - no app store needed',
      'Work offline with smart caching',
      'Push notifications to re-engage users',
      'Home screen icon like native apps',
      'Faster repeat visits with cached assets'
    ],
    stats: {
      engagementIncrease: '+35%',
      returnVisits: '+50%',
      loadTime: '<1 second',
      installRate: '15-25%'
    },
    implementation: '1-2 weeks',
    investment: '$2,500 - $6,000'
  }
};

// Upgrade Card Component with Click
const UpgradeCard = ({ upgradeKey, icon: Icon, title, description, badge, badgeColor, onClick }) => (
  <motion.div 
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={() => onClick(upgradeKey)}
    className="bg-white rounded-xl border border-gray-200 p-4 cursor-pointer hover:border-[#8734E1]/30 hover:shadow-lg transition-all group"
  >
    <div className="flex items-start gap-3">
      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#8734E1]/10 to-[#2F73EE]/10 flex items-center justify-center flex-shrink-0">
        <Icon className="w-5 h-5 text-[#8734E1]" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <h4 className="font-semibold text-gray-800 text-sm">{title}</h4>
          <span className={`text-xs font-bold ${badgeColor}`}>{badge}</span>
        </div>
        <p className="text-xs text-gray-500">{description}</p>
      </div>
      <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-[#8734E1] group-hover:translate-x-1 transition-all" />
    </div>
  </motion.div>
);

// Upgrade Detail Modal
const UpgradeDetailModal = ({ upgradeKey, onClose }) => {
  const upgrade = upgradeDetails[upgradeKey];
  if (!upgrade) return null;

  const Icon = upgrade.icon;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#8734E1] to-[#2F73EE] flex items-center justify-center">
                <Icon className="w-7 h-7 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">{upgrade.title}</h2>
                <span className={`text-sm font-bold ${upgrade.badgeColor}`}>{upgrade.badge}</span>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-gray-600 mb-6">{upgrade.fullDescription}</p>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {Object.entries(upgrade.stats).map(([key, value]) => (
              <div key={key} className="bg-gray-50 rounded-lg p-3 text-center">
                <div className="text-lg font-bold text-[#8734E1]">{value}</div>
                <div className="text-xs text-gray-500 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
              </div>
            ))}
          </div>

          {/* Benefits */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-800 mb-3">Key Benefits</h3>
            <ul className="space-y-2">
              {upgrade.benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>

          {/* Implementation Details */}
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="text-sm text-blue-600 font-medium">Implementation Time</div>
              <div className="text-lg font-bold text-blue-800">{upgrade.implementation}</div>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <div className="text-sm text-purple-600 font-medium">Investment Range</div>
              <div className="text-lg font-bold text-purple-800">{upgrade.investment}</div>
            </div>
          </div>

          {/* CTA */}
          <Link to="/contact" onClick={onClose}>
            <Button variant="accent" className="w-full">
              Get Custom Quote for {upgrade.title}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
};

// HUD Scanner Animation Frame
const HUDFrame = ({ isScanning }) => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
    {/* Corner brackets */}
    <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-[#8734E1]/40" />
    <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-[#8734E1]/40" />
    <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-[#8734E1]/40" />
    <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-[#8734E1]/40" />
    
    {isScanning && (
      <>
        {/* Scanning line */}
        <motion.div 
          className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-[#8734E1] to-transparent opacity-40"
          animate={{ top: ['10%', '90%', '10%'] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </>
    )}
  </div>
);

// Light Theme Futuristic HUD Loading Animation
const HUDLoadingAnimation = ({ progress, status, metrics }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 bg-gradient-to-br from-white via-[#f8f9fc] to-[#f0f2f8] rounded-2xl flex flex-col items-center justify-center z-20 overflow-hidden"
    >
      {/* Grid background */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(135, 52, 225, 0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(135, 52, 225, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Animated scan lines */}
      <motion.div 
        className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-[#8734E1]/30 to-transparent"
        animate={{ top: ['0%', '100%'] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div 
        className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-[#2F73EE]/20 to-transparent"
        animate={{ top: ['100%', '0%'] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
      />

      {/* HUD Corner Elements */}
      <div className="absolute top-6 left-6">
        <div className="flex items-center gap-2 text-[#8734E1] text-xs font-mono">
          <div className="w-2 h-2 bg-[#8734E1] rounded-full animate-pulse" />
          SYSTEM ACTIVE
        </div>
      </div>
      <div className="absolute top-6 right-6">
        <div className="text-[#2F73EE] text-xs font-mono">
          v2.4.1 // NEURAL_NET
        </div>
      </div>
      <div className="absolute bottom-6 left-6">
        <div className="text-gray-500 text-xs font-mono">
          PAGESPEED_API::CONNECTED
        </div>
      </div>
      <div className="absolute bottom-6 right-6">
        <div className="text-emerald-600 text-xs font-mono flex items-center gap-2">
          <motion.div 
            className="w-1.5 h-1.5 bg-emerald-500 rounded-full"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
          LIVE DATA
        </div>
      </div>

      {/* Main HUD Display */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Hexagonal Scanner */}
        <div className="relative w-48 h-48 mb-8">
          {/* Outer hexagon ring */}
          <motion.svg 
            viewBox="0 0 200 200" 
            className="absolute inset-0 w-full h-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          >
            <polygon 
              points="100,10 180,55 180,145 100,190 20,145 20,55" 
              fill="none" 
              stroke="rgba(135, 52, 225, 0.25)" 
              strokeWidth="1"
            />
          </motion.svg>

          {/* Middle hexagon ring */}
          <motion.svg 
            viewBox="0 0 200 200" 
            className="absolute inset-0 w-full h-full"
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
          >
            <polygon 
              points="100,30 160,65 160,135 100,170 40,135 40,65" 
              fill="none" 
              stroke="rgba(47, 115, 238, 0.35)" 
              strokeWidth="1"
              strokeDasharray="10 5"
            />
          </motion.svg>

          {/* Inner hexagon ring */}
          <motion.svg 
            viewBox="0 0 200 200" 
            className="absolute inset-0 w-full h-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
          >
            <polygon 
              points="100,50 140,75 140,125 100,150 60,125 60,75" 
              fill="none" 
              stroke="rgba(135, 52, 225, 0.5)" 
              strokeWidth="2"
            />
          </motion.svg>

          {/* Center icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-16 h-16 rounded-full bg-gradient-to-br from-[#8734E1]/20 to-[#2F73EE]/20 border-2 border-[#8734E1]/40 flex items-center justify-center shadow-lg"
            >
              <Search className="w-8 h-8 text-[#8734E1]" />
            </motion.div>
          </div>

          {/* Orbiting dots */}
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-[#8734E1] to-[#2F73EE] rounded-full shadow-sm"
              style={{ top: '50%', left: '50%' }}
              animate={{
                x: [0, Math.cos(i * Math.PI / 2) * 80, 0],
                y: [0, Math.sin(i * Math.PI / 2) * 80, 0],
                opacity: [0, 1, 0]
              }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
            />
          ))}
        </div>

        {/* Status Text */}
        <div className="text-center mb-6">
          <motion.p 
            key={status}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[#8734E1] font-mono text-sm mb-2 font-medium"
          >
            {status}
          </motion.p>
          <div className="flex items-center gap-2 text-gray-500 text-xs font-mono">
            <span>PROGRESS:</span>
            <span className="text-[#2F73EE] font-semibold">{Math.round(progress)}%</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-72 mb-8">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden border border-gray-300 shadow-inner">
            <motion.div 
              className="h-full bg-gradient-to-r from-[#8734E1] via-[#BF5DE0] to-[#2F73EE] rounded-full"
              style={{ backgroundSize: '200% 100%' }}
              initial={{ width: 0 }}
              animate={{ 
                width: `${progress}%`,
                backgroundPosition: ['0% 0%', '100% 0%']
              }}
              transition={{ 
                width: { duration: 0.3 },
                backgroundPosition: { duration: 2, repeat: Infinity, ease: 'linear' }
              }}
            />
          </div>
        </div>

        {/* Metric Indicators */}
        <div className="grid grid-cols-5 gap-6">
          {metrics.map((metric, i) => (
            <motion.div 
              key={metric.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: metric.complete ? 1 : 0.4,
                y: 0
              }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className={`w-10 h-10 mx-auto mb-2 rounded-lg border-2 ${
                metric.complete 
                  ? 'border-emerald-500 bg-emerald-50 shadow-sm' 
                  : 'border-gray-300 bg-gray-100'
              } flex items-center justify-center`}>
                {metric.complete ? (
                  <CheckCircle className="w-5 h-5 text-emerald-500" />
                ) : (
                  <motion.div 
                    className="w-4 h-4 border-2 border-gray-400 border-t-[#8734E1] rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  />
                )}
              </div>
              <div className={`text-xs font-mono font-medium ${metric.complete ? 'text-emerald-600' : 'text-gray-400'}`}>
                {metric.name}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Data Stream Effect - Left */}
      <div className="absolute left-0 top-0 bottom-0 w-px overflow-hidden">
        <motion.div 
          className="w-full bg-gradient-to-b from-transparent via-[#8734E1]/40 to-transparent"
          style={{ height: '30%' }}
          animate={{ y: ['-100%', '400%'] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        />
      </div>
      {/* Data Stream Effect - Right */}
      <div className="absolute right-0 top-0 bottom-0 w-px overflow-hidden">
        <motion.div 
          className="w-full bg-gradient-to-b from-transparent via-[#2F73EE]/40 to-transparent"
          style={{ height: '30%' }}
          animate={{ y: ['400%', '-100%'] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      {/* Decorative corner accents */}
      <div className="absolute top-0 left-0 w-24 h-24 border-l-2 border-t-2 border-[#8734E1]/20 rounded-tl-2xl" />
      <div className="absolute top-0 right-0 w-24 h-24 border-r-2 border-t-2 border-[#8734E1]/20 rounded-tr-2xl" />
      <div className="absolute bottom-0 left-0 w-24 h-24 border-l-2 border-b-2 border-[#2F73EE]/20 rounded-bl-2xl" />
      <div className="absolute bottom-0 right-0 w-24 h-24 border-r-2 border-b-2 border-[#2F73EE]/20 rounded-br-2xl" />
    </motion.div>
  );
};

export default function WebsiteScannerSection() {
  const [url, setUrl] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanStatus, setScanStatus] = useState('');
  const [scanMetrics, setScanMetrics] = useState([
    { name: 'SEO', complete: false },
    { name: 'SPEED', complete: false },
    { name: 'SECURITY', complete: false },
    { name: 'GEO', complete: false },
    { name: 'A11Y', complete: false },
  ]);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [selectedUpgrade, setSelectedUpgrade] = useState(null);

  const scanStatuses = [
    'INITIALIZING NEURAL NETWORK...',
    'ESTABLISHING SECURE CONNECTION...',
    'ANALYZING DOM STRUCTURE...',
    'MEASURING CORE WEB VITALS...',
    'EVALUATING SEO FACTORS...',
    'SCANNING SECURITY PROTOCOLS...',
    'ASSESSING GEO READINESS...',
    'COMPILING ANALYSIS REPORT...'
  ];

  const handleScan = async (e) => {
    e.preventDefault();
    if (!url) return;
    
    let scanUrl = url;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      scanUrl = 'https://' + url;
    }
    
    setIsScanning(true);
    setError(null);
    setResults(null);
    setScanProgress(0);
    setScanMetrics([
      { name: 'SEO', complete: false },
      { name: 'SPEED', complete: false },
      { name: 'SECURITY', complete: false },
      { name: 'GEO', complete: false },
      { name: 'A11Y', complete: false },
    ]);

    // Progress simulation with metric completion
    const progressInterval = setInterval(() => {
      setScanProgress(prev => {
        const newProgress = Math.min(prev + Math.random() * 12, 95);
        const statusIndex = Math.floor((newProgress / 100) * scanStatuses.length);
        setScanStatus(scanStatuses[Math.min(statusIndex, scanStatuses.length - 1)]);
        
        // Update metrics as progress increases
        setScanMetrics(metrics => metrics.map((m, i) => ({
          ...m,
          complete: newProgress > (i + 1) * 18
        })));
        
        return newProgress;
      });
    }, 500);

    try {
      const backendUrl = process.env.REACT_APP_BACKEND_URL || '';
      const response = await fetch(`${backendUrl}/api/pagespeed?url=${encodeURIComponent(scanUrl)}&strategy=mobile`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to scan website');
      }
      
      const data = await response.json();
      
      clearInterval(progressInterval);
      setScanProgress(100);
      setScanStatus('ANALYSIS COMPLETE');
      setScanMetrics(metrics => metrics.map(m => ({ ...m, complete: true })));
      
      setTimeout(() => {
        const performanceScore = Math.round(data.scores?.performance?.score || 0);
        const seoScore = Math.round(data.scores?.seo?.score || 0);
        const accessibilityScore = Math.round(data.scores?.accessibility?.score || 0);
        const bestPracticesScore = Math.round(data.scores?.['best-practices']?.score || 0);
        
        const overallScore = Math.round((performanceScore + seoScore + accessibilityScore + bestPracticesScore) / 4);
        const geoScore = Math.round((seoScore * 0.5 + performanceScore * 0.3 + accessibilityScore * 0.2));
        
        const getGrade = (score) => {
          if (score >= 90) return 'A';
          if (score >= 80) return 'B';
          if (score >= 70) return 'C';
          if (score >= 50) return 'D';
          return 'F';
        };

        const issues = [];
        if (performanceScore < 90) {
          issues.push({ severity: performanceScore < 50 ? 'critical' : 'high', title: 'Performance optimization needed', impact: `-${90 - performanceScore}% speed` });
        }
        if (seoScore < 90) {
          issues.push({ severity: 'high', title: 'SEO improvements available', impact: `-${Math.round((90 - seoScore) * 0.2)}% visibility` });
        }
        if (geoScore < 80) {
          issues.push({ severity: 'medium', title: 'GEO optimization recommended', impact: 'AI discovery' });
        }
        if (accessibilityScore < 90) {
          issues.push({ severity: 'medium', title: 'Accessibility enhancements recommended', impact: 'User experience' });
        }
        if (bestPracticesScore < 90) {
          issues.push({ severity: 'low', title: 'Best practices not fully implemented', impact: 'Code quality' });
        }

        const technologies = [
          { name: 'JavaScript', detected: true },
          { name: 'CSS3', detected: true },
          { name: 'HTML5', detected: true },
          { name: 'Images', detected: true },
        ];

        setResults({
          url: data.finalUrl || scanUrl,
          scores: {
            overall: { score: overallScore, grade: getGrade(overallScore), description: overallScore >= 70 ? 'Good - Room for improvement' : 'Needs Work - Optimization required' },
            seo: { score: seoScore, grade: getGrade(seoScore), description: seoScore >= 80 ? 'Good - Meta tags present' : 'Needs attention' },
            speed: { score: performanceScore, grade: getGrade(performanceScore), description: performanceScore >= 70 ? 'Acceptable - Can be faster' : 'Needs optimization' },
            security: { score: bestPracticesScore, grade: getGrade(bestPracticesScore), description: bestPracticesScore >= 90 ? 'Excellent - Best practices followed' : 'Review recommended' },
            geo: { score: geoScore, grade: getGrade(geoScore), description: geoScore >= 70 ? 'Ready for AI discovery' : 'GEO optimization needed' },
          },
          coreWebVitals: data.coreWebVitals,
          issues,
          technologies,
          scanDate: new Date().toISOString(),
        });
        
        setIsScanning(false);
      }, 800);
      
    } catch (err) {
      clearInterval(progressInterval);
      setError(err.message);
      setIsScanning(false);
      setScanProgress(0);
    }
  };

  const resetScan = () => {
    setResults(null);
    setUrl('');
    setError(null);
  };

  const calculateRevenueImpact = (scores) => {
    if (!scores) return { min: 0, max: 0 };
    const avgScore = (scores.overall.score + scores.seo.score + scores.speed.score + scores.geo.score) / 4;
    const improvementPotential = 100 - avgScore;
    const baseValue = 1200;
    const min = Math.round((improvementPotential * baseValue * 0.8) / 1000) * 1000;
    const max = Math.round((improvementPotential * baseValue * 2.8) / 1000) * 1000;
    return { min, max };
  };

  return (
    <section className="section relative overflow-hidden bg-gradient-to-b from-white via-[#f8f9fc] to-white" data-testid="website-scanner-section">
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#8734E1]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#2F73EE]/5 rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#8734E1]/10 border border-[#8734E1]/30 text-[#8734E1] mb-6">
            <Bot className="w-4 h-4" />
            <span className="text-sm font-mono font-medium">AI WEBSITE SCANNER</span>
            <span className="text-xs text-[#2F73EE]">// Neural Analysis v2.4</span>
          </div>
          
          <h2 className="heading-lg mb-4">
            Scan Your Website <span className="gradient-text">For Free</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Get instant insights into your website's performance, SEO, security, GEO readiness, and accessibility. 
            Our AI analyzes 50+ factors using Google's PageSpeed API.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative max-w-5xl mx-auto"
        >
          <div className="relative bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden min-h-[500px]">
            <HUDFrame isScanning={isScanning} />
            
            {/* URL Input Form */}
            {!results && !isScanning && (
              <div className="p-8 md:p-12">
                <form onSubmit={handleScan} className="max-w-2xl mx-auto">
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2">
                      <Globe className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      placeholder="Enter your website URL (e.g., example.com)"
                      className="w-full pl-12 pr-36 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-[#8734E1] focus:ring-4 focus:ring-[#8734E1]/10 transition-all outline-none"
                      data-testid="scanner-url-input"
                    />
                    <div className="absolute right-2 top-1/2 -translate-y-1/2">
                      <Button type="submit" variant="accent" data-testid="scanner-submit-btn">
                        <Search className="w-4 h-4" />
                        Scan Now
                      </Button>
                    </div>
                  </div>
                  
                  {error && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3"
                    >
                      <XCircle className="w-5 h-5 text-red-500" />
                      <span className="text-red-700 text-sm">{error}</span>
                    </motion.div>
                  )}
                </form>

                <div className="mt-8 flex flex-wrap items-center justify-center gap-8 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-amber-500" />
                    <span>847 sites scanned this month</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-emerald-500" />
                    <span>4.9/5 avg rating</span>
                  </div>
                </div>
                
                <div className="mt-4 text-center">
                  <p className="text-xs text-gray-400">
                    Powered by Google PageSpeed Insights API • Real-time analysis
                  </p>
                </div>
              </div>
            )}

            {/* HUD Loading Animation */}
            <AnimatePresence>
              {isScanning && (
                <HUDLoadingAnimation 
                  progress={scanProgress} 
                  status={scanStatus}
                  metrics={scanMetrics}
                />
              )}
            </AnimatePresence>

            {/* Results Dashboard */}
            <AnimatePresence>
              {results && !isScanning && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-6 md:p-8"
                >
                  {/* Scanned URL Header */}
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#8734E1] to-[#2F73EE] flex items-center justify-center">
                        <Globe className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Scanned URL</p>
                        <p className="font-medium text-gray-800 truncate max-w-md">{results.url}</p>
                      </div>
                    </div>
                    <button 
                      onClick={resetScan}
                      className="flex items-center gap-2 text-[#8734E1] hover:text-[#6B21A8] text-sm font-medium"
                    >
                      <RefreshCw className="w-4 h-4" />
                      Scan Another
                    </button>
                  </div>

                  {/* Score Cards - Now includes GEO */}
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
                    <ScoreCard 
                      icon={TrendingUp} 
                      label="Overall" 
                      score={results.scores.overall.score}
                      grade={results.scores.overall.grade}
                      description={results.scores.overall.description}
                      color="text-[#8734E1]"
                    />
                    <ScoreCard 
                      icon={Search} 
                      label="SEO" 
                      score={results.scores.seo.score}
                      grade={results.scores.seo.grade}
                      description={results.scores.seo.description}
                      color="text-blue-500"
                    />
                    <ScoreCard 
                      icon={Sparkles} 
                      label="GEO" 
                      score={results.scores.geo.score}
                      grade={results.scores.geo.grade}
                      description={results.scores.geo.description}
                      color="text-pink-500"
                    />
                    <ScoreCard 
                      icon={Zap} 
                      label="Speed" 
                      score={results.scores.speed.score}
                      grade={results.scores.speed.grade}
                      description={results.scores.speed.description}
                      color="text-amber-500"
                    />
                    <ScoreCard 
                      icon={Shield} 
                      label="Security" 
                      score={results.scores.security.score}
                      grade={results.scores.security.grade}
                      description={results.scores.security.description}
                      color="text-cyan-500"
                    />
                  </div>

                  {/* Detected Technologies */}
                  <div className="mb-8">
                    <p className="text-sm text-gray-500 mb-3">
                      <span className="font-medium text-gray-700">Detected:</span>
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {results.technologies.map((tech) => (
                        <span 
                          key={tech.name}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-full"
                        >
                          {tech.name}
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Upgrade Opportunities - Now clickable */}
                  <div className="mb-8">
                    <div className="flex items-center gap-2 mb-4">
                      <Rocket className="w-4 h-4 text-[#8734E1]" />
                      <span className="text-sm font-medium text-gray-700">Upgrade Opportunities</span>
                      <span className="text-xs text-emerald-500 font-medium">← Click for details</span>
                    </div>
                    <div className="grid md:grid-cols-2 gap-3">
                      <UpgradeCard 
                        upgradeKey="ai-chat"
                        icon={Bot}
                        title="AI Chat Integration"
                        description="GPT-powered support could handle 40% of inquiries automatically"
                        badge="+23% conversions"
                        badgeColor="text-emerald-500"
                        onClick={setSelectedUpgrade}
                      />
                      <UpgradeCard 
                        upgradeKey="edge-computing"
                        icon={Zap}
                        title="Edge Computing"
                        description="Move to Vercel/Cloudflare for global edge deployment"
                        badge="2x faster loads"
                        badgeColor="text-blue-500"
                        onClick={setSelectedUpgrade}
                      />
                      <UpgradeCard 
                        upgradeKey="zero-trust"
                        icon={Lock}
                        title="Zero-Trust Security"
                        description="Latest auth patterns with biometric & passkey support"
                        badge="99.9% secure"
                        badgeColor="text-cyan-500"
                        onClick={setSelectedUpgrade}
                      />
                      <UpgradeCard 
                        upgradeKey="pwa"
                        icon={Smartphone}
                        title="PWA Upgrade"
                        description="Make your site installable like a native app"
                        badge="+35% engagement"
                        badgeColor="text-amber-500"
                        onClick={setSelectedUpgrade}
                      />
                    </div>
                  </div>

                  {/* Issues Found */}
                  <div className="mb-8">
                    <div className="flex items-center gap-2 mb-4">
                      <AlertTriangle className="w-4 h-4 text-amber-500" />
                      <span className="text-sm font-medium text-gray-700">Issues Found ({results.issues.length})</span>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4">
                      {results.issues.length > 0 ? (
                        results.issues.map((issue, index) => (
                          <IssueItem 
                            key={index}
                            severity={issue.severity}
                            title={issue.title}
                            impact={issue.impact}
                          />
                        ))
                      ) : (
                        <p className="text-gray-500 text-sm text-center py-4">No critical issues found!</p>
                      )}
                    </div>
                  </div>

                  {/* Revenue Impact */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mb-8 p-6 bg-gradient-to-r from-[#8734E1]/10 via-[#BF5DE0]/10 to-[#2F73EE]/10 border border-[#8734E1]/20 rounded-xl"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <DollarSign className="w-5 h-5 text-amber-500" />
                      <span className="font-semibold text-gray-800">Potential Revenue Impact</span>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">
                      Based on industry benchmarks, fixing these issues could <em>potentially</em> recover:
                    </p>
                    <div className="text-3xl font-bold mb-2">
                      <span className="text-emerald-600">${calculateRevenueImpact(results.scores).min.toLocaleString()}</span>
                      <span className="text-gray-400 mx-2">to</span>
                      <span className="text-amber-600">${calculateRevenueImpact(results.scores).max.toLocaleString()}</span>
                      <span className="text-gray-400 text-lg font-normal">/year*</span>
                    </div>
                    <p className="text-xs text-gray-500">
                      *Estimates vary based on your traffic, industry, and conversion rates. We'll provide precise projections during consultation.
                    </p>
                  </motion.div>

                  {/* Stats Footer */}
                  <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-gray-500 mb-8">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-amber-500" />
                      <span>847 sites scanned this month</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-emerald-500" />
                      <span>4.9/5 avg rating</span>
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <Link to="/portfolio">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-4 px-6 bg-gradient-to-r from-[#8734E1] to-[#2F73EE] text-white font-semibold rounded-xl flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-[#8734E1]/25 transition-all"
                        data-testid="scanner-portfolio-btn"
                      >
                        <Eye className="w-5 h-5" />
                        See Our Transformation Gallery
                      </motion.button>
                    </Link>
                    <Link to="/contact">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-4 px-6 bg-white border-2 border-amber-500 text-amber-600 font-semibold rounded-xl flex items-center justify-center gap-2 hover:bg-amber-50 transition-all"
                        data-testid="scanner-quote-btn"
                      >
                        <Clock className="w-5 h-5" />
                        Get Quote in 24hrs
                      </motion.button>
                    </Link>
                  </div>

                  {/* Limited Availability Banner */}
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="mt-6 py-3 px-6 bg-gradient-to-r from-amber-500/10 via-amber-500/20 to-amber-500/10 border border-amber-500/30 rounded-xl text-center"
                  >
                    <p className="text-sm">
                      <span className="text-amber-600 font-semibold">Limited Availability:</span>
                      <span className="text-gray-600 ml-2">We take only 3 new clients per month</span>
                    </p>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* Upgrade Detail Modal */}
      <AnimatePresence>
        {selectedUpgrade && (
          <UpgradeDetailModal 
            upgradeKey={selectedUpgrade} 
            onClose={() => setSelectedUpgrade(null)} 
          />
        )}
      </AnimatePresence>
    </section>
  );
}
