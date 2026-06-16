import { getAgent, saveAgent, getAgents, deleteAgent } from './agentStorage';
import { Agent } from '@/types';

describe('agentStorage', () => {
  const mockAgent: Agent = {
    id: 'test-agent-1',
    name: 'Test Agent',
    template_type: 'lead_qualification',
    status: 'draft',
    created_at: '2026-06-17',
    last_modified: '2026-06-17',
    language: 'en',
    integrations: [],
    workflow: [],
  };

  beforeEach(() => {
    if (typeof window !== 'undefined') {
      localStorage.clear();
    }
  });

  test('saveAgent and getAgent should work', () => {
    saveAgent(mockAgent);
    const retrieved = getAgent('test-agent-1');
    expect(retrieved).toEqual(mockAgent);
  });

  test('getAgent should return null for non-existent agent', () => {
    const retrieved = getAgent('non-existent');
    expect(retrieved).toBeNull();
  });

  test('getAgents should return all agents', () => {
    saveAgent(mockAgent);
    const agent2: Agent = {...mockAgent, id: 'test-agent-2', name: 'Test Agent 2'};
    saveAgent(agent2);
    const agents = getAgents();
    expect(agents).toHaveLength(2);
    expect(agents.find(a => a.id === 'test-agent-1')).toBeDefined();
    expect(agents.find(a => a.id === 'test-agent-2')).toBeDefined();
  });

  test('deleteAgent should remove agent', () => {
    saveAgent(mockAgent);
    expect(getAgent('test-agent-1')).toBeDefined();
    deleteAgent('test-agent-1');
    expect(getAgent('test-agent-1')).toBeNull();
  });

  test('saveAgent should update existing agent', () => {
    saveAgent(mockAgent);
    const updated = {...mockAgent, name: 'Updated Agent'};
    saveAgent(updated);
    const retrieved = getAgent('test-agent-1');
    expect(retrieved?.name).toBe('Updated Agent');
    expect(getAgents()).toHaveLength(1);
  });
});
