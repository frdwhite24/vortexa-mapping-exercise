import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  setMaterialFilter,
  setAreaFilter,
  selectAreaChartData,
  selectMaterialChartData,
} from '@features/boatRamps/boatRampsSlice';
import { BarChart } from '@components/BarChart';
import styles from './Charts.module.css';

export const Charts = () => {
  const dispatch = useDispatch();
  const areaData = useSelector(selectAreaChartData);
  const materialData = useSelector(selectMaterialChartData);

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
        data={materialData}
        xDataKey="name"
        barDataKey="count"
        width={450}
        height={250}
        title="Boat ramp count per material"
        handleClick={handleMaterialFilter}
      />
      <BarChart
        data={areaData}
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
