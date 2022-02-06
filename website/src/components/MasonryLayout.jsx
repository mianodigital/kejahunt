import React from 'react';
import Masonry from 'react-masonry-css';

import Listing from './Listing';

const breakpointObj = {
  default: 3,
  1200: 4,
  1000: 2,
  500: 1,
};

const MasonryLayout = ({ listings }) => {
  return (
    <Masonry className='flex animate-slide-fwd' breakpointCols={breakpointObj}>
      {listings?.map((listing) => (
        <Listing key={listing._id} listing={listing} className='w-max' />
      ))}
    </Masonry>
  );
};

export default MasonryLayout;
