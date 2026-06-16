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
    <div className="fixed right-0 top-0 w-80 h-screen bg-white shadow-lg border-l border-gray-200 overflow-y-auto z-40">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-semibold text-gray-900 capitalize">{node.type} Node</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Label
            </label>
            <input
              type="text"
              value={node.data.label || ''}
              onChange={(e) => handleTextChange('label', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {node.type === 'speak' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Text to Speak
                </label>
                <textarea
                  value={node.data.text || ''}
                  onChange={(e) => handleTextChange('text', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Voice
                </label>
                <select
                  value={node.data.voice || 'male'}
                  onChange={(e) => handleTextChange('voice', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Prompt
                </label>
                <textarea
                  value={node.data.prompt || ''}
                  onChange={(e) => handleTextChange('prompt', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Timeout (seconds)
                </label>
                <input
                  type="number"
                  value={node.data.timeout || 10}
                  onChange={(e) => handleTextChange('timeout', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fallback Message
                </label>
                <input
                  type="text"
                  value={node.data.fallback || ''}
                  onChange={(e) => handleTextChange('fallback', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </>
          )}

          <button
            onClick={onClose}
            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-900 font-medium py-2 rounded-lg transition mt-6"
          >
            Done Editing
          </button>
        </div>
      </div>
    </div>
  );
}
