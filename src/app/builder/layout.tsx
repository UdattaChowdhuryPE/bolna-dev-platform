import { Suspense } from 'react';

export default function BuilderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Suspense fallback={<div className="text-center py-12"><p className="text-brand-teal">Loading...</p></div>}>{children}</Suspense>;
}
