import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import locationIcon from '../assets/icons/location.svg';
import { Spinner } from '../components';
import { client } from '../sanity';
import { feedQuery, searchQuery } from '../utils/data';

const Map = () => {
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState();

  const { categoryId } = useParams();

  useEffect(() => {
    setLoading(true);

    if (categoryId) {
      const query = searchQuery(categoryId);
      client.fetch(query).then((data) => {
        setListings(data);
        setLoading(false);
      });
    } else {
      client.fetch(feedQuery).then((data) => {
        setListings(data);
        setLoading(false);
      });
    }
  }, [categoryId]);

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
    lat: -1.28,
    lng: 36.822,
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

  if (loading) return <Spinner message='Preparing the map for you' />;

  if (!listings?.length)
    return (
      <h2 className='font-bold flex justify-center items-center text-ash-700'>
        No listings available
      </h2>
    );

  return listings && isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={12}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {listings.map((listing) => (
        <Marker
          key={listing._id}
          position={{
            lat: listing?.location?.lat,
            lng: listing?.location?.lng,
          }}
          icon={{
            url: locationIcon,
          }}
        />
      ))}
      <></>
    </GoogleMap>
  ) : (
    <></>
  );
};

export default React.memo(Map);
