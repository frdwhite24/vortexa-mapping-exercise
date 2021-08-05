import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: {},
};

const boatRampsSlice = createSlice({
  name: 'boatRamps',
  initialState,
  reducers: {
    load(state, action) {
      state.value = action.payload;
    },
    filterMaterial(state, action) {
      const features = state.value.features.filter(
        (feature) => feature.properties.material === action.payload,
      );
      state.value = {
        ...state.value,
        totalFeatures: features.length,
        features,
      };
    },
    // TODO: reducers for filtering by material and by area range
  },
});

export const selectBoatRamps = (state) => state.boatRamps.value;

export const { load, filterMaterial } = boatRampsSlice.actions;
export default boatRampsSlice.reducer;
