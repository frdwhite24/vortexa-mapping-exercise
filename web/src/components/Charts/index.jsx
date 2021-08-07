import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  getAreaRangesCount,
  getMaterialsCount,
  getVisibleBoatRamps,
} from '@services/boatRamps';
import { getDataForChart } from '@services/charts';
import {
  selectBoatRamps,
  filterMaterial,
  filterArea,
} from '@features/boatRamps/boatRampsSlice';
import { BarChart } from '@components/BarChart';
import styles from './Charts.module.css';

export const Charts = () => {
  const dispatch = useDispatch();
  const featureCollection = useSelector(selectBoatRamps);
  const features = getVisibleBoatRamps(featureCollection);

  const handleMaterialFilter = (e) => {
    if (e?.activeLabel) {
      dispatch(filterMaterial(e.activeLabel));
    }
  };

  const handleAreaFilter = (e) => {
    if (e?.activeLabel) {
      dispatch(filterArea(e.activeLabel));
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
