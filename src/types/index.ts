export type AgentStatus = 'draft' | 'active' | 'paused' | 'archived';

export interface WorkflowNode {
  id: string;
  type: 'speak' | 'listen' | 'condition' | 'branch' | 'handoff' | 'webhook';
  position: { x: number; y: number };
  data: {
    label: string;
    [key: string]: any;
  };
}

export interface Agent {
  id: string;
  name: string;
  template_type: 'recruitment' | 'lead_qualification' | 'abandonment' | 'appointment_reminder' | 'support_triage';
  workflow: WorkflowNode[];
  integrations: Integration[];
  status: AgentStatus;
  created_at: string;
  last_modified: string;
  language: string;
}

export interface Integration {
  id: string;
  type: 'salesforce' | 'hubspot' | 'webhook';
  name: string;
  config: Record<string, any>;
}

export interface AgentTemplate {
  id: string;
  name: string;
  type: 'recruitment' | 'lead_qualification' | 'abandonment' | 'appointment_reminder' | 'support_triage';
  description: string;
  use_case: string;
  workflow: WorkflowNode[];
  icon: string;
}

export interface TranscriptEntry {
  timestamp: string;
  speaker: 'Agent' | 'Caller';
  text: string;
}
