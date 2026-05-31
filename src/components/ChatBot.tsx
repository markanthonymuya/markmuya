'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { MessageSquare, X, Send, Bot, User, Loader2 } from 'lucide-react';
import { clsx } from 'clsx';
import { ChatMessage, ChatStep, InquiryPayload } from '@/types';
import { saveInquiry } from '@/lib/chatApi';

// ─── Conversation flow ────────────────────────────────────────────────────────

const INTENTS = ['💼 Looking to hire', '📱 App inquiry', '🤝 Collaborate', '💬 Just saying hi'];

function botMsg(text: string, options?: string[]): ChatMessage {
  return { id: crypto.randomUUID(), role: 'bot', text, timestamp: new Date(), options };
}
function userMsg(text: string): ChatMessage {
  return { id: crypto.randomUUID(), role: 'user', text, timestamp: new Date() };
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

// ─── Message bubble ───────────────────────────────────────────────────────────

function Bubble({ msg, onOption }: { msg: ChatMessage; onOption?: (o: string) => void }) {
  const isBot = msg.role === 'bot';
  return (
    <div className={clsx('flex gap-2.5 items-end', !isBot && 'flex-row-reverse')}>
      <div
        className={clsx(
          'w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-xs',
          isBot ? 'bg-brand/20 border border-brand/30' : 'bg-white/10 border border-white/15'
        )}
      >
        {isBot ? <Bot size={13} className="text-brand-light" /> : <User size={13} className="text-slate-300" />}
      </div>
      <div className="max-w-[82%] space-y-2">
        <div
          className={clsx(
            'px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed',
            isBot
              ? 'bg-white/6 border border-white/8 text-slate-200 rounded-bl-sm'
              : 'bg-brand text-white rounded-br-sm'
          )}
        >
          {msg.text}
        </div>
        {msg.options && onOption && (
          <div className="flex flex-col gap-1.5">
            {msg.options.map((o) => (
              <button
                key={o}
                onClick={() => onOption(o)}
                className="text-left px-3 py-2 text-xs font-medium text-brand-light border border-brand/30 rounded-xl hover:bg-brand/15 hover:border-brand/50 transition-all"
              >
                {o}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Typing indicator ─────────────────────────────────────────────────────────

function TypingIndicator() {
  return (
    <div className="flex gap-2.5 items-end">
      <div className="w-7 h-7 rounded-full bg-brand/20 border border-brand/30 flex items-center justify-center">
        <Bot size={13} className="text-brand-light" />
      </div>
      <div className="px-3.5 py-3 bg-white/6 border border-white/8 rounded-2xl rounded-bl-sm flex gap-1">
        {[0, 0.2, 0.4].map((d, i) => (
          <span
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce"
            style={{ animationDelay: `${d}s` }}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Main ChatBot ─────────────────────────────────────────────────────────────

export function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [step, setStep] = useState<ChatStep>('greeting');
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [inquiry, setInquiry] = useState<Partial<InquiryPayload>>({});
  const [optionsUsed, setOptionsUsed] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const addBot = useCallback((text: string, options?: string[], delay = 700) => {
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [...prev, botMsg(text, options)]);
    }, delay);
  }, []);

  // Initialize conversation when opened
  useEffect(() => {
    if (open && messages.length === 0) {
      setTimeout(() => {
        setMessages([
          botMsg("👋 Hey there! I'm Mark's assistant. I'm here to help you get in touch with him."),
        ]);
        setTimeout(() => {
          addBot("What brings you here today?", INTENTS, 900);
        }, 800);
        setStep('intent');
      }, 300);
    }
  }, [open]);

  // Auto-scroll
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  // Focus input on step change
  useEffect(() => {
    if (!['greeting', 'intent', 'confirm', 'done', 'error'].includes(step)) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [step]);

  const handleOption = async (option: string) => {
    if (optionsUsed) return;
    setOptionsUsed(true);
    setMessages((prev) => [...prev, userMsg(option)]);
    const intent = option.replace(/[^a-zA-Z\s]/g, '').trim();
    setInquiry({ intent });

    setTimeout(() => {
      addBot(`Got it — "${intent}". I'd love to connect you with Mark! First, what's your name?`, undefined, 600);
      setStep('collect_name');
      setOptionsUsed(false);
    }, 300);
  };

  const handleSend = async () => {
    const value = input.trim();
    if (!value || typing) return;
    setInput('');
    setMessages((prev) => [...prev, userMsg(value)]);

    if (step === 'collect_name') {
      setInquiry((prev) => ({ ...prev, name: value }));
      addBot(`Nice to meet you, ${value}! 😊 What's your email address so Mark can get back to you?`);
      setStep('collect_email');
      return;
    }

    if (step === 'collect_email') {
      if (!isValidEmail(value)) {
        addBot("Hmm, that doesn't look like a valid email. Could you double-check it? 📧");
        return;
      }
      setInquiry((prev) => ({ ...prev, email: value }));
      addBot("Perfect! Lastly, what would you like to say to Mark? Feel free to share details about your project or question.");
      setStep('collect_message');
      return;
    }

    if (step === 'collect_message') {
      const full: InquiryPayload = {
        name: inquiry.name ?? '',
        email: inquiry.email ?? '',
        intent: inquiry.intent ?? 'General',
        message: value,
      };
      setInquiry((prev) => ({ ...prev, message: value }));
      setTyping(true);

      const result = await saveInquiry(full);
      setTyping(false);

      if (result.ok) {
        setMessages((prev) => [...prev, botMsg(
          `✅ All set, ${full.name}! I've passed your message to Mark. He usually responds within 24 hours at ${full.email}. Thanks for reaching out!`
        )]);
        setStep('done');
      } else {
        setMessages((prev) => [...prev, botMsg(
          `I wasn't able to save your message right now. Please email Mark directly at markmuya@outlook.com — he'd love to hear from you! 📧`
        )]);
        setStep('error');
      }
      return;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  const reset = () => {
    setMessages([]);
    setStep('greeting');
    setInput('');
    setInquiry({});
    setOptionsUsed(false);
    setTyping(false);
    setTimeout(() => setOpen(true), 50);
    setOpen(false);
  };

  const inputEnabled = !['greeting', 'intent', 'done', 'error'].includes(step) && !typing;
  const placeholder =
    step === 'collect_name'    ? 'Your name…'                     :
    step === 'collect_email'   ? 'your@email.com'                 :
    step === 'collect_message' ? 'Tell Mark about your project…'  : '';

  return (
    <>
      {/* Trigger button */}
      <button
        id="chat-trigger"
        onClick={() => setOpen(true)}
        className={clsx(
          'fixed bottom-6 right-6 z-50 w-14 h-14 rounded-2xl bg-brand hover:bg-brand-dark text-white shadow-2xl shadow-brand/40 flex items-center justify-center transition-all hover:scale-105 active:scale-95',
          open && 'hidden'
        )}
        title="Chat with Mark's assistant"
      >
        <MessageSquare size={22} />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-[#060610] animate-ping-slow" />
      </button>

      {/* Chat window */}
      {open && (
        <div className="fixed bottom-6 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] h-[520px] max-h-[calc(100vh-5rem)] flex flex-col glass-strong rounded-3xl overflow-hidden shadow-2xl shadow-black/50 animate-fade-up">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/8 bg-gradient-to-r from-brand/20 to-violet-600/10">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand to-violet-500 flex items-center justify-center text-lg">
                  🤖
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-[#0d0d1a]" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">Mark's Assistant</p>
                <p className="text-xs text-emerald-400">● Online</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {step === 'done' || step === 'error' ? (
                <button
                  onClick={reset}
                  className="text-xs text-slate-400 hover:text-white px-2 py-1 glass rounded-lg transition-colors"
                >
                  New chat
                </button>
              ) : null}
              <button
                onClick={() => setOpen(false)}
                className="w-7 h-7 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 flex items-center justify-center transition-colors"
              >
                <X size={15} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <Bubble
                key={msg.id}
                msg={msg}
                onOption={step === 'intent' ? handleOption : undefined}
              />
            ))}
            {typing && <TypingIndicator />}
            <div ref={endRef} />
          </div>

          {/* Input */}
          <div className="px-4 pb-4 pt-2 border-t border-white/5">
            <div className={clsx(
              'flex items-center gap-2 glass rounded-2xl px-3 py-2 transition-all',
              inputEnabled ? 'border-white/10' : 'opacity-50'
            )}>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={inputEnabled ? placeholder : 'Select an option above…'}
                disabled={!inputEnabled}
                className="flex-1 bg-transparent text-sm text-white placeholder:text-slate-600 outline-none min-w-0"
              />
              <button
                onClick={handleSend}
                disabled={!inputEnabled || !input.trim()}
                className="w-8 h-8 rounded-xl bg-brand disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center hover:bg-brand-dark transition-colors flex-shrink-0"
              >
                <Send size={13} className="text-white" />
              </button>
            </div>
            <p className="text-center text-[10px] text-slate-700 mt-2">
              Messages are saved to connect you with Mark
            </p>
          </div>
        </div>
      )}
    </>
  );
}
