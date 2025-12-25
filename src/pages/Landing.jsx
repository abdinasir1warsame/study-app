import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Brain,
  FileText,
  MessageSquare,
  Video,
  Check,
  Upload,
  ArrowRight,
  Sparkles,
  Zap,
  Shield,
} from 'lucide-react';

function Landing() {
  const [inputType, setInputType] = useState('text');
  const [textContent, setTextContent] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const features = [
    {
      icon: <FileText className="w-6 h-6" />,
      title: 'Smart Summaries',
      description:
        'Get structured, bullet-point summaries from your study materials instantly',
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: 'Interview Questions',
      description:
        'AI-generated questions tailored to your content for effective preparation',
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: 'Turn-Based Practice',
      description:
        'Interactive interview mode with instant feedback on your answers',
    },
    {
      icon: <Video className="w-6 h-6" />,
      title: 'Video Upload',
      description:
        'Upload MP4 videos and get automatic transcription and analysis',
    },
  ];

  const stats = [
    { number: '10K+', label: 'Study Sessions' },
    { number: '98%', label: 'Success Rate' },
    { number: '50+', label: 'Topics Covered' },
  ];

  const pricingPlans = [
    {
      name: 'Free',
      price: '$0',
      features: [
        '5 sessions per month',
        'Basic summaries',
        '10 questions per session',
        'Text input only',
      ],
    },
    {
      name: 'Pro',
      price: '$19',
      popular: true,
      features: [
        'Unlimited sessions',
        'Advanced summaries',
        'Unlimited questions',
        'Video upload',
        'Priority support',
      ],
    },
    {
      name: 'Enterprise',
      price: '$49',
      features: [
        'Everything in Pro',
        'Team collaboration',
        'Custom integrations',
        'Dedicated support',
        'API access',
      ],
    },
  ];

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'video/mp4') {
      setVideoFile(file);
    }
  };

  const handleGenerate = () => {
    if (
      (inputType === 'text' && textContent.trim()) ||
      (inputType === 'video' && videoFile)
    ) {
      setIsProcessing(true);
      // Simulate processing
      setTimeout(() => {
        const session = {
          id: Date.now(),
          date: new Date().toISOString(),
          type: inputType,
          content: inputType === 'text' ? textContent : videoFile.name,
          summary: {
            bulletPoints: [
              'React is a JavaScript library for building user interfaces',
              'Components are the building blocks of React applications',
              'State management allows components to be dynamic and interactive',
              'Hooks like useState and useEffect enable functional components to have state',
              'Virtual DOM improves performance by minimizing direct DOM manipulation',
            ],
            paragraph:
              'React is a powerful JavaScript library developed by Facebook for creating interactive user interfaces. It follows a component-based architecture where each component manages its own state and can be reused throughout the application.',
          },
          questions: [
            {
              question: 'What is React and what problem does it solve?',
              answer: '',
              feedback: '',
            },
            {
              question:
                'Explain the difference between state and props in React.',
              answer: '',
              feedback: '',
            },
            {
              question: 'How do React hooks improve functional components?',
              answer: '',
              feedback: '',
            },
          ],
        };
        const sessions = JSON.parse(
          localStorage.getItem('learnmate_sessions') || '[]'
        );
        sessions.push(session);
        localStorage.setItem('learnmate_sessions', JSON.stringify(sessions));
        setIsProcessing(false);
        window.location.href = '/app';
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0f] via-[#0f0f1a] to-[#0a0a0f]">
      {/* Navbar */}
      <nav className="border-b border-white/5 bg-[#0a0a0f]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-gradient-to-br from-[#6366f1] via-[#8b5cf6] to-[#d946ef] rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="text-white text-xl font-bold">LearnMate</span>
            </div>
            <div className="flex items-center gap-6">
              <a
                href="#features"
                className="text-gray-400 hover:text-white transition-colors cursor-pointer hidden sm:block"
              >
                Features
              </a>
              <a
                href="#pricing"
                className="text-gray-400 hover:text-white transition-colors cursor-pointer hidden sm:block"
              >
                Pricing
              </a>
              <Link
                to="/history"
                className="text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                History
              </Link>
              <Link
                to="/app"
                className="px-5 py-2 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] hover:from-[#5558e3] hover:to-[#7c3aed] text-white rounded-lg font-medium transition-all shadow-lg shadow-purple-500/25 cursor-pointer"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with Upload */}
      <section className="px-4 pt-20 pb-16 sm:pt-32 sm:pb-24 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Hero Text */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-purple-300 text-sm font-medium">
                AI-Powered Learning Platform
              </span>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Master Your Interviews
              <br />
              <span className="bg-gradient-to-r from-[#6366f1] via-[#8b5cf6] to-[#d946ef] bg-clip-text text-transparent">
                With AI-Powered Prep
              </span>
            </h1>
            <p className="text-xl text-gray-400 mb-8 max-w-3xl mx-auto leading-relaxed">
              Transform your study materials into structured summaries and
              personalized interview questions. Upload text or video and let AI
              do the heavy lifting.
            </p>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mb-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-white mb-1">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Upload Section */}
          <div className="max-w-3xl mx-auto">
            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
              {/* Input Type Toggle */}
              <div className="flex gap-3 mb-6">
                <button
                  onClick={() => setInputType('text')}
                  className={`flex-1 py-4 rounded-xl font-medium transition-all cursor-pointer ${
                    inputType === 'text'
                      ? 'bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white shadow-lg shadow-purple-500/25'
                      : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10'
                  }`}
                >
                  <FileText className="w-5 h-5 inline mr-2" />
                  Paste Text
                </button>
                <button
                  onClick={() => setInputType('video')}
                  className={`flex-1 py-4 rounded-xl font-medium transition-all cursor-pointer ${
                    inputType === 'video'
                      ? 'bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white shadow-lg shadow-purple-500/25'
                      : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10'
                  }`}
                >
                  <Video className="w-5 h-5 inline mr-2" />
                  Upload Video
                </button>
              </div>

              {/* Text Input */}
              {inputType === 'text' && (
                <div>
                  <textarea
                    value={textContent}
                    onChange={(e) => setTextContent(e.target.value)}
                    placeholder="Paste your study notes, lecture transcripts, or any learning material here..."
                    className="w-full h-48 p-5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 resize-none transition-all"
                  />
                </div>
              )}

              {/* Video Upload */}
              {inputType === 'video' && (
                <div>
                  <div className="border-2 border-dashed border-white/20 rounded-xl p-16 text-center hover:border-purple-500/50 transition-all cursor-pointer bg-white/[0.02]">
                    <input
                      type="file"
                      accept="video/mp4"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="video-upload-hero"
                    />
                    <label
                      htmlFor="video-upload-hero"
                      className="cursor-pointer"
                    >
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Upload className="w-8 h-8 text-purple-400" />
                      </div>
                      <p className="text-white font-medium mb-2">
                        {videoFile
                          ? videoFile.name
                          : 'Click to upload or drag and drop'}
                      </p>
                      <p className="text-gray-500 text-sm">
                        MP4 files • Max 500MB
                      </p>
                    </label>
                  </div>
                </div>
              )}

              <button
                onClick={handleGenerate}
                disabled={
                  isProcessing ||
                  (inputType === 'text' ? !textContent.trim() : !videoFile)
                }
                className="w-full mt-6 py-5 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] hover:from-[#5558e3] hover:to-[#7c3aed] disabled:from-gray-700 disabled:to-gray-700 disabled:cursor-not-allowed text-white rounded-xl font-semibold transition-all shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 cursor-pointer flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5" />
                    Generate Summary & Questions
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>

              {/* Trust Indicators */}
              <div className="flex items-center justify-center gap-6 mt-6 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-green-400" />
                  <span>Secure & Private</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-yellow-400" />
                  <span>Instant Results</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="px-4 py-24 bg-gradient-to-b from-transparent to-[#0d0d14]/50"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-gray-400">
              Powerful features designed for effective learning
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl hover:border-purple-500/50 transition-all group cursor-pointer"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-xl flex items-center justify-center text-purple-400 mb-4 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-4 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-400">
              Get started in three simple steps
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] rounded-2xl flex items-center justify-center text-white text-3xl font-bold mx-auto shadow-xl shadow-purple-500/30 group-hover:scale-110 transition-transform">
                  1
                </div>
                <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl -z-10 -translate-x-1/2 -translate-y-1/2"></div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Upload Content
              </h3>
              <p className="text-gray-400">
                Paste your notes or upload a video file
              </p>
            </div>
            <div className="text-center group">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] rounded-2xl flex items-center justify-center text-white text-3xl font-bold mx-auto shadow-xl shadow-purple-500/30 group-hover:scale-110 transition-transform">
                  2
                </div>
                <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl -z-10 -translate-x-1/2 -translate-y-1/2"></div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                AI Processing
              </h3>
              <p className="text-gray-400">
                AI generates structured summaries and questions
              </p>
            </div>
            <div className="text-center group">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] rounded-2xl flex items-center justify-center text-white text-3xl font-bold mx-auto shadow-xl shadow-purple-500/30 group-hover:scale-110 transition-transform">
                  3
                </div>
                <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl -z-10 -translate-x-1/2 -translate-y-1/2"></div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Practice & Excel
              </h3>
              <p className="text-gray-400">
                Answer questions and get instant feedback
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section
        id="pricing"
        className="px-4 py-24 bg-gradient-to-b from-[#0d0d14]/50 to-transparent"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-400">
              Choose the plan that works for you
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className={`p-8 rounded-2xl backdrop-blur-sm transition-all hover:scale-105 ${
                  plan.popular
                    ? 'bg-gradient-to-br from-purple-500/20 via-blue-500/10 to-purple-500/20 border-2 border-purple-500/50 shadow-2xl shadow-purple-500/20'
                    : 'bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10'
                }`}
              >
                {plan.popular && (
                  <div className="inline-block px-3 py-1 bg-gradient-to-r from-purple-500 to-blue-500 text-white text-xs font-semibold rounded-full mb-4">
                    MOST POPULAR
                  </div>
                )}
                <h3 className="text-2xl font-bold text-white mb-2">
                  {plan.name}
                </h3>
                <div className="mb-6">
                  <span className="text-5xl font-bold text-white">
                    {plan.price}
                  </span>
                  <span className="text-gray-400">/month</span>
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-gray-300"
                    >
                      <div className="w-5 h-5 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-purple-400" />
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-4 rounded-xl font-semibold transition-all cursor-pointer ${
                    plan.popular
                      ? 'bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] hover:from-[#5558e3] hover:to-[#7c3aed] text-white shadow-lg shadow-purple-500/25'
                      : 'bg-white/10 hover:bg-white/20 text-white border border-white/10'
                  }`}
                >
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-24">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-purple-500/20 via-blue-500/10 to-purple-500/20 border border-purple-500/30 rounded-3xl p-12 backdrop-blur-sm">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Ready to Ace Your Interviews?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of students who are already mastering their
              interview prep with AI
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/app"
                className="px-8 py-4 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] hover:from-[#5558e3] hover:to-[#7c3aed] text-white rounded-xl font-semibold text-lg transition-all shadow-lg shadow-purple-500/25 cursor-pointer inline-flex items-center justify-center gap-2"
              >
                Start Learning Now
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/history"
                className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-xl font-semibold text-lg transition-all border border-white/10 cursor-pointer"
              >
                View History
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 px-4 py-12 bg-[#0a0a0f]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="text-white text-lg font-bold">LearnMate</span>
            </div>
            <div className="flex gap-8 text-gray-400">
              <a
                href="#features"
                className="hover:text-white transition-colors cursor-pointer"
              >
                Features
              </a>
              <a
                href="#pricing"
                className="hover:text-white transition-colors cursor-pointer"
              >
                Pricing
              </a>
              <Link
                to="/history"
                className="hover:text-white transition-colors cursor-pointer"
              >
                History
              </Link>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-white/5 text-center text-gray-500">
            <p>&copy; 2024 LearnMate. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Landing;
