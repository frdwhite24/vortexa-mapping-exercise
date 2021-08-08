import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  GoogleMap,
  Marker,
  Polygon,
  useJsApiLoader,
} from '@react-google-maps/api';

import {
  selectBoatRamps,
  selectFilters,
  filterDataToBounds,
} from '@features/boatRamps/boatRampsSlice';
import {
  getCentroid,
  getPaths,
  getFilteredBoatRamps,
} from '@services/boatRamps';
import styles from './Map.module.css';

const MapData = () => {
  const featureCollection = useSelector(selectBoatRamps);
  const { areaFilter, materialFilter } = useSelector(selectFilters);

  return (
    <>
      {getFilteredBoatRamps(
        featureCollection?.features,
        areaFilter,
        materialFilter,
      ).map((ramp) => {
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
    // TODO: keeping this key here for ease while the repository is private,
    // would need to make sure it's rotated regularly and has strict
    // restrictions so it can't be abused.
    googleMapsApiKey: 'AIzaSyBf8iua_HK_Mcbt7joQwQEF8gRmAOmertU',
  });
  const dispatch = useDispatch();
  const [map, setMap] = useState(null);

  const onMapLoad = useCallback((map) => {
    setMap(map);
  }, []);

  const onMapUnmount = useCallback(() => {
    setMap(null);
  }, []);

  const onBoundsChanged = () => {
    if (map) {
      dispatch(filterDataToBounds(map.getBounds().toJSON()));
    }
  };

  return (
    <div className={styles.root}>
      <div className={styles.mapContainer}>
        {isLoaded && (
          <GoogleMap
            mapContainerClassName={styles.map}
            onLoad={onMapLoad}
            onUnmount={onMapUnmount}
            zoom={10}
            center={{ lat: -27.9167, lng: 153.3999 }}
            onBoundsChanged={onBoundsChanged}
            options={{
              fullscreenControlOptions: {
                position: google.maps.ControlPosition.LEFT_TOP,
              },
            }}
          >
            <MapData />
          </GoogleMap>
        )}
      </div>
    </div>
  );
};

export default React.memo(Map);
