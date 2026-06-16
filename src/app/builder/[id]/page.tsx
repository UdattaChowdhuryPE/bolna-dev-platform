'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { AGENT_TEMPLATES, MOCK_AGENTS } from '@/data';
import { Agent, WorkflowNode } from '@/types';
import { NodeEditor } from '@/components/NodeEditor';
import { Save, ArrowLeft } from 'lucide-react';

function SimpleWorkflowDiagram({ nodes }: { nodes: WorkflowNode[] }) {
  return (
    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
      <h3 className="font-semibold text-gray-900 mb-4">Workflow Diagram</h3>
      <div className="space-y-2">
        {nodes.length === 0 ? (
          <p className="text-gray-500 text-sm">No nodes yet</p>
        ) : (
          nodes.map((node, idx) => (
            <div key={node.id}>
              {idx > 0 && <div className="text-center text-gray-400 text-xs py-1">↓</div>}
              <div className="bg-white p-3 rounded border border-gray-300 text-sm">
                <span className="font-medium capitalize">[{node.type}]</span> {node.data.label}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default function BuilderPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const templateId = searchParams.get('template');
  const [agent, setAgent] = useState<Agent | null>(null);
  const [selectedNode, setSelectedNode] = useState<WorkflowNode | null>(null);

  useEffect(() => {
    if (params.id === 'new' && templateId) {
      const template = AGENT_TEMPLATES.find((t) => t.id === templateId);
      if (template) {
        setAgent({
          id: `agent-${Date.now()}`,
          name: `${template.name} - Copy`,
          template_type: template.type,
          workflow: template.workflow,
          integrations: [],
          status: 'draft',
          created_at: new Date().toISOString().split('T')[0],
          last_modified: new Date().toISOString().split('T')[0],
          language: 'en',
        });
      }
    } else {
      const existing = MOCK_AGENTS.find((a) => a.id === params.id);
      if (existing) setAgent(existing);
    }
  }, [params.id, templateId]);

  const handleNodeUpdate = (updatedNode: WorkflowNode) => {
    if (!agent) return;
    setAgent({
      ...agent,
      workflow: agent.workflow.map((n) => (n.id === updatedNode.id ? updatedNode : n)),
    });
    setSelectedNode(updatedNode);
  };

  if (!agent) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <Link href="/dashboard" className="text-blue-600 hover:text-blue-700 text-sm font-medium mb-4 inline-flex items-center gap-1">
          <ArrowLeft size={16} />
          Back to Dashboard
        </Link>
        <h2 className="text-3xl font-bold text-gray-900 mb-1">{agent.name}</h2>
        <p className="text-gray-600">Edit your agent workflow</p>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-xs text-gray-600 uppercase font-medium mb-1">Status</p>
          <p className="text-lg font-semibold text-gray-900 capitalize">{agent.status}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-xs text-gray-600 uppercase font-medium mb-1">Template</p>
          <p className="text-lg font-semibold text-gray-900 capitalize">{agent.template_type.replace('_', ' ')}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-xs text-gray-600 uppercase font-medium mb-1">Nodes</p>
          <p className="text-lg font-semibold text-gray-900">{agent.workflow.length}</p>
        </div>
      </div>

      <SimpleWorkflowDiagram nodes={agent.workflow} />

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h3 className="font-semibold text-gray-900 mb-4">Workflow Nodes</h3>
        <div className="space-y-2">
          {agent.workflow.map((node) => (
            <button
              key={node.id}
              onClick={() => setSelectedNode(node)}
              className={`w-full text-left p-3 rounded-lg border-2 transition ${
                selectedNode?.id === node.id
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <span className="font-medium capitalize text-gray-900">[{node.type}]</span>
              <span className="text-gray-600 ml-2">{node.data.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <Link
          href={`/test/${agent.id}`}
          className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition text-center"
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
