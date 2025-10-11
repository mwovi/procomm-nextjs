'use client';

import { useEffect } from 'react';

export default function ErrorBoundary({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Log client-side errors to console for debugging
    const handleError = (event: ErrorEvent) => {
      console.error('Client Error:', event.error);
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      console.error('Unhandled Promise Rejection:', event.reason);
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  return (
    <>
      {children}
    </>
  );
}