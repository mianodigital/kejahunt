import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { MasonryLayout, Spinner } from '../components';
import { client } from '../sanity';
import { feedQuery, searchQuery } from '../utils/data';

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
  return <div>{listings && <MasonryLayout listings={listings} />}</div>;
};

export default Feed;
