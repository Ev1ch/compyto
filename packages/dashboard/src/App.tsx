import { Head, Providers } from '@/components/blocks';
import { Baseline } from '@/components/common';
import { Layout } from '@/components/layouts';
import { Logger } from '@/modules/monitoring/components/blocks';
import { MonitoringContextProvider } from '@/modules/monitoring/components/providers';

export default function App() {
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Providers providers={[MonitoringContextProvider]}>
        <Baseline />
        <Layout logger={<Logger />} />
      </Providers>
    </>
  );
}
