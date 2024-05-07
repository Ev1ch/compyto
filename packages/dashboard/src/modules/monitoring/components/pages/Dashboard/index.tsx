import { Head } from '@/components/blocks';
import { Layout } from '@/components/layouts';

import { Logger } from '../../blocks';

export default function Dashboard() {
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Layout logger={<Logger />} />
    </>
  );
}
