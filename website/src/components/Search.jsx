import React, { useEffect, useState } from 'react';

import { client } from '../sanity';
import { feedQuery, searchQuery } from '../utils/data';
import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';

const Search = ({ searchTerm }) => {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchTerm) {
      setLoading(true);
      const query = searchQuery(searchTerm.toLowerCase());
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
  }, [searchTerm]);

  return (
    <div>
      {loading && <Spinner message='loading properties' />}
      {listings?.length !== 0 && <MasonryLayout listings={listings} />}
      {listings?.length === 0 && searchTerm !== '' && !loading && (
        <div className='mt-1 text-center text-xl'>No pins found</div>
      )}
    </div>
  );
};

export default Search;
