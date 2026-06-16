import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Bolna Dev Platform',
  description: 'Low-code voice agent builder',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#001014] text-white" suppressHydrationWarning>
        <nav className="bg-[#0D272B] border-b border-[#2E6B70]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#00F6FF] rounded-lg flex items-center justify-center">
                  <span className="text-[#001014] font-bold text-sm">B</span>
                </div>
                <h1 className="text-xl font-bold text-white">Bolna Platform</h1>
              </div>
              <p className="text-sm text-[#7ED6DF]">Voice Agent Builder</p>
            </div>
          </div>
        </nav>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
