'use client';

import { useState, useRef, use, useEffect } from 'react';
import Link from 'next/link';
import { MOCK_AGENTS, MOCK_TRANSCRIPT } from '@/data';
import { Agent, TranscriptEntry } from '@/types';
import { Phone, PhoneOff, ArrowLeft } from 'lucide-react';
import { getAgent } from '@/utils/agentStorage';

export default function TestDialerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [agent, setAgent] = useState<Agent | null>(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isCalling, setIsCalling] = useState(false);
  const [callActive, setCallActive] = useState(false);
  const [transcript, setTranscript] = useState<TranscriptEntry[]>([]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const fromStorage = getAgent(id);
    if (fromStorage) {
      setAgent(fromStorage);
    } else {
      const mock = MOCK_AGENTS.find((a) => a.id === id);
      setAgent(mock || null);
    }
  }, [id]);

  const handleStartCall = () => {
    if (!phoneNumber) {
      alert('Please enter a phone number');
      return;
    }
    setIsCalling(true);
    setCallActive(false);
    setTranscript([]);

    // Simulate call starting after 3 seconds
    timeoutRef.current = setTimeout(() => {
      setIsCalling(false);
      setCallActive(true);
      // Simulate transcript appearing
      let index = 0;
      intervalRef.current = setInterval(() => {
        const entry = MOCK_TRANSCRIPT[index];
        if (entry) {
          setTranscript((prev) => [...prev, entry]);
          index++;
        } else {
          clearInterval(intervalRef.current!);
          intervalRef.current = null;
        }
      }, 500);
    }, 3000);
  };

  const handleEndCall = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setTranscript([]);
    setCallActive(false);
    setIsCalling(false);
  };

  if (!agent) {
    return (
      <div className="text-center py-12">
        <p className="text-brand-teal">Loading agent...</p>
      </div>
    );
  }

  return (
    <div>
      <Link href="/dashboard" className="text-brand-cyan hover:text-brand-teal text-sm font-medium mb-4 inline-flex items-center gap-1">
        <ArrowLeft size={16} />
        Back to Dashboard
      </Link>

      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-brand-card p-4 rounded-lg border border-brand-border col-span-2">
          <h2 className="text-2xl font-bold text-white mb-1">{agent.name}</h2>
          <p className="text-brand-teal text-sm">Test your agent with a real phone call</p>
        </div>
        <div className="bg-brand-surface p-4 rounded-lg border border-brand-border">
          <p className="text-xs text-brand-cyan uppercase font-medium mb-1">Call Status</p>
          <p className="text-lg font-semibold">
            {isCalling ? '📞 Calling...' : callActive ? '🎤 Active' : '⏹️ Idle'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-8">
        {/* Dialer */}
        <div className="bg-brand-card rounded-lg border border-brand-border p-6">
          <h3 className="font-semibold text-white mb-4">Test Dialer</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-brand-teal mb-2">
                Your Phone Number
              </label>
              <input
                type="tel"
                placeholder="+91 98765 43210"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                disabled={callActive || isCalling}
                className="w-full px-4 py-2 border border-brand-border bg-brand-bg text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-cyan disabled:opacity-50 placeholder:text-brand-muted"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-teal mb-2">
                Call Language
              </label>
              <select
                disabled={callActive || isCalling}
                className="w-full px-4 py-2 border border-brand-border bg-brand-bg text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-cyan disabled:opacity-50"
              >
                <option>English</option>
                <option>Hindi</option>
                <option>Tamil</option>
                <option>Telugu</option>
              </select>
            </div>
            <p className="text-xs text-brand-muted">
              ✓ No credits will be used for test calls
            </p>
            <div className="flex gap-3">
              {!callActive ? (
                <button
                  onClick={handleStartCall}
                  disabled={isCalling || !phoneNumber}
                  className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-brand-border text-white font-medium py-3 rounded-lg transition"
                >
                  <Phone size={18} />
                  {isCalling ? 'Calling...' : 'Call Now'}
                </button>
              ) : (
                <button
                  onClick={handleEndCall}
                  className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-medium py-3 rounded-lg transition"
                >
                  <PhoneOff size={18} />
                  End Call
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Transcript */}
        <div className="bg-brand-card rounded-lg border border-brand-border p-6">
          <h3 className="font-semibold text-white mb-4">Live Transcript</h3>
          <div className="bg-brand-bg rounded-lg p-4 h-64 overflow-y-auto font-mono text-sm text-brand-mint">
            {transcript.length === 0 ? (
              <p className="text-brand-muted">Call transcript will appear here...</p>
            ) : (
              <div className="space-y-2">
                {transcript.filter(Boolean).map((entry, idx) => (
                  <div key={idx} className="flex gap-3">
                    <span className="text-brand-muted flex-shrink-0">{entry.timestamp}</span>
                    <div>
                      <span className={entry.speaker === 'Agent' ? 'text-brand-cyan' : 'text-green-400'}>
                        {entry.speaker}:
                      </span>
                      <span className="text-brand-mint ml-2">{entry.text}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <Link
          href={`/builder/${agent.id}`}
          className="flex-1 bg-brand-surface hover:bg-brand-card border border-brand-border text-white font-medium py-2 px-4 rounded-lg transition text-center"
        >
          Edit Agent
        </Link>
        <Link
          href={`/deploy/${agent.id}`}
          className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition text-center"
        >
          Deploy
        </Link>
      </div>
    </div>
  );
}
