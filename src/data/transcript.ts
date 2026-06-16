import { TranscriptEntry } from '@/types';

export const MOCK_TRANSCRIPT: TranscriptEntry[] = [
  {
    timestamp: '14:23:01',
    speaker: 'Agent',
    text: 'Welcome to HDFC Lead Qualifier. What is your name?'
  },
  {
    timestamp: '14:23:05',
    speaker: 'Caller',
    text: '[captured speech]'
  },
  {
    timestamp: '14:23:06',
    speaker: 'Agent',
    text: 'Thank you. Are you interested in hearing about our premium banking services?'
  },
  {
    timestamp: '14:23:12',
    speaker: 'Caller',
    text: '[captured speech]'
  },
  {
    timestamp: '14:23:13',
    speaker: 'Agent',
    text: 'Great! Let me transfer you to a specialist who can help you better.'
  },
  {
    timestamp: '14:23:15',
    speaker: 'Agent',
    text: '[Transferring to human agent...]'
  }
];
