import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-bg to-brand-card flex items-center justify-center">
      <div className="text-center text-white max-w-2xl mx-auto px-4">
        <div className="w-16 h-16 bg-brand-cyan rounded-lg flex items-center justify-center mx-auto mb-6">
          <span className="text-3xl font-bold text-brand-bg">B</span>
        </div>
        <h1 className="text-5xl font-bold mb-4">Bolna Voice Agent Builder</h1>
        <p className="text-xl text-brand-teal mb-8">
          Create and deploy voice agents in minutes. No coding required.
        </p>
        <Link
          href="/dashboard"
          className="inline-block bg-brand-cyan hover:bg-brand-teal text-brand-bg font-bold py-3 px-8 rounded-lg transition text-lg"
        >
          Launch Platform →
        </Link>
        <p className="text-brand-mint text-sm mt-8">
          Low-code platform • Drag-drop workflows • Sandbox testing • One-click deploy
        </p>
      </div>
    </div>
  );
}
