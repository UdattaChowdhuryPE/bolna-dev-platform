import { AgentTemplate } from '@/types';

export const AGENT_TEMPLATES: AgentTemplate[] = [
  {
    id: 'recruitment',
    name: 'Recruitment Screening',
    type: 'recruitment',
    description: 'Pre-qualify candidates by asking key questions',
    use_case: 'HR',
    icon: '👨‍💼',
    workflow: [
      {
        id: 'speak-1',
        type: 'speak',
        position: { x: 250, y: 50 },
        data: {
          label: 'Welcome',
          text: 'Welcome to our recruitment screening. This is an automated call. Press 1 to continue.',
          voice: 'male'
        }
      },
      {
        id: 'listen-1',
        type: 'listen',
        position: { x: 250, y: 150 },
        data: {
          label: 'Collect Name',
          prompt: 'What is your name?',
          timeout: 10,
          fallback: 'I did not catch that.'
        }
      },
      {
        id: 'speak-2',
        type: 'speak',
        position: { x: 250, y: 250 },
        data: {
          label: 'Experience Q',
          text: 'How many years of experience do you have?',
          voice: 'male'
        }
      },
      {
        id: 'listen-2',
        type: 'listen',
        position: { x: 250, y: 350 },
        data: {
          label: 'Experience Input',
          prompt: 'Please enter your years of experience',
          timeout: 10,
          fallback: 'Let me try again.'
        }
      },
      {
        id: 'handoff',
        type: 'handoff',
        position: { x: 250, y: 450 },
        data: {
          label: 'Transfer to HR',
          target: 'human'
        }
      }
    ]
  },
  {
    id: 'lead_qualification',
    name: 'Lead Qualification',
    type: 'lead_qualification',
    description: 'Route hot and cold leads efficiently',
    use_case: 'Sales',
    icon: '🎯',
    workflow: [
      {
        id: 'speak-1',
        type: 'speak',
        position: { x: 250, y: 50 },
        data: {
          label: 'Greeting',
          text: 'Hello, this is an automated call from XYZ. We have a special offer for you.',
          voice: 'female'
        }
      },
      {
        id: 'listen-1',
        type: 'listen',
        position: { x: 250, y: 150 },
        data: {
          label: 'Qualification',
          prompt: 'Are you interested in learning more? Press 1 for yes, 2 for no.',
          timeout: 10,
          fallback: 'I did not hear a response.'
        }
      },
      {
        id: 'condition-1',
        type: 'condition',
        position: { x: 250, y: 250 },
        data: {
          label: 'Route Decision',
          expression: 'interest == true'
        }
      }
    ]
  },
  {
    id: 'abandonment',
    name: 'Cart Abandonment',
    type: 'abandonment',
    description: 'Recover abandoned shopping carts',
    use_case: 'E-Commerce',
    icon: '🛒',
    workflow: [
      {
        id: 'speak-1',
        type: 'speak',
        position: { x: 250, y: 50 },
        data: {
          label: 'Recovery Offer',
          text: 'Hi! We noticed you left items in your cart. We have a 20% discount just for you.',
          voice: 'female'
        }
      },
      {
        id: 'listen-1',
        type: 'listen',
        position: { x: 250, y: 150 },
        data: {
          label: 'Interest Check',
          prompt: 'Would you like to complete your purchase?',
          timeout: 10,
          fallback: 'No response received.'
        }
      }
    ]
  },
  {
    id: 'appointment_reminder',
    name: 'Appointment Reminder',
    type: 'appointment_reminder',
    description: 'Confirm and reschedule appointments',
    use_case: 'Service',
    icon: '📅',
    workflow: [
      {
        id: 'speak-1',
        type: 'speak',
        position: { x: 250, y: 50 },
        data: {
          label: 'Reminder',
          text: 'This is a reminder about your appointment tomorrow at 2 PM.',
          voice: 'male'
        }
      },
      {
        id: 'listen-1',
        type: 'listen',
        position: { x: 250, y: 150 },
        data: {
          label: 'Confirmation',
          prompt: 'Press 1 to confirm, 2 to reschedule, 3 to cancel.',
          timeout: 10,
          fallback: 'Please try again.'
        }
      }
    ]
  },
  {
    id: 'support_triage',
    name: 'Support Triage',
    type: 'support_triage',
    description: 'Route to correct support tier',
    use_case: 'Support',
    icon: '🆘',
    workflow: [
      {
        id: 'speak-1',
        type: 'speak',
        position: { x: 250, y: 50 },
        data: {
          label: 'Welcome',
          text: 'Thank you for calling support. Press 1 for billing, 2 for technical issues, 3 for other.',
          voice: 'male'
        }
      },
      {
        id: 'listen-1',
        type: 'listen',
        position: { x: 250, y: 150 },
        data: {
          label: 'Category',
          prompt: 'Please select your issue category',
          timeout: 10,
          fallback: 'Selection not recognized.'
        }
      },
      {
        id: 'handoff',
        type: 'handoff',
        position: { x: 250, y: 250 },
        data: {
          label: 'Transfer to Agent',
          target: 'human'
        }
      }
    ]
  }
];
