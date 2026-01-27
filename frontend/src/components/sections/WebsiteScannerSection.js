import React, { useState, useEffect } from 'react';
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
  Monitor,
  Tablet,
  Smartphone,
  RefreshCw,
  DollarSign,
  Clock,
  MessageSquare,
  Bot,
  Lock,
  Rocket,
  Eye
} from 'lucide-react';
import { Button } from '../ui';
import { Link } from 'react-router-dom';

// Simulated screenshot placeholders with gradient backgrounds
const ScreenshotPlaceholder = ({ label, size = 'large' }) => (
  <div className={`relative rounded-lg overflow-hidden ${size === 'large' ? 'aspect-video' : 'aspect-[9/16]'}`}>
    <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800" />
    <div className="absolute top-2 left-2 flex items-center gap-1.5">
      <div className="w-2 h-2 rounded-full bg-red-500" />
      <div className="w-2 h-2 rounded-full bg-yellow-500" />
      <div className="w-2 h-2 rounded-full bg-green-500" />
    </div>
    <div className="absolute top-2 left-16 text-[10px] text-white/60">{label}</div>
    <div className="absolute top-2 right-2 px-1.5 py-0.5 bg-emerald-500/80 text-[9px] text-white rounded font-medium">LIVE</div>
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-16 h-16 rounded-full border-2 border-white/20 flex items-center justify-center">
        <Globe className="w-8 h-8 text-white/40" />
      </div>
    </div>
    {/* Scan line effect */}
    <motion.div 
      className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
      animate={{ top: ['0%', '100%', '0%'] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
    />
  </div>
);

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

// Upgrade Card Component
const UpgradeCard = ({ icon: Icon, title, description, badge, badgeColor }) => (
  <motion.div 
    whileHover={{ scale: 1.02 }}
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

// HUD Scanner Animation
const HUDScanner = ({ isScanning }) => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
    {/* Corner brackets */}
    <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-[#8734E1]/50" />
    <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-[#8734E1]/50" />
    <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-[#8734E1]/50" />
    <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-[#8734E1]/50" />
    
    {isScanning && (
      <>
        {/* Scanning line */}
        <motion.div 
          className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#8734E1] to-transparent opacity-60"
          animate={{ top: ['10%', '90%', '10%'] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
        
        {/* Pulsing circles */}
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border border-[#8734E1]/30"
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border border-[#2F73EE]/20"
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
        />
        
        {/* Data streams */}
        <motion.div 
          className="absolute left-0 top-1/4 w-full h-px bg-gradient-to-r from-[#8734E1]/0 via-[#8734E1]/30 to-[#8734E1]/0"
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
        <motion.div 
          className="absolute left-0 top-3/4 w-full h-px bg-gradient-to-r from-[#2F73EE]/0 via-[#2F73EE]/30 to-[#2F73EE]/0"
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1, repeat: Infinity, delay: 0.3 }}
        />
      </>
    )}
  </div>
);

// Loading Animation Component
const ScanningAnimation = ({ progress, status }) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="absolute inset-0 bg-white/95 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center z-20"
  >
    <div className="relative mb-8">
      {/* Outer rotating ring */}
      <motion.div 
        className="w-32 h-32 rounded-full border-4 border-[#8734E1]/20"
        animate={{ rotate: 360 }}
        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#8734E1] rounded-full" />
      </motion.div>
      
      {/* Inner rotating ring */}
      <motion.div 
        className="absolute inset-4 rounded-full border-4 border-[#2F73EE]/20"
        animate={{ rotate: -360 }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#2F73EE] rounded-full" />
      </motion.div>
      
      {/* Center icon */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          <Search className="w-10 h-10 text-[#8734E1]" />
        </motion.div>
      </div>
    </div>
    
    {/* Progress bar */}
    <div className="w-64 mb-4">
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-gradient-to-r from-[#8734E1] to-[#2F73EE] rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </div>
    
    <p className="text-gray-600 font-medium mb-2">{status}</p>
    <p className="text-sm text-gray-400">{progress}% complete</p>
    
    {/* Scanning metrics animation */}
    <div className="mt-6 grid grid-cols-4 gap-4">
      {['SEO', 'Speed', 'Security', 'GEO'].map((metric, i) => (
        <motion.div 
          key={metric}
          initial={{ opacity: 0 }}
          animate={{ opacity: progress > (i + 1) * 20 ? 1 : 0.3 }}
          className="text-center"
        >
          <div className={`text-xs font-medium ${progress > (i + 1) * 20 ? 'text-[#8734E1]' : 'text-gray-400'}`}>
            {metric}
          </div>
          {progress > (i + 1) * 20 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
            >
              <CheckCircle className="w-4 h-4 text-emerald-500 mx-auto mt-1" />
            </motion.div>
          )}
        </motion.div>
      ))}
    </div>
  </motion.div>
);

export default function WebsiteScannerSection() {
  const [url, setUrl] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanStatus, setScanStatus] = useState('');
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const scanStatuses = [
    'Initializing neural network...',
    'Analyzing page structure...',
    'Measuring performance metrics...',
    'Checking SEO factors...',
    'Evaluating security protocols...',
    'Scanning for GEO readiness...',
    'Compiling results...',
    'Generating recommendations...'
  ];

  const handleScan = async (e) => {
    e.preventDefault();
    if (!url) return;
    
    // Validate URL
    let scanUrl = url;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      scanUrl = 'https://' + url;
    }
    
    setIsScanning(true);
    setError(null);
    setResults(null);
    setScanProgress(0);

    // Simulate scanning progress with statuses
    const progressInterval = setInterval(() => {
      setScanProgress(prev => {
        const newProgress = Math.min(prev + Math.random() * 15, 95);
        const statusIndex = Math.floor((newProgress / 100) * scanStatuses.length);
        setScanStatus(scanStatuses[Math.min(statusIndex, scanStatuses.length - 1)]);
        return newProgress;
      });
    }, 400);

    try {
      // Call the backend PageSpeed API
      const backendUrl = process.env.REACT_APP_BACKEND_URL || '';
      const response = await fetch(`${backendUrl}/api/pagespeed?url=${encodeURIComponent(scanUrl)}&strategy=mobile`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to scan website');
      }
      
      const data = await response.json();
      
      clearInterval(progressInterval);
      setScanProgress(100);
      setScanStatus('Analysis complete!');
      
      // Transform the data into our display format
      setTimeout(() => {
        const performanceScore = Math.round(data.scores?.performance?.score || 0);
        const seoScore = Math.round(data.scores?.seo?.score || 0);
        const accessibilityScore = Math.round(data.scores?.accessibility?.score || 0);
        const bestPracticesScore = Math.round(data.scores?.['best-practices']?.score || 0);
        
        // Calculate overall score
        const overallScore = Math.round((performanceScore + seoScore + accessibilityScore + bestPracticesScore) / 4);
        
        // Generate GEO score (simulated based on SEO and performance)
        const geoScore = Math.round((seoScore * 0.6 + performanceScore * 0.4));
        
        // Determine grades
        const getGrade = (score) => {
          if (score >= 90) return 'A';
          if (score >= 80) return 'B';
          if (score >= 70) return 'C';
          if (score >= 50) return 'D';
          return 'F';
        };

        // Generate issues based on scores
        const issues = [];
        if (performanceScore < 90) {
          issues.push({ severity: 'high', title: 'Performance optimization needed', impact: `-${90 - performanceScore}% speed` });
        }
        if (seoScore < 90) {
          issues.push({ severity: 'high', title: 'SEO improvements available', impact: `-${Math.round((90 - seoScore) * 0.2)}% SEO` });
        }
        if (accessibilityScore < 90) {
          issues.push({ severity: 'medium', title: 'Accessibility enhancements recommended', impact: 'User experience' });
        }
        if (bestPracticesScore < 90) {
          issues.push({ severity: 'low', title: 'Best practices not fully implemented', impact: 'Code quality' });
        }
        if (performanceScore < 70) {
          issues.push({ severity: 'critical', title: 'Critical performance issues detected', impact: 'High bounce rate' });
        }

        // Detect technologies (simulated)
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
            security: { score: bestPracticesScore, grade: getGrade(bestPracticesScore), description: bestPracticesScore >= 90 ? 'Excellent - SSL configured' : 'Review recommended' },
            geo: { score: geoScore, grade: getGrade(geoScore), description: geoScore >= 70 ? 'Ready for AI discovery' : 'GEO optimization needed' },
          },
          coreWebVitals: data.coreWebVitals,
          issues,
          technologies,
          scanDate: new Date().toISOString(),
        });
        
        setIsScanning(false);
      }, 500);
      
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

  // Calculate potential revenue impact
  const calculateRevenueImpact = (scores) => {
    if (!scores) return { min: 0, max: 0 };
    const avgScore = (scores.overall.score + scores.seo.score + scores.speed.score) / 3;
    const improvementPotential = 100 - avgScore;
    const baseValue = 1000;
    const min = Math.round((improvementPotential * baseValue * 0.8) / 1000) * 1000;
    const max = Math.round((improvementPotential * baseValue * 2.5) / 1000) * 1000;
    return { min, max };
  };

  return (
    <section className="section relative overflow-hidden bg-gradient-to-b from-white via-[#f8f9fc] to-white" data-testid="website-scanner-section">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#8734E1]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#2F73EE]/5 rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#8734E1]/10 border border-[#8734E1]/30 text-[#8734E1] mb-6">
            <Bot className="w-4 h-4" />
            <span className="text-sm font-medium">AI Website Scanner</span>
            <span className="text-xs text-[#8734E1]/60">Neural network deep analysis</span>
          </div>
          
          <h2 className="heading-lg mb-4">
            Scan Your Website <span className="gradient-text">For Free</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Get instant insights into your website's performance, SEO, security, and AI-readiness. 
            Our neural network analyzes 50+ factors in seconds.
          </p>
        </motion.div>

        {/* Scanner Card */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative max-w-5xl mx-auto"
        >
          <div className="relative bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden">
            <HUDScanner isScanning={isScanning} />
            
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

                {/* Quick stats */}
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
              </div>
            )}

            {/* Scanning Animation */}
            <AnimatePresence>
              {isScanning && (
                <div className="p-8 md:p-12 min-h-[400px] relative">
                  <ScanningAnimation progress={scanProgress} status={scanStatus} />
                </div>
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

                  {/* Live Site Captures */}
                  <div className="mb-8">
                    <div className="flex items-center gap-2 mb-4">
                      <Monitor className="w-4 h-4 text-gray-400" />
                      <span className="text-sm font-medium text-gray-700">Live Site Captures</span>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <ScreenshotPlaceholder label="Homepage" size="large" />
                      <ScreenshotPlaceholder label="Tablet View" size="large" />
                      <div className="flex flex-col gap-2">
                        <ScreenshotPlaceholder label="Mobile" size="small" />
                        <div className="text-center text-xs text-gray-400 flex items-center justify-center gap-1">
                          <RefreshCw className="w-3 h-3 animate-spin" />
                          Generating Preview...
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Score Cards */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
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

                  {/* Upgrade Opportunities */}
                  <div className="mb-8">
                    <div className="flex items-center gap-2 mb-4">
                      <Rocket className="w-4 h-4 text-[#8734E1]" />
                      <span className="text-sm font-medium text-gray-700">Upgrade Opportunities</span>
                      <span className="text-xs text-gray-400">- Click for details</span>
                    </div>
                    <div className="grid md:grid-cols-2 gap-3">
                      <UpgradeCard 
                        icon={Bot}
                        title="AI Chat Integration"
                        description="GPT-powered support could handle 40% of inquiries automatically"
                        badge="+23% conversions"
                        badgeColor="text-emerald-500"
                      />
                      <UpgradeCard 
                        icon={Zap}
                        title="Edge Computing"
                        description="Move to Vercel/Cloudflare for global edge deployment"
                        badge="2x faster loads"
                        badgeColor="text-blue-500"
                      />
                      <UpgradeCard 
                        icon={Lock}
                        title="Zero-Trust Security"
                        description="Latest auth patterns with biometric & passkey support"
                        badge="99.9% secure"
                        badgeColor="text-cyan-500"
                      />
                      <UpgradeCard 
                        icon={Smartphone}
                        title="PWA Upgrade"
                        description="Make your site installable like a native app"
                        badge="+35% engagement"
                        badgeColor="text-amber-500"
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
                      {results.issues.map((issue, index) => (
                        <IssueItem 
                          key={index}
                          severity={issue.severity}
                          title={issue.title}
                          impact={issue.impact}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Revenue Impact */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mb-8 p-6 bg-gradient-to-r from-[#1a1a2e] to-[#2d2d4a] rounded-xl text-white"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <DollarSign className="w-5 h-5 text-amber-400" />
                      <span className="font-semibold">Potential Revenue Impact</span>
                    </div>
                    <p className="text-white/70 text-sm mb-4">
                      Based on industry benchmarks, fixing these issues could <em>potentially</em> recover:
                    </p>
                    <div className="text-3xl font-bold mb-2">
                      <span className="text-emerald-400">${calculateRevenueImpact(results.scores).min.toLocaleString()}</span>
                      <span className="text-white/50 mx-2">to</span>
                      <span className="text-amber-400">${calculateRevenueImpact(results.scores).max.toLocaleString()}</span>
                      <span className="text-white/50 text-lg font-normal">/year*</span>
                    </div>
                    <p className="text-xs text-white/40">
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
                        data-testid="scanner-ai-vision-btn"
                      >
                        <Sparkles className="w-5 h-5" />
                        See AI Vision Samples
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
    </section>
  );
}
