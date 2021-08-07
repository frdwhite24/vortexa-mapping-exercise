import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getCentroid, isWithinBounds } from '@services/boatRamps';

export const fetchBoatRamps = createAsyncThunk(
  'boatRamps/fetchBoatRamps',
  async () => {
    const response = await fetch('http://localhost:3002/boat_ramps');
    return response.json();
  },
);

const boatRampsSlice = createSlice({
  name: 'boatRamps',
  initialState: {
    featureCollection: {},
    materialFilter: '',
    areaFilter: '',
  },
  reducers: {
    filterDataToBounds(state, action) {
      state.featureCollection = {
        ...state.featureCollection,
        features: state.featureCollection.features.map((feature) => {
          const centroid = getCentroid(feature.geometry.coordinates);
          if (isWithinBounds(centroid, action.payload)) {
            return { ...feature, isVisible: true };
          }
          return { ...feature, isVisible: false };
        }),
      };
    },
    setMaterialFilter(state, action) {
      state.materialFilter = action.payload;
    },
    setAreaFilter(state, action) {
      state.areaFilter = action.payload;
    },
    clearFilters(state) {
      state.materialFilter = '';
      state.areaFilter = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBoatRamps.pending, (state, _) => {
        state.status = 'loading';
      })
      .addCase(fetchBoatRamps.fulfilled, (state, action) => {
        state.featureCollection = {
          ...action.payload,
          features: action.payload.features.map((feature) => ({
            ...feature,
            isVisible: true,
          })),
        };
        state.status = 'idle';
      });
  },
});

export const selectBoatRamps = (state) => state.boatRamps.featureCollection;
export const selectFilters = (state) => ({
  areaFilter: state.boatRamps.areaFilter,
  materialFilter: state.boatRamps.materialFilter,
});
export const {
  hideRamp,
  setAreaFilter,
  setMaterialFilter,
  filterDataToBounds,
  clearFilters,
} = boatRampsSlice.actions;
export default boatRampsSlice.reducer;
