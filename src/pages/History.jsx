import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Brain, Download, Trash2, FileText, Video } from 'lucide-react';

function History() {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const savedSessions = JSON.parse(
      localStorage.getItem('learnmate_sessions') || '[]'
    );
    setSessions(savedSessions);
  }, []);

  const handleDelete = (id) => {
    const updatedSessions = sessions.filter((s) => s.id !== id);
    setSessions(updatedSessions);
    localStorage.setItem('learnmate_sessions', JSON.stringify(updatedSessions));
  };

  const handleDownload = (session) => {
    const content = {
      date: session.date,
      type: session.type,
      content: session.content,
      summary: session.summary,
      questions: session.questions,
    };
    const blob = new Blob([JSON.stringify(content, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `learnmate-session-${
      new Date(session.date).toISOString().split('T')[0]
    }.json`;
    a.click();
    URL.revokeObjectURL(url);
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
              to="/app"
              className="px-4 py-2 bg-[#6366f1] hover:bg-[#5558e3] text-white rounded-lg font-medium transition-colors cursor-pointer"
            >
              New Session
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-white mb-8">Session History</h1>

        {sessions.length === 0 ? (
          <div className="bg-[#13131b] border border-gray-800 rounded-xl p-12 text-center">
            <FileText className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-white mb-2">
              No sessions yet
            </h2>
            <p className="text-gray-400 mb-6">
              Start a new study session to see it here
            </p>
            <Link
              to="/app"
              className="inline-block px-6 py-3 bg-[#6366f1] hover:bg-[#5558e3] text-white rounded-lg font-medium transition-colors cursor-pointer"
            >
              Create Session
            </Link>
          </div>
        ) : (
          <div className="grid gap-6">
            {sessions.map((session) => (
              <div
                key={session.id}
                className="bg-[#13131b] border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        session.type === 'text'
                          ? 'bg-blue-500/10 text-blue-500'
                          : 'bg-purple-500/10 text-purple-500'
                      }`}
                    >
                      {session.type === 'text' ? (
                        <FileText className="w-5 h-5" />
                      ) : (
                        <Video className="w-5 h-5" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">
                        {session.type === 'text'
                          ? 'Text Session'
                          : 'Video Session'}
                      </h3>
                      <p className="text-gray-400 text-sm">
                        {new Date(session.date).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleDownload(session)}
                      className="p-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors cursor-pointer"
                      title="Download"
                    >
                      <Download className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(session.id)}
                      className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg transition-colors cursor-pointer"
                      title="Delete"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="border-t border-gray-800 pt-4">
                  <h4 className="text-sm font-semibold text-gray-400 mb-2">
                    Summary Preview
                  </h4>
                  <ul className="space-y-1">
                    {session.summary.bulletPoints
                      .slice(0, 3)
                      .map((point, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-2 text-gray-400 text-sm"
                        >
                          <span className="w-1 h-1 bg-gray-600 rounded-full mt-2 flex-shrink-0"></span>
                          <span>{point}</span>
                        </li>
                      ))}
                  </ul>
                  {session.summary.bulletPoints.length > 3 && (
                    <p className="text-gray-600 text-sm mt-2">
                      + {session.summary.bulletPoints.length - 3} more points
                    </p>
                  )}
                </div>

                <div className="border-t border-gray-800 pt-4 mt-4">
                  <h4 className="text-sm font-semibold text-gray-400 mb-2">
                    Questions
                  </h4>
                  <p className="text-gray-400 text-sm">
                    {session.questions.length} interview questions generated
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default History;
