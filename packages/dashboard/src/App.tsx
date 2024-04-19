import { Head, Providers } from '@/components/blocks';
import { Baseline } from '@/components/common';
import { Layout } from '@/components/layouts';
import { StoreProvider } from '@/components/providers';
import { ConnectionContextProvider } from '@/modules/connections/components/providers';
import { Logger } from '@/modules/monitoring/components/blocks';

export default function App() {
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Providers providers={[ConnectionContextProvider, StoreProvider]}>
        <Baseline />
        <Layout logger={<Logger />} />
      </Providers>
    </>
  );
}
