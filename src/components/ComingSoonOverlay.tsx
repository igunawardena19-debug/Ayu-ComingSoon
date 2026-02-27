import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const ComingSoonOverlay: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus('loading');
    try {
      const { data, error } = await supabase.functions.invoke('subscribe-newsletter', {
        body: { email: email.trim() },
      });

      if (error) {
        setStatus('error');
        setMessage('Failed to subscribe. Please try again.');
        return;
      }

      if (data?.error) {
        setStatus('error');
        setMessage(data.error);
        return;
      }

      setStatus('success');
      setMessage('Thank you for subscribing!');
      setEmail('');
    } catch {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-center z-10 max-sm:whitespace-normal">
        <h2 className="text-[32px] font-la-belle font-normal max-md:text-2xl max-sm:text-xl">Coming Soon</h2>
        <form onSubmit={handleSubmit} className="mt-6 flex flex-col items-center gap-3">
          <div className="flex w-full max-w-xs">
            <input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); if (status !== 'idle') setStatus('idle'); }}
              placeholder="Enter your email"
              required
              className="w-full bg-transparent border border-white/40 text-white placeholder:text-white/50 px-4 py-2 text-sm font-lato focus:outline-none focus:border-white/80 transition-colors"
              disabled={status === 'loading'}
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="bg-white text-black px-4 py-2 text-sm font-lato uppercase tracking-wider hover:bg-white/90 transition-colors disabled:opacity-50"
            >
              {status === 'loading' ? '...' : 'Join'}
            </button>
          </div>
          {status !== 'idle' && status !== 'loading' && (
            <p className={`text-xs font-lato ${status === 'success' ? 'text-green-300' : 'text-red-300'}`}>
              {message}
            </p>
          )}
        </form>
      </div>
      <div className="absolute -translate-x-2/4 text-white text-center text-base font-lato font-normal uppercase z-10 left-2/4 bottom-6 max-md:text-sm max-md:bottom-5 max-sm:text-xs max-sm:bottom-[15px]">
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-80 transition-opacity"
          aria-label="Follow us on Instagram"
        >
          instagram
        </a>
      </div>
    </>
  );
};
