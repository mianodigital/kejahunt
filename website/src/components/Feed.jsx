import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { MasonryLayout, Spinner } from '../components';
import { client } from '../sanity';
import { feedQuery, searchQuery } from '../utils/data';
import Map from './Map';

const Feed = () => {
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

  if (loading) return <Spinner message='Preparing listings for you' />;
  if (!listings?.length)
    return (
      <h2 className='font-bold flex justify-center items-center text-ash-700'>
        No listings available
      </h2>
    );
  return (
    <div>
      {listings && (
        <div className=''>
          <Map listings={listings} />
          <MasonryLayout listings={listings} />
        </div>
      )}
    </div>
  );
};

export default Feed;
