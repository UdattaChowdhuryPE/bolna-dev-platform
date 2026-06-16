'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MOCK_AGENTS, MOCK_TRANSCRIPT } from '@/data';
import { Agent, TranscriptEntry } from '@/types';
import { Phone, PhoneOff, ArrowLeft } from 'lucide-react';

export default function TestDialerPage({ params }: { params: { id: string } }) {
  const agent = MOCK_AGENTS.find((a) => a.id === params.id);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isCalling, setIsCalling] = useState(false);
  const [callActive, setCallActive] = useState(false);
  const [transcript, setTranscript] = useState<TranscriptEntry[]>([]);

  const handleStartCall = () => {
    if (!phoneNumber) {
      alert('Please enter a phone number');
      return;
    }
    setIsCalling(true);
    setCallActive(false);
    setTranscript([]);

    // Simulate call starting after 3 seconds
    setTimeout(() => {
      setIsCalling(false);
      setCallActive(true);
      // Simulate transcript appearing
      let index = 0;
      const interval = setInterval(() => {
        if (index < MOCK_TRANSCRIPT.length) {
          setTranscript((prev) => [...prev, MOCK_TRANSCRIPT[index]]);
          index++;
        } else {
          clearInterval(interval);
        }
      }, 500);
    }, 3000);
  };

  const handleEndCall = () => {
    setCallActive(false);
    setIsCalling(false);
  };

  if (!agent) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Agent not found</p>
      </div>
    );
  }

  return (
    <div>
      <Link href="/dashboard" className="text-blue-600 hover:text-blue-700 text-sm font-medium mb-4 inline-flex items-center gap-1">
        <ArrowLeft size={16} />
        Back to Dashboard
      </Link>

      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-4 rounded-lg border border-gray-200 col-span-2">
          <h2 className="text-2xl font-bold text-gray-900 mb-1">{agent.name}</h2>
          <p className="text-gray-600 text-sm">Test your agent with a real phone call</p>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <p className="text-xs text-blue-700 uppercase font-medium mb-1">Call Status</p>
          <p className="text-lg font-semibold">
            {isCalling ? '📞 Calling...' : callActive ? '🎤 Active' : '⏹️ Idle'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-8">
        {/* Dialer */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Test Dialer</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Phone Number
              </label>
              <input
                type="tel"
                placeholder="+91 98765 43210"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                disabled={callActive || isCalling}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Call Language
              </label>
              <select
                disabled={callActive || isCalling}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              >
                <option>English</option>
                <option>Hindi</option>
                <option>Tamil</option>
                <option>Telugu</option>
              </select>
            </div>
            <p className="text-xs text-gray-500">
              ✓ No credits will be used for test calls
            </p>
            <div className="flex gap-3">
              {!callActive ? (
                <button
                  onClick={handleStartCall}
                  disabled={isCalling || !phoneNumber}
                  className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white font-medium py-3 rounded-lg transition"
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
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Live Transcript</h3>
          <div className="bg-gray-900 rounded-lg p-4 h-64 overflow-y-auto font-mono text-sm text-gray-300">
            {transcript.length === 0 ? (
              <p className="text-gray-500">Call transcript will appear here...</p>
            ) : (
              <div className="space-y-2">
                {transcript.map((entry, idx) => (
                  <div key={idx} className="flex gap-3">
                    <span className="text-gray-500 flex-shrink-0">{entry.timestamp}</span>
                    <div>
                      <span className={entry.speaker === 'Agent' ? 'text-blue-400' : 'text-green-400'}>
                        {entry.speaker}:
                      </span>
                      <span className="text-gray-300 ml-2">{entry.text}</span>
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
          className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition text-center"
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
