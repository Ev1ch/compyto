import { Providers } from '@/components/blocks';
import { Baseline } from '@/components/common';
import { Dashboard } from '@/modules/monitoring/components/pages';

export default function App() {
  return (
    <>
      <Providers>
        <Baseline />
        <Dashboard />
      </Providers>
    </>
  );
}
