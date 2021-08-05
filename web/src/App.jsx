import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectBoatRamps,
  filterMaterial,
  filterArea,
} from '@features/boatRamps/boatRampsSlice';
import { getAreaRangesCount, getMaterialsCount } from '@services/boatRamps';
import { getDataForChart } from '@services/charts';

import { Map } from '@components/Map';
import { BarChart } from '@components/BarChart';
import { load } from '@features/boatRamps/boatRampsSlice';
import styles from './App.module.css';

const App = () => {
  const dispatch = useDispatch();
  const boatRamps = useSelector(selectBoatRamps);
  const [shouldLoadData, setShouldLoadData] = useState(true);

  useEffect(() => {
    // TODO: make this an async thunk in the redux store rather than using a
    // load reducer
    const fetchData = async () => {
      const response = await fetch('http://localhost:3002/boat_ramps');
      const data = await response.json();
      dispatch(load(data));
    };

    if (shouldLoadData) {
      fetchData();
      setShouldLoadData(false);
    }
  }, [shouldLoadData]);

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

  const handleReset = () => {
    setShouldLoadData(true);
  };

  return (
    <div className={styles.root}>
      <div className={styles.map}>
        <Map />
      </div>
      <div className={styles.charts}>
        <BarChart
          data={getDataForChart(getMaterialsCount(boatRamps?.features))}
          xDataKey="name"
          barDataKey="count"
          width={450}
          height={250}
          title="Boat ramp count per material"
          handleClick={handleMaterialFilter}
        />
        <BarChart
          data={getDataForChart(getAreaRangesCount(boatRamps?.features))}
          xDataKey="name"
          barDataKey="count"
          width={450}
          height={250}
          title="Boat ramp count per area range (unit?)"
          handleClick={handleAreaFilter}
        />
      </div>
      <button onClick={handleReset} className={styles.reset}>
        Reset data
      </button>
    </div>
  );
};

export default App;
