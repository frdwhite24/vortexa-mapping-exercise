import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  GoogleMap,
  Marker,
  Polygon,
  useJsApiLoader,
} from '@react-google-maps/api';

import { selectBoatRamps } from '@features/boatRamps/boatRampsSlice';
import { getCentroid, getPaths } from '@services/boatRamps';
import styles from './Map.module.css';

export const Map = () => {
  const boatRamps = useSelector(selectBoatRamps);
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyBf8iua_HK_Mcbt7joQwQEF8gRmAOmertU',
  });
  const [map, setMap] = useState(null);

  const onMapLoad = useCallback((map) => {
    setMap(map);
  });

  const onMapUnmount = useCallback((map) => {
    setMap(null);
  });

  return (
    <div className={styles.root}>
      {isLoaded && (
        <GoogleMap
          mapContainerClassName={styles.map}
          onLoad={onMapLoad}
          onUnmount={onMapUnmount}
          zoom={10}
          center={{ lat: -27.9167, lng: 153.3999 }}
          onBoundsChanged={() => {}}
        >
          {boatRamps?.features.map((ramp) => {
            return (
              <div key={ramp.id}>
                <Marker position={getCentroid(ramp.geometry.coordinates)} />
                <Polygon paths={getPaths(ramp.geometry.coordinates)} />
              </div>
            );
          })}
        </GoogleMap>
      )}
    </div>
  );
};
