import { configureStore } from '@reduxjs/toolkit';

import analysis from '@/modules/analysis/store';
import monitoring from '@/modules/monitoring/store';

const store = configureStore({
  reducer: {
    monitoring,
    analysis,
  },
});

export default store;
