import { configureStore } from '@reduxjs/toolkit';

import analysis from '@/modules/analysis/store';
import filtering from '@/modules/filtering/store';
import monitorings from '@/modules/monitoring/store';
import sorting from '@/modules/sorting/store';

const store = configureStore({
  reducer: {
    monitorings,
    analysis,
    sorting,
    filtering,
  },
});

export default store;
