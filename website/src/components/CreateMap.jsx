import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import React from 'react';

const CreateMap = ({ location }) => {
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
    lat: 38.685,
    lng: -115.234,
  };

  const [map, setMap] = React.useState(null);

  const onLoad = (marker) => {
    console.log('marker: ', marker);
  };

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={13}>
      <Marker onLoad={onLoad} position={center} />
      <></>
    </GoogleMap>
  ) : (
    <></>
  );
};

export default React.memo(CreateMap);
