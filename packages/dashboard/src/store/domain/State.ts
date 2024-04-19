import type { AnalysisState } from '@/modules/analysis/store';
import type { MonitoringState } from '@/modules/monitoring/store';

type State = {
  monitoring: MonitoringState;
  analysis: AnalysisState;
};

export default State;
