import React, { useState } from 'react';
import {
  Mail,
  MessageSquare,
  Bug,
  Lightbulb,
  Handshake,
  Briefcase,
  HelpCircle,
  CheckCircle2,
  ArrowRight,
  Send,
  Sparkles,
} from 'lucide-react';

type ContactReason =
  | 'general'
  | 'feedback'
  | 'bug'
  | 'feature'
  | 'partnership'
  | 'business'
  | 'seo'
  | 'other';

interface ReasonOption {
  id: ContactReason;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  promptLabel?: string;
  promptPlaceholder?: string;
}

const REASON_OPTIONS: ReasonOption[] = [
  { id: 'general', label: 'General Question', icon: HelpCircle },
  { id: 'feedback', label: 'Tool Feedback', icon: MessageSquare, promptLabel: 'What feedback or ideas do you have?', promptPlaceholder: 'Share your thoughts on how to make the planner better...' },
  { id: 'bug', label: 'Report a Bug', icon: Bug, promptLabel: 'What went wrong & what were you trying to do?', promptPlaceholder: 'Describe the bug, steps to reproduce, and your browser...' },
  { id: 'feature', label: 'Feature Request', icon: Lightbulb, promptLabel: 'What feature would you like us to add?', promptPlaceholder: 'Describe the workflow or capability you would like to see...' },
  { id: 'partnership', label: 'Partnership', icon: Handshake, promptLabel: 'Tell us about your collaboration proposal', promptPlaceholder: 'Explain how we could partner or collaborate...' },
  { id: 'business', label: 'Business Inquiry', icon: Briefcase, promptLabel: 'How can we help your organization?', promptPlaceholder: 'Tell us about your agency or team requirements...' },
  { id: 'seo', label: 'Content / SEO Question', icon: Sparkles, promptLabel: 'What SEO or outline challenge are you facing?', promptPlaceholder: 'Ask your question about search intent or structure...' },
  { id: 'other', label: 'Something Else', icon: Mail },
];

export const ContactPage: React.FC = () => {
  const [selectedReason, setSelectedReason] = useState<ContactReason>('general');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [message, setMessage] = useState('');

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const currentReasonObj = REASON_OPTIONS.find((r) => r.id === selectedReason);

  const validate = () => {
    const errs: { [key: string]: string } = {};

    if (!name.trim()) {
      errs.name = 'Please enter your name.';
    }

    if (!email.trim()) {
      errs.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = 'Please enter a valid email address (e.g. name@example.com).';
    }

    if (!message.trim()) {
      errs.message = 'Please provide details in your message.';
    } else if (message.trim().length < 10) {
      errs.message = 'Your message should be at least 10 characters long.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate clean submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 900);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setName('');
    setEmail('');
    setWebsite('');
    setMessage('');
    setSelectedReason('general');
    setErrors({});
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
          <Mail className="w-3.5 h-3.5 text-slate-600" />
          <span>Contact Us</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Have a question? Let’s talk.
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          Tell us what you’re trying to solve and we’ll help you find the right direction.
        </p>
      </div>

      {/* Main Form Container */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 md:p-10 shadow-xs">
        {isSubmitted ? (
          /* SUCCESS STATE */
          <div className="text-center py-12 space-y-5 animate-in zoom-in-95">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-xs">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div className="space-y-2 max-w-md mx-auto">
              <h3 className="text-2xl font-bold text-slate-900">
                Message Received
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Thanks for reaching out, <strong>{name}</strong>. We’ve recorded your inquiry regarding <em>{currentReasonObj?.label}</em> and will get back to you at <strong>{email}</strong> as soon as possible.
              </p>
            </div>
            <div className="pt-4">
              <button
                onClick={handleReset}
                className="px-5 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Send Another Message
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* 1. SELECT CONTACT REASON */}
            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-900 block">
                What can we help you with?
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {REASON_OPTIONS.map((opt) => {
                  const Icon = opt.icon;
                  const isSelected = selectedReason === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setSelectedReason(opt.id)}
                      className={`p-3 rounded-xl border text-left transition-all flex items-center gap-2 cursor-pointer ${
                        isSelected
                          ? 'border-slate-900 bg-slate-900 text-white shadow-2xs'
                          : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 text-slate-800'
                      }`}
                    >
                      <Icon className={`w-4 h-4 shrink-0 ${isSelected ? 'text-amber-300' : 'text-slate-500'}`} />
                      <span className="text-xs font-semibold truncate">
                        {opt.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. USER DETAILS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">
                  Your Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors({ ...errors, name: '' });
                  }}
                  placeholder="e.g. Alex Morgan"
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm transition-all focus:outline-none focus:ring-2 ${
                    errors.name
                      ? 'border-red-300 focus:ring-red-400 bg-red-50/20'
                      : 'border-slate-300 focus:ring-slate-900'
                  }`}
                />
                {errors.name && (
                  <p className="text-[11px] font-semibold text-red-600">
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors({ ...errors, email: '' });
                  }}
                  placeholder="you@example.com"
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm transition-all focus:outline-none focus:ring-2 ${
                    errors.email
                      ? 'border-red-300 focus:ring-red-400 bg-red-50/20'
                      : 'border-slate-300 focus:ring-slate-900'
                  }`}
                />
                {errors.email && (
                  <p className="text-[11px] font-semibold text-red-600">
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            {/* Optional Website URL */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">
                Website or Publication URL <span className="text-slate-400 font-normal">(Optional)</span>
              </label>
              <input
                type="url"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="https://yourwebsite.com"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </div>

            {/* 3. DYNAMIC CONTEXTUAL MESSAGE FIELD */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">
                {currentReasonObj?.promptLabel || 'Message'} <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={5}
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  if (errors.message) setErrors({ ...errors, message: '' });
                }}
                placeholder={
                  currentReasonObj?.promptPlaceholder ||
                  "Tell us what's on your mind..."
                }
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm transition-all focus:outline-none focus:ring-2 ${
                  errors.message
                    ? 'border-red-300 focus:ring-red-400 bg-red-50/20'
                    : 'border-slate-300 focus:ring-slate-900'
                }`}
              />
              {errors.message && (
                <p className="text-[11px] font-semibold text-red-600">
                  {errors.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-slate-900 text-white font-bold text-sm hover:bg-slate-800 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-75"
              >
                {isSubmitting ? (
                  <span>Sending message...</span>
                ) : (
                  <>
                    <span>Send Message</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
