'use client';

import Link from 'next/link';
import { AGENT_TEMPLATES } from '@/data';
import { AgentTemplate } from '@/types';
import { ArrowRight } from 'lucide-react';

function TemplateCard({ template }: { template: AgentTemplate }) {
  return (
    <div className="bg-brand-card rounded-lg border border-brand-border hover:border-brand-cyan/50 transition">
      <div className="p-6 h-full flex flex-col">
        <div className="flex items-start justify-between mb-4">
          <span className="text-4xl">{template.icon}</span>
          <span className="px-2 py-1 bg-brand-cyan/10 text-brand-cyan text-xs font-medium rounded">
            {template.use_case}
          </span>
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">{template.name}</h3>
        <p className="text-sm text-brand-teal mb-4 flex-grow">{template.description}</p>
        
        <div className="mb-4 p-3 bg-brand-bg rounded text-xs text-brand-teal">
          <p className="font-medium mb-1 text-brand-mint">Workflow Preview:</p>
          <div className="space-y-1">
            {template.workflow.map((node) => (
              <div key={node.id} className="flex items-center gap-1">
                {template.workflow.indexOf(node) > 0 && <span className="text-brand-border">↓</span>}
                <span className="capitalize text-brand-teal">[] {node.type.replace('_', ' ')}</span>
              </div>
            ))}
          </div>
        </div>

        <Link
          href={`/builder/new?template=${template.id}`}
          className="flex items-center justify-center gap-2 w-full bg-brand-cyan hover:bg-brand-teal text-brand-bg font-medium py-2 rounded transition"
        >
          Use Template
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}

export default function Templates() {
  return (
    <div>
      <div className="mb-8">
        <Link href="/dashboard" className="text-brand-cyan hover:text-brand-teal text-sm font-medium mb-4 inline-block">
          ← Back to Dashboard
        </Link>
        <h2 className="text-3xl font-bold text-white mb-1">Agent Templates</h2>
        <p className="text-brand-teal">Start with a pre-built template or build from scratch</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {AGENT_TEMPLATES.map((template) => (
          <TemplateCard key={template.id} template={template} />
        ))}
      </div>
    </div>
  );
}
