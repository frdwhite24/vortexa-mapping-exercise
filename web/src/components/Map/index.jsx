import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  GoogleMap,
  Marker,
  Polygon,
  useJsApiLoader,
} from '@react-google-maps/api';

import { selectBoatRamps } from '@features/boatRamps/boatRampsSlice';
import {
  getCentroid,
  getPaths,
  getVisibleBoatRamps,
} from '@services/boatRamps';
import styles from './Map.module.css';

const Data = () => {
  const featureCollection = useSelector(selectBoatRamps);
  return (
    <>
      {getVisibleBoatRamps(featureCollection).map((ramp) => {
        return (
          <div key={ramp.id}>
            <Marker position={getCentroid(ramp.geometry.coordinates)} />
            <Polygon paths={getPaths(ramp.geometry.coordinates)} />
          </div>
        );
      })}
    </>
  );
};

const Map = () => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyBf8iua_HK_Mcbt7joQwQEF8gRmAOmertU',
  });
  const [map, setMap] = useState(null);

  const onMapLoad = useCallback((map) => {
    setMap(map);
  }, []);

  const onMapUnmount = useCallback((map) => {
    setMap(null);
  }, []);

  const onZoomChanged = useCallback(() => {
    console.log('zoom map', map);
  }, [map]);

  return (
    <div className={styles.root}>
      <div className={styles.mapContainer}>
        {isLoaded && (
          <GoogleMap
            mapContainerClassName={styles.map}
            onLoad={onMapLoad}
            onUnmount={onMapUnmount}
            onZoomChanged={onZoomChanged}
            zoom={10}
            center={{ lat: -27.9167, lng: 153.3999 }}
          >
            <Data />
          </GoogleMap>
        )}
      </div>
    </div>
  );
};

export default React.memo(Map);
