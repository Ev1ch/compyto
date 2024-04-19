import { Head } from '@/components/blocks';
import { Layout } from '@/components/layouts';

import { useInitMonitoring } from '../../../hooks';
import { Logger } from '../../blocks';

export default function Dashboard() {
  useInitMonitoring();

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Layout logger={<Logger />} />
    </>
  );
}
