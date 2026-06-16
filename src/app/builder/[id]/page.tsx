'use client';

import { useState, useEffect, use } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { AGENT_TEMPLATES, MOCK_AGENTS } from '@/data';
import { Agent, WorkflowNode } from '@/types';
import { NodeEditor } from '@/components/NodeEditor';
import { Save, ArrowLeft } from 'lucide-react';
import { getAgent, saveAgent } from '@/utils/agentStorage';

function SimpleWorkflowDiagram({ nodes }: { nodes: WorkflowNode[] }) {
  return (
    <div className="bg-brand-bg p-6 rounded-lg border border-brand-border mb-6">
      <h3 className="font-semibold text-white mb-4">Workflow Diagram</h3>
      <div className="space-y-2">
        {nodes.length === 0 ? (
          <p className="text-brand-muted text-sm">No nodes yet</p>
        ) : (
          nodes.map((node, idx) => (
            <div key={node.id}>
              {idx > 0 && <div className="text-center text-brand-border text-xs py-1">↓</div>}
              <div className="bg-brand-surface p-3 rounded border border-brand-border text-sm">
                <span className="font-medium capitalize text-brand-cyan">[{node.type}]</span><span className="text-brand-teal ml-1">{node.data.label}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default function BuilderPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const searchParams = useSearchParams();
  const templateId = searchParams.get('template');
  const [agent, setAgent] = useState<Agent | null>(null);
  const [selectedNode, setSelectedNode] = useState<WorkflowNode | null>(null);
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState('');

  useEffect(() => {
    if (id === 'new' && templateId) {
      const template = AGENT_TEMPLATES.find((t) => t.id === templateId);
      if (template) {
        const newAgent: Agent = {
          id: `agent-${Date.now()}`,
          name: `${template.name} - Copy`,
          template_type: template.type,
          workflow: template.workflow,
          integrations: [],
          status: 'draft',
          created_at: new Date().toISOString().split('T')[0],
          last_modified: new Date().toISOString().split('T')[0],
          language: 'en',
        };
        saveAgent(newAgent);
        setAgent(newAgent);
        setTempName(newAgent.name);
      }
    } else {
      const fromStorage = getAgent(id);
      if (fromStorage) {
        setAgent(fromStorage);
        setTempName(fromStorage.name);
      } else {
        const existing = MOCK_AGENTS.find((a) => a.id === id);
        if (existing) {
          setAgent(existing);
          setTempName(existing.name);
        }
      }
    }
  }, [id, templateId]);

  const handleNodeUpdate = (updatedNode: WorkflowNode) => {
    if (!agent) return;
    const updated = {
      ...agent,
      workflow: agent.workflow.map((n) => (n.id === updatedNode.id ? updatedNode : n)),
      last_modified: new Date().toISOString().split('T')[0],
    };
    saveAgent(updated);
    setAgent(updated);
    setSelectedNode(updatedNode);
  };

  const handleSaveName = () => {
    if (!agent || !tempName.trim()) {
      setTempName(agent?.name || '');
      setIsEditingName(false);
      return;
    }
    const updated = {
      ...agent,
      name: tempName.trim(),
      last_modified: new Date().toISOString().split('T')[0],
    };
    saveAgent(updated);
    setAgent(updated);
    setIsEditingName(false);
  };

  if (!agent) {
    return (
      <div className="text-center py-12">
        <p className="text-brand-teal">Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <Link href="/dashboard" className="text-brand-cyan hover:text-brand-teal text-sm font-medium mb-4 inline-flex items-center gap-1">
          <ArrowLeft size={16} />
          Back to Dashboard
        </Link>
        {isEditingName ? (
          <div className="mb-4">
            <input
              type="text"
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              onBlur={handleSaveName}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSaveName();
                if (e.key === 'Escape') {
                  setTempName(agent?.name || '');
                  setIsEditingName(false);
                }
              }}
              autoFocus
              className="text-3xl font-bold text-white bg-transparent border-b-2 border-brand-cyan focus:outline-none py-1 px-0"
            />
          </div>
        ) : (
          <div
            onClick={() => {
              setTempName(agent?.name || '');
              setIsEditingName(true);
            }}
            className="cursor-pointer hover:opacity-80 transition mb-2"
          >
            <h2 className="text-3xl font-bold text-white mb-1">{agent.name}</h2>
          </div>
        )}
        <p className="text-brand-teal">Edit your agent workflow</p>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-brand-card p-4 rounded-lg border border-brand-border">
          <p className="text-xs text-brand-muted uppercase font-medium mb-1">Status</p>
          <p className="text-lg font-semibold text-white capitalize">{agent.status}</p>
        </div>
        <div className="bg-brand-card p-4 rounded-lg border border-brand-border">
          <p className="text-xs text-brand-muted uppercase font-medium mb-1">Template</p>
          <p className="text-lg font-semibold text-white capitalize">{agent.template_type.replace('_', ' ')}</p>
        </div>
        <div className="bg-brand-card p-4 rounded-lg border border-brand-border">
          <p className="text-xs text-brand-muted uppercase font-medium mb-1">Nodes</p>
          <p className="text-lg font-semibold text-white">{agent.workflow.length}</p>
        </div>
      </div>

      <SimpleWorkflowDiagram nodes={agent.workflow} />

      <div className="bg-brand-card rounded-lg border border-brand-border p-6 mb-6">
        <h3 className="font-semibold text-white mb-4">Workflow Nodes</h3>
        <div className="space-y-2">
          {agent.workflow.map((node) => (
            <button
              key={node.id}
              onClick={() => setSelectedNode(node)}
              className={`w-full text-left p-3 rounded-lg border-2 transition ${
                selectedNode?.id === node.id
                  ? 'border-brand-cyan bg-brand-cyan/10'
                  : 'border-brand-border bg-brand-surface hover:border-brand-cyan/50'
              }`}
            >
              <span className="font-medium capitalize text-brand-cyan">[{node.type}]</span>
              <span className="text-brand-teal ml-2">{node.data.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <Link
          href={`/test/${agent.id}`}
          className="flex-1 bg-brand-purple hover:bg-brand-purple/80 text-white font-medium py-2 px-4 rounded-lg transition text-center"
        >
          Test Agent
        </Link>
        <Link
          href={`/deploy/${agent.id}`}
          className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition"
        >
          <Save size={16} />
          Deploy
        </Link>
      </div>

      <NodeEditor
        node={selectedNode}
        onUpdate={handleNodeUpdate}
        onClose={() => setSelectedNode(null)}
      />
    </div>
  );
}
