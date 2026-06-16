'use client';

import { WorkflowNode } from '@/types';
import { X } from 'lucide-react';

interface NodeEditorProps {
  node: WorkflowNode | null;
  onUpdate: (node: WorkflowNode) => void;
  onClose: () => void;
}

export function NodeEditor({ node, onUpdate, onClose }: NodeEditorProps) {
  if (!node) return null;

  const handleTextChange = (field: string, value: string) => {
    onUpdate({
      ...node,
      data: {
        ...node.data,
        [field]: value,
      },
    });
  };

  return (
    <div className="fixed right-0 top-0 w-80 h-screen bg-brand-surface shadow-lg border-l border-brand-border overflow-y-auto z-40">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-semibold text-white capitalize">{node.type} Node</h3>
          <button
            onClick={onClose}
            className="text-brand-muted hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-brand-teal mb-1">
              Label
            </label>
            <input
              type="text"
              value={node.data.label || ''}
              onChange={(e) => handleTextChange('label', e.target.value)}
              className="w-full px-3 py-2 border border-brand-border bg-brand-bg text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-cyan"
            />
          </div>

          {node.type === 'speak' && (
            <>
              <div>
                <label className="block text-sm font-medium text-brand-teal mb-1">
                  Text to Speak
                </label>
                <textarea
                  value={node.data.text || ''}
                  onChange={(e) => handleTextChange('text', e.target.value)}
                  className="w-full px-3 py-2 border border-brand-border bg-brand-bg text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-cyan h-24"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-teal mb-1">
                  Voice
                </label>
                <select
                  value={node.data.voice || 'male'}
                  onChange={(e) => handleTextChange('voice', e.target.value)}
                  className="w-full px-3 py-2 border border-brand-border bg-brand-bg text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-cyan"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </>
          )}

          {node.type === 'listen' && (
            <>
              <div>
                <label className="block text-sm font-medium text-brand-teal mb-1">
                  Prompt
                </label>
                <textarea
                  value={node.data.prompt || ''}
                  onChange={(e) => handleTextChange('prompt', e.target.value)}
                  className="w-full px-3 py-2 border border-brand-border bg-brand-bg text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-cyan h-20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-teal mb-1">
                  Timeout (seconds)
                </label>
                <input
                  type="number"
                  value={node.data.timeout || 10}
                  onChange={(e) => handleTextChange('timeout', e.target.value)}
                  className="w-full px-3 py-2 border border-brand-border bg-brand-bg text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-cyan"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-teal mb-1">
                  Fallback Message
                </label>
                <input
                  type="text"
                  value={node.data.fallback || ''}
                  onChange={(e) => handleTextChange('fallback', e.target.value)}
                  className="w-full px-3 py-2 border border-brand-border bg-brand-bg text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-cyan"
                />
              </div>
            </>
          )}

          <button
            onClick={onClose}
            className="w-full bg-brand-border hover:bg-brand-teal text-white font-medium py-2 rounded-lg transition mt-6"
          >
            Done Editing
          </button>
        </div>
      </div>
    </div>
  );
}
