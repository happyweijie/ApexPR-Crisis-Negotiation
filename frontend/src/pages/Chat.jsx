import { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import CaseBriefModal from '../components/CaseBriefModal';
import Certificate from '../components/Certificate';
import AriaProfile from '../components/AriaProfile';
import './Chat.css';

// Use relative paths in production to ensure seamless communication on any domain (like Railway)
const API_BASE = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '' : 'http://localhost:3001');
const MAX_MESSAGES = 25; // Trigger evaluation at this count

// Parse the structured evaluation from AI response
function parseEvaluation(text) {
  const parts = text.split('---NEGOTIATION_CONCLUDED---');
  if (parts.length > 1) {
    return parts[1].trim();
  }
  return text.replace('---NEGOTIATION_CONCLUDED---', '').trim();
}

// Extract conversation text that came before the evaluation
function parseGoodbyeText(text) {
  const parts = text.split('---NEGOTIATION_CONCLUDED---');
  if (parts.length > 1) {
    return parts[0].trim();
  }
  return '';
}

// Extract [Feedback: ...] block from AI reply and return { cleanText, feedback }
function extractFeedback(text) {
  // Match [Feedback: ...] — non-greedy, allows multi-sentence
  const feedbackRegex = /\[Feedback:\s*([\s\S]*?)\]/;
  const match = text.match(feedbackRegex);
  if (match) {
    const feedback = match[1].trim();
    const cleanText = text.replace(feedbackRegex, '').trim();
    return { cleanText, feedback };
  }
  return { cleanText: text, feedback: null };
}

