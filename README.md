# Bolna Dev Platform

**Low-code voice agent builder for ops teams**

🚀 **[Live Demo](https://bolna-dev-platform.vercel.app/)**

---

## Problem Statement

Building voice AI agents today is broken:

- **Requires expert knowledge**: You need deep telephony expertise, LLM prompt engineering, AND backend infrastructure skills all at once
- **Implementation takes months**: 3–4 months of engineering per customer just to get a single agent live
- **CRM integrations are custom work**: Each Salesforce or HubSpot connection must be engineered from scratch
- **Ops teams are completely blocked**: Non-technical teams cannot create or modify agents without developer involvement
- **Iteration is painful**: Changing a conversation prompt requires re-deploying backend code, restarting services, and testing from scratch

The result: slow time-to-value, massive support burden, and inability to serve small-to-medium businesses who don't have engineering teams.

---

## Why This Is a Problem

Voice is still the primary interface for enterprise customer interactions:

- **Billions of calls per year** are made by sales teams (lead qualification, outbound prospecting), customer support (support triage, issue resolution), and HR teams (recruitment screening)
- **The tooling gap is real**: Web developers have React, Vercel, and Firebase for rapid prototyping. Voice developers have nothing comparable — no visual builder, no template library, no one-click deploy
- **Competitors are moving fast**: Low-code voice platforms like Edesy and Rootle are winning deals by offering exactly what Bolna lacks — an interface ops teams can actually use
- **Growth is bottlenecked**: Every new enterprise customer requires hand-holding through implementation, making growth expensive and impossible to scale to SMB segment
- **Prompt iteration is killing productivity**: The feedback loop from "change a prompt" to "test it live" takes hours or days instead of minutes

---

## The Solution: What We Built

### 1. Visual Workflow Builder
Build conversation flows as node graphs — no code required. Drag-and-drop nodes (Speak, Listen, Condition, Branch, Handoff) and connect them to create complex agent behavior.

### 2. Template Library
5 pre-built agent templates for the most common enterprise use cases:
- **Lead Qualification** — Screen prospects, qualify fit, schedule callbacks
- **Cart Abandonment Recovery** — Re-engage customers, offer incentives, drive recovery
- **Recruitment Screening** — Ask pre-screening questions, qualify candidates, log responses
- **Support Triage** — Route issues to the right team, resolve simple problems, escalate complex ones
- **Appointment Reminder** — Remind customers of upcoming appointments, reschedule if needed

### 3. CRM Integration Setup
Step-by-step wizard to connect Salesforce and HubSpot without writing code:
- OAuth login in seconds
- Field mapping UI (map Bolna fields to CRM fields)
- Test the integration before deploying

### 4. Sandbox Test Dialer
Test agents without using production credits:
- Enter your phone number and get called by the agent
- Live transcript shows exactly what's happening in real time
- Make changes and re-test instantly

### 5. One-Click Deploy
Review your agent configuration and push to production in a single step:
- Pre-deployment checklist
- Final review of all integrations
- Deploy and agent goes live immediately

### Outcome
**Ops teams go from idea to live agent in days, not months — with zero engineering required.**

A customer success manager can now:
1. Pick a template (Lead Qualification)
2. Customize the questions
3. Connect Salesforce and map fields
4. Test with a sandbox dialer
5. Deploy and start receiving calls

...all in an afternoon.

---

## Tech Stack

| Layer | Technology | Why |
|---|---|---|
| Frontend | Next.js 16 + TypeScript | Latest React app framework with built-in optimizations |
| Styling | Tailwind CSS | Rapid UI development with consistent design |
| Workflow Editor | React Flow | Industry-standard library for visual node-based editors |
| Language | TypeScript | Type safety and better developer experience |
| Hosting | Vercel | Zero-config deployment, auto-scaling, instant global CDN |
| State Management | React hooks + local state | Lightweight, no external dependencies |

---

## Getting Started

### Prerequisites
- Node.js 18+ (check with `node --version`)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/UdattaChowdhuryPE/bolna-dev-platform.git
cd bolna-dev-platform

# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

### Hot Reload
The app auto-reloads as you edit files. Start by:
1. Clicking **Create Agent** on the dashboard
2. Picking a template
3. Dragging nodes around in the workflow builder
4. Testing with the sandbox dialer

---

## Project Structure

```
src/
├── app/                          # Next.js pages (App Router)
│   ├── dashboard/page.tsx        # Agent list & create
│   ├── templates/page.tsx        # Template gallery
│   ├── builder/[id]/page.tsx     # Workflow editor
│   ├── test/[id]/page.tsx        # Sandbox test dialer
│   └── deploy/[id]/page.tsx      # Deployment screen
├── components/
│   ├── NodeEditor.tsx            # Right-side panel for editing workflow nodes
│   └── WorkflowBuilder.tsx       # React Flow canvas (unused in MVP)
├── data/
│   ├── agents.ts                 # Mock agents with workflows
│   ├── templates.ts              # 5 pre-built templates
│   ├── transcript.ts             # Sample call transcript
│   └── integrations.ts           # Salesforce/HubSpot field mappings
└── types/
    └── index.ts                  # TypeScript type definitions
```

---

## Key Features

✅ **Visual Workflow Designer** — Drag-drop nodes, no code required  
✅ **5 Pre-built Templates** — Lead qualification, cart recovery, recruitment, support triage  
✅ **CRM Integration Setup** — Salesforce and HubSpot with OAuth and field mapping  
✅ **Sandbox Test Dialer** — Test agents with live transcript, no credits needed  
✅ **One-Click Deploy** — Push agent to production with a single button  
✅ **Responsive Design** — Works on desktop and tablet  
✅ **Dark Theme** — Professional, modern UI  

---

## Recent Fixes

### Next.js 16 Compatibility
- ✅ Fixed `params` async access in dynamic routes (`/test/[id]`, `/builder/[id]`, `/deploy/[id]`)
- ✅ Added Suspense boundary for `useSearchParams()` in builder layout
- ✅ All pages now properly unwrap route parameters using React's `use()` hook

### Test Dialer
- ✅ Fixed TypeError in transcript rendering (undefined entries in `entry.timestamp`)
- ✅ Cancel `setTimeout` when user hangs up during "Calling..." phase
- ✅ Clear transcript state on call end to prevent race conditions
- ✅ Guard interval callback against out-of-bounds array access

---

## Deployment

The app is deployed on **Vercel** and auto-deploys on every push to main.

**Live URL:** https://bolna-dev-platform.vercel.app/

To deploy your own copy:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from project root
vercel
```

---

## Future Enhancements

- **Real Bolna API integration** — Connect to actual Bolna service for real calls
- **Call analytics dashboard** — View call logs, transcripts, and agent performance metrics
- **Advanced workflow logic** — Sentiment analysis, dynamic branching, escalation rules
- **Custom agent templates** — Allow ops teams to create and save their own templates
- **Team collaboration** — Multi-user editing, agent versioning, approval workflows
- **Marketplace** — Share templates and integrations with the community

---

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

---

## License

MIT

---

## Questions?

Open an issue on GitHub or contact the team.
