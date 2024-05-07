import {
  MonitoringDataSchema,
  MonitoringDatasSchema,
  type MonitoringData,
} from '@compyto/monitoring';

export default async function parseJsonMonitoringData(string: string) {
  const json = JSON.parse(string);
  const validations = await Promise.all([
    MonitoringDataSchema.isValid(json),
    MonitoringDatasSchema.isValid(json),
  ]);
  const isValid = validations.some((validation) => validation);

  if (!isValid) {
    throw new Error('Invalid monitoring data');
  }

  return json as MonitoringData | MonitoringData[];
}