export default function Chat({ studentName }) {
  const [messages, setMessages]       = useState([]);
  const [input, setInput]             = useState('');
  const [loading, setLoading]         = useState(false);
  const [briefOpen, setBriefOpen]     = useState(false);
  const [concluded, setConcluded]     = useState(false);
  const [evaluation, setEvaluation]   = useState('');
  const [showCert, setShowCert]       = useState(false);
  const [error, setError]             = useState('');
  // Feedback banner state: { text, id } — id ensures re-triggering animation on new feedback
  const [activeFeedback, setActiveFeedback] = useState(null);
  const [feedbackVisible, setFeedbackVisible] = useState(false);
  const messagesEndRef                = useRef(null);
  const inputRef                      = useRef(null);
  const greetingTriggered             = useRef(false);
  const feedbackIdRef                 = useRef(0);

  // User message count (only count user turns for the trigger)
  const userMessageCount = messages.filter(m => m.role === 'user').length;
  const progressPct = Math.min((userMessageCount / MAX_MESSAGES) * 100, 100);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // Auto-focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
    // Trigger Aria to start if the conversation is empty
    if (messages.length === 0 && !greetingTriggered.current) {
      greetingTriggered.current = true;
      triggerInitialGreeting();
    }
  }, []);

  async function triggerInitialGreeting() {
    const triggerMsg = { 
      role: 'system', 
      content: `Aria, start the conversation now. You are calling the Apex PR negotiator (the user, whose name is ${studentName}) for the first time. You are deeply distressed, speaking in a very emotional, flustered, and anxious tone. Mention how you're watching your follower count drop in real-time and how terrified you are that your career is over. You are desperate for their help.`
    };
    await sendToAI([triggerMsg]);
  }

  // Auto-expand textarea as user types
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      const scrollHeight = inputRef.current.scrollHeight;
      inputRef.current.style.height = Math.min(scrollHeight, 160) + 'px';
    }
  }, [input]);

  async function sendToAI(history) {
    setLoading(true);
    setError('');
    const endpoint = '/api/chat';
    const url = API_BASE ? `${API_BASE.replace(/\/$/, '')}${endpoint}` : endpoint;
    
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history }),
      });
      if (!res.ok) throw new Error(`Server error ${res.status}`);
      const data = await res.json();

      if (data.concluded || userMessageCount >= MAX_MESSAGES) {
        const evalText = parseEvaluation(data.reply);
        const goodbyeText = parseGoodbyeText(data.reply);

        setEvaluation(evalText);
        setConcluded(true);

        const newMessages = [];
        if (goodbyeText) {
          newMessages.push({ role: 'assistant', content: goodbyeText });
        }
        newMessages.push({ role: 'assistant', content: evalText, isEval: true });

        setMessages(prev => [...prev, ...newMessages]);
      } else {
        // Extract any [Feedback: ...] from the reply
        const { cleanText, feedback } = extractFeedback(data.reply);
        setMessages(prev => [...prev, { role: 'assistant', content: cleanText }]);
        if (feedback) {
          feedbackIdRef.current += 1;
          setActiveFeedback({ text: feedback, id: feedbackIdRef.current });
          setFeedbackVisible(true);
        }
      }
    } catch (e) {
      console.error('Chat error:', e);
      setError(e.message?.includes('Server error') 
        ? `Server Error (${e.message}): Please check your OpenAI API Key in Railway variables.` 
        : 'Network Error: Please check your internet connection or if the server is still starting up.');
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  }

  async function handleSend() {
    if (!input.trim() || loading || concluded) return;
    const userMsg = { role: 'user', content: input.trim() };
    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setInput('');

    const willTrigger = newHistory.filter(m => m.role === 'user').length >= MAX_MESSAGES;
    const historyToSend = willTrigger
      ? [...newHistory, {
          role: 'system',
          content: 'The conversation has reached the message limit. You MUST now provide the full structured evaluation, starting with ---NEGOTIATION_CONCLUDED---.'
        }]
      : newHistory;

    await sendToAI(historyToSend.filter(m => m.role !== 'system' || m.content.includes('NEGOTIATION_CONCLUDED')));
  }

  async function handleManualConclude() {
    if (loading || concluded || messages.length === 0) return;
    
    if (window.confirm("Are you sure you want to end the negotiation? This will generate your final evaluation based on the current progress.")) {
      const finalMsg = {
        role: 'system',
        content: "The user has manually ended the negotiation. You MUST now provide the full structured evaluation, starting with ---NEGOTIATION_CONCLUDED---. Use all the information gathered so far to evaluate the student's performance."
      };
      await sendToAI([...messages, finalMsg]);
    }
  }

  return (
    <div className="chat-root">
      {/* Background blobs */}
      <div className="blob blob-1" />
      <div className="blob blob-2" />

      {/* Header */}
      <header className="chat-header glass-card">
        <div className="chat-header-left">
          <div className="aria-avatar">
            <img src="/aria_avatar.png" alt="Aria Lim" />
            <div className="online-dot" />
          </div>
          <AriaProfile />
        </div>

        <div className="chat-header-right">
          {/* Progress */}
          <div className="progress-pill" id="message-counter">
            💬 {userMessageCount}/{MAX_MESSAGES} exchanges
          </div>
          <div className="progress-bar-track">
            <div
              className="progress-bar-fill"
              style={{ width: `${progressPct}%`, background: progressPct > 80 ? '#c0392b' : 'var(--rose-gold)' }}
            />
          </div>
          <button className="btn-ghost" id="view-brief-header-btn" onClick={() => setBriefOpen(true)}>
            📋 Quick Reference
          </button>
          {!concluded && messages.length > 1 && (
            <button 
              className="btn-secondary" 
              id="end-negotiation-btn" 
              onClick={handleManualConclude}
              disabled={loading}
              style={{ padding: '6px 12px', fontSize: '0.8rem', marginLeft: '8px' }}
            >
              🏁 End Session
            </button>
          )}
        </div>
      </header>

      {/* Feedback Banner — shown outside the chat flow, closable */}
      {feedbackVisible && activeFeedback && (
        <div
          className="feedback-banner animate-fadeDown"
          key={activeFeedback.id}
          id="feedback-banner"
          role="alert"
          aria-live="polite"
        >
          <div className="feedback-banner-inner">
            <span className="feedback-icon">💡</span>
            <div className="feedback-content">
              <span className="feedback-label">Coaching Tip</span>
              <p className="feedback-text">{activeFeedback.text}</p>
            </div>
            <button
              className="feedback-close"
              aria-label="Dismiss feedback"
              onClick={() => setFeedbackVisible(false)}
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Message list */}
      <main className="chat-messages" id="chat-messages-container">
        {messages.length === 0 && (
          <div className="chat-empty-state animate-fadeIn">
            <div className="empty-icon">{loading ? '⌛' : '🤝'}</div>
            <h3>{loading ? 'Aria is joining the call...' : 'Ready to start the session?'}</h3>
            <p>
              {loading 
                ? 'Aria is connecting. Please wait a moment while she gathers her thoughts.' 
                : 'Greet Aria Lim to begin the negotiation. As a Senior Account Director at Apex PR, you should set a professional yet empathetic tone.'}
            </p>
          </div>
        )}

        {messages
          .filter(m => !m.isEval && m.role !== 'system')
          .map((msg, i) => (
            <div
              key={i}
              className={`message-row ${msg.role === 'user' ? 'user' : 'assistant'} animate-fadeUp`}
              style={{ animationDelay: `${i * 0.04}s` }}
            >
              {msg.role === 'assistant' && (
                <div className="msg-avatar">
                  <img src="/aria_avatar.png" alt="Aria" />
                </div>
              )}
              <div className={`bubble ${msg.role === 'user' ? 'bubble-user' : 'bubble-assistant'}`}>
                <p>{msg.content}</p>
              </div>
              {msg.role === 'user' && (
                <div className="msg-avatar user-avatar"><span>{studentName.charAt(0).toUpperCase()}</span></div>
              )}
            </div>
          ))}

        {/* Typing indicator */}
        {loading && !concluded && (
          <div className="message-row assistant animate-fadeIn">
            <div className="msg-avatar">
              <img src="/aria_avatar.png" alt="Aria" />
            </div>
            <div className="bubble bubble-assistant typing-bubble">
              <span className="dot" /><span className="dot" /><span className="dot" />
            </div>
          </div>
        )}

        {/* Evaluation panel */}
        {concluded && evaluation && (
          <div className="eval-panel glass-card animate-fadeUp" id="evaluation-panel">
            <div className="eval-header">
              <span className="eval-icon">📊</span>
              <h2>Negotiation Complete</h2>
              <p>Here is your performance evaluation, {studentName}.</p>
            </div>
            <div className="eval-body">
              <div className="eval-text">
                <ReactMarkdown>{evaluation}</ReactMarkdown>
              </div>
            </div>
            <div className="eval-actions">
              <button
                className="btn-primary"
                id="download-cert-btn"
                onClick={() => setShowCert(true)}
              >
                🎓 Download Certificate
              </button>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </main>

      {/* Error banner */}
      {error && (
        <div className="error-banner animate-fadeIn">
          ⚠️ {error}
        </div>
      )}

      {/* Input bar */}
      {!concluded && (
        <footer className="chat-footer glass-card">
          <div className="input-row">
            <div className="input-wrapper">
              <textarea
                ref={inputRef}
                id="chat-input"
                className="input-field chat-input chat-textarea"
                placeholder="Type your message to Aria…"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                disabled={loading || concluded}
                rows={1}
              />
            </div>
            <button
              className="btn-primary send-btn"
              id="send-message-btn"
              onClick={handleSend}
              disabled={loading || !input.trim() || concluded}
            >
              Send ↗
            </button>
          </div>
          <p className="chat-footer-hint">
            You are playing <strong>Senior Account Director, Apex PR</strong>. Negotiate wisely.
          </p>
        </footer>
      )}

      {/* Modals */}
      <CaseBriefModal open={briefOpen} onClose={() => setBriefOpen(false)} mode="summary" />
      {showCert && (
        <Certificate
          studentName={studentName}
          evaluation={evaluation}
          onClose={() => setShowCert(false)}
        />
      )}
    </div>
  );
}
