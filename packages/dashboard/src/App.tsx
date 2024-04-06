import { Head, Providers } from '@/components/blocks';
import { Baseline } from '@/components/common';
import { Layout } from '@/components/layouts';
import { Palette } from '@/modules/connections/components/blocks';
import { Logger } from '@/modules/monitoring/components/blocks';
import { LoggerProvider } from '@/modules/monitoring/contexts';

export default function App() {
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Baseline />
      <Providers providers={[LoggerProvider]}>
        <Layout logger={<Logger />} palette={<Palette />} />
      </Providers>
    </>
  );
}
