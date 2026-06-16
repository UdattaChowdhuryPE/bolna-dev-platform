'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MOCK_AGENTS } from '@/data';
import { Agent } from '@/types';
import { CheckCircle, ArrowLeft, Download } from 'lucide-react';

export default function DeployPage({ params }: { params: { id: string } }) {
  const agent = MOCK_AGENTS.find((a) => a.id === params.id);
  const [isDeploying, setIsDeploying] = useState(false);
  const [deployed, setDeployed] = useState(false);

  const handleDeploy = () => {
    setIsDeploying(true);
    setTimeout(() => {
      setIsDeploying(false);
      setDeployed(true);
    }, 2000);
  };

  if (!agent) {
    return (
      <div className="text-center py-12">
        <p className="text-brand-teal">Agent not found</p>
      </div>
    );
  }

  return (
    <div>
      <Link href="/dashboard" className="text-brand-cyan hover:text-brand-teal text-sm font-medium mb-4 inline-flex items-center gap-1">
        <ArrowLeft size={16} />
        Back to Dashboard
      </Link>

      {!deployed ? (
        <>
          <h2 className="text-3xl font-bold text-white mb-8">Deploy {agent.name}</h2>

          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="bg-brand-card rounded-lg border border-brand-border p-6">
              <h3 className="font-semibold text-white mb-4">Review Configuration</h3>
              <div className="space-y-3 mb-6">
                <div className="pb-3 border-b border-brand-border">
                  <p className="text-xs text-brand-muted uppercase font-medium">Agent Name</p>
                  <p className="text-white font-medium">{agent.name}</p>
                </div>
                <div className="pb-3 border-b border-brand-border">
                  <p className="text-xs text-brand-muted uppercase font-medium">Template Type</p>
                  <p className="text-white font-medium capitalize">{agent.template_type.replace('_', ' ')}</p>
                </div>
                <div className="pb-3 border-b border-brand-border">
                  <p className="text-xs text-brand-muted uppercase font-medium">Workflow Nodes</p>
                  <p className="text-white font-medium">{agent.workflow.length} nodes configured</p>
                </div>
                <div className="pb-3">
                  <p className="text-xs text-brand-muted uppercase font-medium">Integrations</p>
                  <p className="text-white font-medium">
                    {agent.integrations.length === 0 ? 'None' : agent.integrations.map(i => i.name).join(', ')}
                  </p>
                </div>
              </div>
              <button
                onClick={handleDeploy}
                disabled={isDeploying}
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-brand-border text-white font-medium py-3 rounded-lg transition"
              >
                {isDeploying ? 'Deploying...' : '🚀 Deploy Now'}
              </button>
            </div>

            <div className="bg-brand-surface rounded-lg border border-brand-border p-6">
              <h3 className="font-semibold text-white mb-4">Deployment Options</h3>
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="radio" name="deploy" defaultChecked className="w-4 h-4" />
                  <span className="text-white">
                    <p className="font-medium">Start Immediately</p>
                    <p className="text-xs text-brand-teal">Agent will be active and receive calls right now</p>
                  </span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="radio" name="deploy" className="w-4 h-4" />
                  <span className="text-white">
                    <p className="font-medium">Schedule Start</p>
                    <p className="text-xs text-brand-teal">Choose a specific date and time</p>
                  </span>
                </label>
              </div>
              <div className="mt-6 p-3 bg-brand-bg rounded border border-brand-border text-xs text-brand-teal">
                <p className="font-medium text-white mb-1">✓ No setup required</p>
                <p>Your agent will be ready to receive calls immediately after deployment.</p>
              </div>
            </div>
          </div>

          <div className="bg-yellow-900/20 border border-yellow-800/50 rounded-lg p-4 mb-6">
            <p className="text-sm text-yellow-400">
              <span className="font-semibold">Note:</span> This is a demo deployment. In production, your agent configuration would be synced with Bolna\'s API.
            </p>
          </div>
        </>
      ) : (
        <div className="bg-brand-card rounded-lg border border-green-900/30 p-12 text-center">
          <CheckCircle size={48} className="text-green-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Agent Deployed Successfully! 🎉</h2>
          <p className="text-green-400 mb-6">Your agent is now live and ready to receive calls.</p>
          
          <div className="bg-brand-bg rounded-lg p-6 mb-6 text-left max-w-md mx-auto border border-brand-border">
            <p className="text-xs text-brand-muted uppercase font-medium mb-2">Agent Status</p>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-white font-medium">ACTIVE & RECEIVING CALLS</span>
            </div>
            
            <div className="space-y-3 text-sm text-brand-teal">
              <div>
                <p className="font-medium text-white">Next Steps:</p>
              </div>
              <ul className="space-y-2 ml-4 list-disc">
                <li>View call logs in the analytics dashboard</li>
                <li>Monitor call quality and agent performance</li>
                <li>Update agent configuration anytime</li>
              </ul>
            </div>
          </div>

          <div className="flex gap-3 max-w-md mx-auto">
            <Link
              href="/dashboard"
              className="flex-1 bg-brand-cyan hover:bg-brand-teal text-brand-bg font-medium py-2 rounded-lg transition text-center"
            >
              Back to Dashboard
            </Link>
            <button
              className="flex-1 flex items-center justify-center gap-2 border border-brand-border hover:bg-brand-surface text-white font-medium py-2 rounded-lg transition"
            >
              <Download size={16} />
              Export Config
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
