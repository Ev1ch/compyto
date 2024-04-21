import { createRunner } from '@compyto/runner';

export default async function start() {
  const { communicator } = await createRunner();
  await communicator.start();
  const data = new Array(999).fill(1);
  const scatterRes = [];
  const gatherRes = [];
  const total = communicator.group.processes.length + 1;
  await communicator.scatter(
    data,
    data.length / total,
    scatterRes,
    data.length / total,
    0,
  );
  console.log(scatterRes.length);

  await communicator.gather(
    scatterRes,
    data.length / total,
    gatherRes,
    data.length / total,
    0,
  );

  console.log(gatherRes.length);

  // await communicator.finalize();
}
