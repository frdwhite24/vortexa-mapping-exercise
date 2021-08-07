import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import {
  fetchBoatRamps,
  clearFilters,
} from '@features/boatRamps/boatRampsSlice';
import Map from '@components/Map';
import { Charts } from '@components/Charts';
import styles from './App.module.css';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBoatRamps());
  }, []);

  return (
    <div className={styles.root}>
      <Map />
      <Charts />
      <button onClick={() => dispatch(clearFilters())} className={styles.reset}>
        Clear filters
      </button>
    </div>
  );
};

export default App;
