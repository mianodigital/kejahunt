import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import React from 'react';

import locationIcon from '../assets/icons/location.svg';

const ListingMap = ({ location }) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const containerStyle = {
    width: '100%',
    height: '400px',
    borderRadius: '11px',
  };

  const center = {
    lat: location.lat,
    lng: location.lng,
  };

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={16}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      <Marker
        position={{ lat: location.lat, lng: location.lng }}
        icon={{
          url: locationIcon,
        }}
      />
      <></>
    </GoogleMap>
  ) : (
    <></>
  );
};

export default React.memo(ListingMap);
