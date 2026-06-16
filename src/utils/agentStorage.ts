import { Agent } from '@/types';

const AGENTS_STORAGE_KEY = 'bolna_agents';

export function getAgents(): Agent[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(AGENTS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function getAgent(id: string): Agent | null {
  const agents = getAgents();
  return agents.find((a) => a.id === id) || null;
}

export function saveAgent(agent: Agent): void {
  if (typeof window === 'undefined') return;
  const agents = getAgents();
  const existingIndex = agents.findIndex((a) => a.id === agent.id);
  if (existingIndex >= 0) {
    agents[existingIndex] = agent;
  } else {
    agents.push(agent);
  }
  localStorage.setItem(AGENTS_STORAGE_KEY, JSON.stringify(agents));
}

export function deleteAgent(id: string): void {
  if (typeof window === 'undefined') return;
  const agents = getAgents();
  const filtered = agents.filter((a) => a.id !== id);
  localStorage.setItem(AGENTS_STORAGE_KEY, JSON.stringify(filtered));
}
