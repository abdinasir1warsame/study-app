import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Brain,
  Upload,
  FileText,
  MessageSquare,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react';

function Dashboard() {
  const [step, setStep] = useState('input'); // input, summary, interview
  const [inputType, setInputType] = useState('text'); // text, video
  const [textContent, setTextContent] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);

  // Placeholder data
  const placeholderSummary = {
    bulletPoints: [
      'React is a JavaScript library for building user interfaces',
      'Components are the building blocks of React applications',
      'State management allows components to be dynamic and interactive',
      'Hooks like useState and useEffect enable functional components to have state and side effects',
      'Virtual DOM improves performance by minimizing direct DOM manipulation',
    ],
    paragraph:
      'React is a powerful JavaScript library developed by Facebook for creating interactive user interfaces. It follows a component-based architecture where each component manages its own state and can be reused throughout the application. The introduction of hooks has revolutionized React development by allowing functional components to handle state and lifecycle methods, making code more concise and easier to understand.',
  };

  const placeholderQuestions = [
    {
      question: 'What is React and what problem does it solve?',
      answer: '',
      feedback:
        'Good start! You correctly identified React as a UI library. To improve, mention specific problems it solves like component reusability and efficient DOM updates through the Virtual DOM.',
    },
    {
      question: 'Explain the difference between state and props in React.',
      answer: '',
      feedback:
        'Excellent explanation! You clearly distinguished between state (internal component data) and props (data passed from parent). Consider adding examples of when to use each.',
    },
    {
      question: 'How do React hooks improve functional components?',
      answer: '',
      feedback:
        'Great answer! You covered the main benefits of hooks. You could also mention specific hooks like useEffect for side effects and useContext for consuming context.',
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
      // Save to localStorage
      const session = {
        id: Date.now(),
        date: new Date().toISOString(),
        type: inputType,
        content: inputType === 'text' ? textContent : videoFile.name,
        summary: placeholderSummary,
        questions: placeholderQuestions,
      };
      const sessions = JSON.parse(
        localStorage.getItem('learnmate_sessions') || '[]'
      );
      sessions.push(session);
      localStorage.setItem('learnmate_sessions', JSON.stringify(sessions));
      setStep('summary');
    }
  };

  const handleNextQuestion = () => {
    if (userAnswer.trim()) {
      const updatedQuestions = [...placeholderQuestions];
      updatedQuestions[currentQuestionIndex].answer = userAnswer;
      setShowFeedback(true);
    }
  };

  const handleContinue = () => {
    if (currentQuestionIndex < placeholderQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setUserAnswer('');
      setShowFeedback(false);
    } else {
      alert('Interview practice complete! Check your history to review.');
      setStep('input');
      setCurrentQuestionIndex(0);
      setUserAnswer('');
      setShowFeedback(false);
      setTextContent('');
      setVideoFile(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* Navbar */}
      <nav className="border-b border-gray-800 bg-[#0a0a0f]/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center gap-2 cursor-pointer">
              <div className="w-8 h-8 bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="text-white text-xl font-bold">LearnMate</span>
            </Link>
            <Link
              to="/history"
              className="px-4 py-2 text-gray-300 hover:text-white transition-colors cursor-pointer"
            >
              History
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <div
            className={`flex items-center gap-2 ${
              step === 'input' ? 'text-[#6366f1]' : 'text-gray-500'
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step === 'input' ? 'bg-[#6366f1]' : 'bg-gray-700'
              }`}
            >
              1
            </div>
            <span className="hidden sm:inline">Input</span>
          </div>
          <div className="w-12 h-0.5 bg-gray-700"></div>
          <div
            className={`flex items-center gap-2 ${
              step === 'summary' ? 'text-[#6366f1]' : 'text-gray-500'
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step === 'summary' ? 'bg-[#6366f1]' : 'bg-gray-700'
              }`}
            >
              2
            </div>
            <span className="hidden sm:inline">Summary</span>
          </div>
          <div className="w-12 h-0.5 bg-gray-700"></div>
          <div
            className={`flex items-center gap-2 ${
              step === 'interview' ? 'text-[#6366f1]' : 'text-gray-500'
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step === 'interview' ? 'bg-[#6366f1]' : 'bg-gray-700'
              }`}
            >
              3
            </div>
            <span className="hidden sm:inline">Practice</span>
          </div>
        </div>

        {/* Input Step */}
        {step === 'input' && (
          <div className="bg-[#13131b] border border-gray-800 rounded-xl p-8">
            <h2 className="text-3xl font-bold text-white mb-6">
              Upload Your Content
            </h2>

            {/* Input Type Toggle */}
            <div className="flex gap-4 mb-6">
              <button
                onClick={() => setInputType('text')}
                className={`flex-1 py-3 rounded-lg font-medium transition-colors cursor-pointer ${
                  inputType === 'text'
                    ? 'bg-[#6366f1] text-white'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
              >
                <FileText className="w-5 h-5 inline mr-2" />
                Text Input
              </button>
              <button
                onClick={() => setInputType('video')}
                className={`flex-1 py-3 rounded-lg font-medium transition-colors cursor-pointer ${
                  inputType === 'video'
                    ? 'bg-[#6366f1] text-white'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
              >
                <Upload className="w-5 h-5 inline mr-2" />
                Video Upload
              </button>
            </div>

            {/* Text Input */}
            {inputType === 'text' && (
              <div>
                <label className="block text-gray-300 mb-2">
                  Paste your study content
                </label>
                <textarea
                  value={textContent}
                  onChange={(e) => setTextContent(e.target.value)}
                  placeholder="Paste your notes, transcripts, or any study material here..."
                  className="w-full h-64 p-4 bg-[#0a0a0f] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#6366f1] resize-none"
                />
              </div>
            )}

            {/* Video Upload */}
            {inputType === 'video' && (
              <div>
                <label className="block text-gray-300 mb-2">
                  Upload video file (MP4)
                </label>
                <div className="border-2 border-dashed border-gray-700 rounded-lg p-12 text-center hover:border-[#6366f1] transition-colors cursor-pointer">
                  <input
                    type="file"
                    accept="video/mp4"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="video-upload"
                  />
                  <label htmlFor="video-upload" className="cursor-pointer">
                    <Upload className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                    <p className="text-gray-400">
                      {videoFile
                        ? videoFile.name
                        : 'Click to upload or drag and drop'}
                    </p>
                    <p className="text-gray-600 text-sm mt-2">MP4 files only</p>
                  </label>
                </div>
              </div>
            )}

            <button
              onClick={handleGenerate}
              disabled={inputType === 'text' ? !textContent.trim() : !videoFile}
              className="w-full mt-6 py-4 bg-[#6366f1] hover:bg-[#5558e3] disabled:bg-gray-700 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-colors cursor-pointer"
            >
              Generate Summary & Questions
              <ArrowRight className="w-5 h-5 inline ml-2" />
            </button>
          </div>
        )}

        {/* Summary Step */}
        {step === 'summary' && (
          <div className="bg-[#13131b] border border-gray-800 rounded-xl p-8">
            <h2 className="text-3xl font-bold text-white mb-6">
              Content Summary
            </h2>

            <div className="mb-8">
              <h3 className="text-xl font-semibold text-white mb-4">
                Key Points
              </h3>
              <ul className="space-y-2">
                {placeholderSummary.bulletPoints.map((point, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-gray-300"
                  >
                    <span className="w-1.5 h-1.5 bg-[#6366f1] rounded-full mt-2 flex-shrink-0"></span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold text-white mb-4">
                Overview
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {placeholderSummary.paragraph}
              </p>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setStep('input')}
                className="flex-1 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-5 h-5 inline mr-2" />
                Back
              </button>
              <button
                onClick={() => setStep('interview')}
                className="flex-1 py-3 bg-[#6366f1] hover:bg-[#5558e3] text-white rounded-lg font-medium transition-colors cursor-pointer"
              >
                Start Interview Practice
                <ArrowRight className="w-5 h-5 inline ml-2" />
              </button>
            </div>
          </div>
        )}

        {/* Interview Step */}
        {step === 'interview' && (
          <div className="bg-[#13131b] border border-gray-800 rounded-xl p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-white">
                Interview Practice
              </h2>
              <span className="text-gray-400">
                Question {currentQuestionIndex + 1} of{' '}
                {placeholderQuestions.length}
              </span>
            </div>

            <div className="mb-8">
              <div className="flex items-start gap-3 mb-6">
                <MessageSquare className="w-6 h-6 text-[#6366f1] flex-shrink-0 mt-1" />
                <p className="text-xl text-white">
                  {placeholderQuestions[currentQuestionIndex].question}
                </p>
              </div>

              {!showFeedback ? (
                <div>
                  <label className="block text-gray-300 mb-2">
                    Your Answer
                  </label>
                  <textarea
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    placeholder="Type your answer here..."
                    className="w-full h-48 p-4 bg-[#0a0a0f] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#6366f1] resize-none"
                  />
                  <button
                    onClick={handleNextQuestion}
                    disabled={!userAnswer.trim()}
                    className="w-full mt-4 py-3 bg-[#6366f1] hover:bg-[#5558e3] disabled:bg-gray-700 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-colors cursor-pointer"
                  >
                    Submit Answer
                  </button>
                </div>
              ) : (
                <div>
                  <div className="bg-[#0a0a0f] border border-gray-700 rounded-lg p-6 mb-4">
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Your Answer
                    </h3>
                    <p className="text-gray-300">{userAnswer}</p>
                  </div>
                  <div className="bg-[#6366f1]/10 border border-[#6366f1]/30 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-[#6366f1] mb-2">
                      Feedback
                    </h3>
                    <p className="text-gray-300">
                      {placeholderQuestions[currentQuestionIndex].feedback}
                    </p>
                  </div>
                  <button
                    onClick={handleContinue}
                    className="w-full mt-4 py-3 bg-[#6366f1] hover:bg-[#5558e3] text-white rounded-lg font-semibold transition-colors cursor-pointer"
                  >
                    {currentQuestionIndex < placeholderQuestions.length - 1
                      ? 'Next Question'
                      : 'Finish'}
                    <ArrowRight className="w-5 h-5 inline ml-2" />
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => setStep('summary')}
              className="text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5 inline mr-2" />
              Back to Summary
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
