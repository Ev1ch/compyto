import { Logger } from '#/logging/components/blocks';
import { LoggerProvider } from '#/logging/contexts';
import { Head, Providers } from 'components/blocks';
import { Layout } from 'components/layouts';

export default function App() {
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Providers providers={[LoggerProvider]}>
        <Layout logger={<Logger />} />
      </Providers>
    </>
  );
}
