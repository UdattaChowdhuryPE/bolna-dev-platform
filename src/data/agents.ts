import { Agent } from '@/types';

export const MOCK_AGENTS: Agent[] = [
  {
    id: 'agent-1',
    name: 'HDFC Lead Qualifier',
    template_type: 'lead_qualification',
    status: 'active',
    created_at: '2026-05-15',
    last_modified: '2026-06-10',
    language: 'en',
    integrations: [
      {
        id: 'int-1',
        type: 'salesforce',
        name: 'HDFC Salesforce',
        config: { instance_url: 'hdfc.salesforce.com' }
      }
    ],
    workflow: []
  },
  {
    id: 'agent-2',
    name: 'Myntra Cart Recovery',
    template_type: 'abandonment',
    status: 'active',
    created_at: '2026-05-20',
    last_modified: '2026-06-12',
    language: 'en',
    integrations: [
      {
        id: 'int-2',
        type: 'hubspot',
        name: 'Myntra HubSpot',
        config: { object_type: 'Contact' }
      }
    ],
    workflow: []
  },
  {
    id: 'agent-3',
    name: 'Naukri Recruiter Bot',
    template_type: 'recruitment',
    status: 'draft',
    created_at: '2026-06-13',
    last_modified: '2026-06-13',
    language: 'en',
    integrations: [],
    workflow: []
  }
];
