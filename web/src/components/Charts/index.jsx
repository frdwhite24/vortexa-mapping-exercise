import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  getAreaRangesCount,
  getMaterialsCount,
  getFilteredBoatRamps,
} from '@services/boatRamps';
import { getDataForChart } from '@services/charts';
import {
  selectBoatRamps,
  selectFilters,
  setMaterialFilter,
  setAreaFilter,
} from '@features/boatRamps/boatRampsSlice';
import { BarChart } from '@components/BarChart';
import styles from './Charts.module.css';

export const Charts = () => {
  const dispatch = useDispatch();
  const featureCollection = useSelector(selectBoatRamps);
  const { areaFilter, materialFilter } = useSelector(selectFilters);
  const features = getFilteredBoatRamps(
    featureCollection?.features,
    areaFilter,
    materialFilter,
  );

  const handleMaterialFilter = (e) => {
    if (e?.activeLabel) {
      dispatch(setMaterialFilter(e.activeLabel));
    }
  };

  const handleAreaFilter = (e) => {
    if (e?.activeLabel) {
      dispatch(setAreaFilter(e.activeLabel));
    }
  };

  return (
    <div className={styles.root}>
      <BarChart
        data={getDataForChart(getMaterialsCount(features))}
        xDataKey="name"
        barDataKey="count"
        width={450}
        height={250}
        title="Boat ramp count per material"
        handleClick={handleMaterialFilter}
      />
      <BarChart
        data={getDataForChart(getAreaRangesCount(features))}
        xDataKey="name"
        barDataKey="count"
        width={450}
        height={250}
        title="Boat ramp count per area range (unit?)"
        handleClick={handleAreaFilter}
      />
    </div>
  );
};
