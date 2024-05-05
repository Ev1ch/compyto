import { MonitoringDataSchema, type MonitoringData } from '@compyto/monitoring';

export default async function parseJsonMonitoringData(string: string) {
  const json = JSON.parse(string);
  const data = await MonitoringDataSchema.validate(json);

  return data as MonitoringData;
}
