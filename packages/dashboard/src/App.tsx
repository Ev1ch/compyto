import { Providers } from '@/components/blocks';
import { ErrorBoundary } from '@/components/boundaries';
import { Baseline } from '@/components/common';
import { Dashboard } from '@/modules/monitoring/components/pages';

export default function App() {
  return (
    <>
      <Providers>
        <Baseline />
        <ErrorBoundary>
          <Dashboard />
        </ErrorBoundary>
      </Providers>
    </>
  );
}
