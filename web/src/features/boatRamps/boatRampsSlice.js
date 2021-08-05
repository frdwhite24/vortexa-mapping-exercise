import { createSlice } from '@reduxjs/toolkit';
import { AREA_RANGES } from '../../constants';

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
    filterArea(state, action) {
      const range = AREA_RANGES.find((range) => range.name === action.payload);
      const features = state.value.features.filter(
        (feature) =>
          feature.properties.area_ >= range.min &&
          feature.properties.area_ < range.max,
      );
      state.value = {
        ...state.value,
        totalFeatures: features.length,
        features,
      };
    },
  },
});

export const selectBoatRamps = (state) => state.boatRamps.value;

export const { load, filterMaterial, filterArea } = boatRampsSlice.actions;
export default boatRampsSlice.reducer;
