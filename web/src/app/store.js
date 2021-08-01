import { configureStore } from '@reduxjs/toolkit';
import boatRampsReducer from '@features/boatRamps/boatRampsSlice';

export const store = configureStore({
  reducer: {
    boatRamps: boatRampsReducer,
  },
});
