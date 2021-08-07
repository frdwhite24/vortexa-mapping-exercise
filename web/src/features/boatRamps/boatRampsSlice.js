import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AREA_RANGES } from '@constants';

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
  },
  reducers: {
    filterMaterial(state, action) {
      state.featureCollection = {
        ...state.featureCollection,
        features: state.featureCollection.features.map((feature) => {
          if (feature.properties.material === action.payload) {
            return { ...feature };
          }
          return { ...feature, isVisible: false };
        }),
      };
    },
    filterArea(state, action) {
      const range = AREA_RANGES.find((range) => range.name === action.payload);
      state.featureCollection = {
        ...state.featureCollection,
        features: state.featureCollection.features.map((feature) => {
          if (
            feature.properties.area_ >= range.min &&
            feature.properties.area_ < range.max
          ) {
            return { ...feature };
          }
          return { ...feature, isVisible: false };
        }),
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBoatRamps.pending, (state, action) => {
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
export const { filterArea, filterMaterial } = boatRampsSlice.actions;
export default boatRampsSlice.reducer;
