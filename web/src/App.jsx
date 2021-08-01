import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Map } from '@components/Map';
import { load, selectBoatRamps } from '@features/boatRamps/boatRampsSlice';
import { getAreaRangesCount, getMaterialsCount } from '@services/map';
import './App.css';

const App = () => {
  const dispatch = useDispatch();
  const boatRamps = useSelector(selectBoatRamps);

  useEffect(() => {
    // TODO: make this an async thunk in the redux store rather than using a
    // load reducer
    const fetchData = async () => {
      const response = await fetch('http://localhost:3000/boat_ramps');
      const data = await response.json();
      dispatch(load(data));
    };

    fetchData();
  }, []);

  useEffect(() => {
    // TODO: make charts with this data, clickable to filter data shown on map,
    // in an ideal world pan to extent of new data
    if (Object.keys(boatRamps)?.length) {
      console.log(boatRamps);
      console.log('num boat ramps: ', boatRamps?.features?.length);
      console.log(
        'count of material type: ',
        getMaterialsCount(boatRamps?.features),
      );
      console.log(
        'count of area ranges: ',
        getAreaRangesCount(boatRamps?.features),
      );
    }
  }, [boatRamps]);

  // TODO: render out the charts and add a bit of styling to the page
  return <Map />;
};

export default App;
