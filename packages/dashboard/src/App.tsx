import { Head, Providers } from '@/components/blocks';
import { Baseline } from '@/components/common';
import { Layout } from '@/components/layouts';
import { ConnectionContextProvider } from '@/modules/connections/components/providers';
import { Logger } from '@/modules/monitoring/components/blocks';
import { MonitoringContextProvider } from '@/modules/monitoring/components/providers';

export default function App() {
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Providers
        providers={[ConnectionContextProvider, MonitoringContextProvider]}
      >
        <Baseline />
        <Layout logger={<Logger />} />
      </Providers>
    </>
  );
}
