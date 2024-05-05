import type { AnalysisState } from '@/modules/analysis/store';
import type { FilteringState } from '@/modules/filtering/store';
import type { MonitoringsState } from '@/modules/monitoring/store';
import type { SortingState } from '@/modules/sorting/store';

export default interface State {
  monitorings: MonitoringsState;
  analysis: AnalysisState;
  sorting: SortingState;
  filtering: FilteringState;
}
