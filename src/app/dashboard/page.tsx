'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { MOCK_AGENTS } from '@/data';
import { Agent } from '@/types';
import { Plus, Edit2, Play, Trash2 } from 'lucide-react';
import { getAgents, deleteAgent } from '@/utils/agentStorage';

function AgentCard({ agent, onDelete }: { agent: Agent; onDelete: (id: string) => void }) {
  const statusColors = {
    active: 'bg-green-900/20 text-green-400',
    draft: 'bg-yellow-900/20 text-yellow-400',
    paused: 'bg-white/10 text-brand-muted',
    archived: 'bg-red-900/20 text-red-400'
  };

  const templateIcons: Record<string, string> = {
    recruitment: '\u{1F468}‍\u{1F4BC}',
    lead_qualification: '\u{1F3AF}',
    abandonment: '\u{1F6D2}',
    appointment_reminder: '\u{1F4C5}',
    support_triage: '\u{1F518}'
  };

  return (
    <div className="bg-brand-card rounded-lg border border-brand-border p-6 hover:border-brand-cyan/50 transition">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start gap-3">
          <span className="text-3xl">{templateIcons[agent.template_type] || '\u{1F916}'}</span>
          <div>
            <h3 className="font-semibold text-white">{agent.name}</h3>
            <p className="text-sm text-brand-teal capitalize">{agent.template_type.replace('_', ' ')}</p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[agent.status]}`}>
          {agent.status.charAt(0).toUpperCase() + agent.status.slice(1)}
        </span>
      </div>
      <p className="text-xs text-brand-muted mb-4">Modified {agent.last_modified}</p>
      <div className="flex gap-2">
        <Link
          href={`/builder/${agent.id}`}
          className="flex-1 flex items-center justify-center gap-2 bg-brand-purple hover:bg-brand-purple/80 text-white text-sm font-medium py-2 rounded transition"
        >
          <Edit2 size={14} />
          Edit
        </Link>
        <Link
          href={`/test/${agent.id}`}
          className="flex-1 flex items-center justify-center gap-2 bg-brand-cyan hover:bg-brand-teal text-brand-bg text-sm font-medium py-2 rounded transition"
        >
          <Play size={14} />
          Test
        </Link>
        <button
          onClick={() => {
            if (confirm(`Are you sure you want to delete "${agent.name}"?`)) {
              deleteAgent(agent.id);
              onDelete(agent.id);
            }
          }}
          className="flex-1 flex items-center justify-center gap-2 bg-red-900/20 hover:bg-red-900/40 text-red-400 text-sm font-medium py-2 rounded transition border border-red-900/50"
          title="Delete agent"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [agents, setAgents] = useState<Agent[]>([]);

  useEffect(() => {
    const storedAgents = getAgents();
    const allAgents = [...storedAgents, ...MOCK_AGENTS.filter(m => !storedAgents.find(s => s.id === m.id))];
    setAgents(allAgents);
  }, []);

  const handleDelete = (id: string) => {
    setAgents(agents.filter(a => a.id !== id));
  };

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-white mb-1">My Agents</h2>
            <p className="text-brand-teal">Create and manage your voice agents</p>
          </div>
          <Link
            href="/templates"
            className="flex items-center gap-2 bg-brand-cyan hover:bg-brand-teal text-brand-bg font-medium py-2 px-4 rounded-lg transition"
          >
            <Plus size={20} />
            Create Agent
          </Link>
        </div>
      </div>

      {agents.length === 0 ? (
        <div className="bg-brand-card rounded-lg border border-brand-border p-12 text-center">
          <p className="text-brand-teal mb-4">No agents yet. Create one to get started.</p>
          <Link
            href="/templates"
            className="inline-block bg-brand-cyan hover:bg-brand-teal text-brand-bg font-medium py-2 px-6 rounded-lg transition"
          >
            Create Your First Agent
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {agents.map((agent) => (
            <AgentCard key={agent.id} agent={agent} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
}
