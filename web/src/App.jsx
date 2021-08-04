import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectBoatRamps } from '@features/boatRamps/boatRampsSlice';
import { getAreaRangesCount, getMaterialsCount } from '@services/boatRamps';
import { getDataForChart } from '@services/charts';

import { Map } from '@components/Map';
import { BarChart } from '@components/BarChart';
import { load } from '@features/boatRamps/boatRampsSlice';
import './App.css';

const App = () => {
  const dispatch = useDispatch();

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

  const boatRamps = useSelector(selectBoatRamps);

  useEffect(() => {
    // TODO: make charts with this data, clickable to filter data shown on map,
    // in an ideal world pan to extent of new data
    if (Object.keys(boatRamps)?.length) {
      // console.log(
      //   'count of material type: ',
      //   getMaterialsCount(boatRamps?.features),
      // );
      // console.log(
      //   'count of area ranges: ',
      //   getAreaRangesCount(boatRamps?.features),
      // );
    }
  }, [boatRamps]);

  // TODO: render out the charts and add a bit of styling to the page
  return (
    <>
      <BarChart
        data={getDataForChart(getMaterialsCount(boatRamps?.features))}
        xDataKey="name"
        barDataKey="count"
        width={650}
        height={250}
        title="Boat ramp count per material"
      />
      <BarChart
        data={getDataForChart(getAreaRangesCount(boatRamps?.features))}
        xDataKey="name"
        barDataKey="count"
        width={650}
        height={250}
        title="Boat ramp count per area range (unit?)"
      />
    </>
  );
};

export default App;
