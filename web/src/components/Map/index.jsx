import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from '@googlemaps/js-api-loader';

import {
  selectBoatRamps,
  filterGravel,
} from '@features/boatRamps/boatRampsSlice';
import styles from './Map.module.css';

export const Map = () => {
  const dispatch = useDispatch();
  const [hasData, setHasData] = useState(false);
  const boatRamps = useSelector(selectBoatRamps);
  const mapRef = useRef(null);

  const loader = new Loader({
    apiKey: 'AIzaSyBf8iua_HK_Mcbt7joQwQEF8gRmAOmertU',
    version: 'weekly',
  });

  const handleFilter = () => {
    dispatch(filterGravel());
  };

  useEffect(() => {
    const initialiseMap = async () => {
      await loader.load();
      mapRef.current = new google.maps.Map(document.getElementById('map'), {
        // TODO: implement a way to get the bounds of the data in the map and
        // pan to that upon load rather than hardcoding these values
        center: { lat: -27.916709360221157, lng: 153.3999738962762 },
        zoom: 10,
      });
    };

    initialiseMap();
  }, []);

  useEffect(() => {
    if (hasData) {
      // This is to remove all the current data on the map so that when the
      // geojson from the filtered data in the store is reloaded, it's plotted
      // onto an empty map, rather than on top of an existing layer. I could just
      // remove the features and have all the logic below as this logic wouldn't
      // be the most performant for large datasets, but I wanted to keep all the
      // logic to the redux reducers rather than in here or a custom hook
      mapRef.current.data.forEach((feature) => {
        mapRef.current.data.remove(feature);
      });
    }

    if (mapRef.current && Object.keys(boatRamps)?.length) {
      // TODO: make these polygons much clearer on the map, or turn them into
      // markers by getting the centroid of the data points
      mapRef.current.data.addGeoJson(boatRamps, {
        idPropertyName: 'boatRamps',
      });
      setHasData(true);
    }
  }, [boatRamps, mapRef.current]);

  return (
    <div className={styles.root}>
      <div id="map" className={styles.map} />
      <button onClick={handleFilter}>show gravel ramps</button>
    </div>
  );
};
