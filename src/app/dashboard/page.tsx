'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MOCK_AGENTS } from '@/data';
import { Agent } from '@/types';
import { Plus, Edit2, Play, Trash2 } from 'lucide-react';

function AgentCard({ agent }: { agent: Agent }) {
  const statusColors = {
    active: 'bg-green-100 text-green-800',
    draft: 'bg-yellow-100 text-yellow-800',
    paused: 'bg-gray-100 text-gray-800',
    archived: 'bg-red-100 text-red-800'
  };

  const templateIcons: Record<string, string> = {
    recruitment: '👨‍💼',
    lead_qualification: '🎯',
    abandonment: '🛒',
    appointment_reminder: '📅',
    support_triage: '🔘'
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 hover:shadow-md transition">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start gap-3">
          <span className="text-3xl">{templateIcons[agent.template_type] || '🤖'}</span>
          <div>
            <h3 className="font-semibold text-gray-900">{agent.name}</h3>
            <p className="text-sm text-gray-600 capitalize">{agent.template_type.replace('_', ' ')}</p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[agent.status]}`}>
          {agent.status.charAt(0).toUpperCase() + agent.status.slice(1)}
        </span>
      </div>
      <p className="text-xs text-gray-500 mb-4">Modified {agent.last_modified}</p>
      <div className="flex gap-2">
        <Link
          href={`/builder/${agent.id}`}
          className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 rounded transition"
        >
          <Edit2 size={14} />
          Edit
        </Link>
        <Link
          href={`/test/${agent.id}`}
          className="flex-1 flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium py-2 rounded transition"
        >
          <Play size={14} />
          Test
        </Link>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [agents] = useState<Agent[]>(MOCK_AGENTS);

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-1">My Agents</h2>
            <p className="text-gray-600">Create and manage your voice agents</p>
          </div>
          <Link
            href="/templates"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition"
          >
            <Plus size={20} />
            Create Agent
          </Link>
        </div>
      </div>

      {agents.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <p className="text-gray-600 mb-4">No agents yet. Create one to get started.</p>
          <Link
            href="/templates"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition"
          >
            Create Your First Agent
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {agents.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
        </div>
      )}
    </div>
  );
}
