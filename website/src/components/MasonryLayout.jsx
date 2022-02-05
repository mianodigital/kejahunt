import React from 'react';
import Masonry from 'react-masonry-css';

import Property from './Property';

const breakpointObj = {
  default: 4,
  3000: 6,
  2000: 5,
  1200: 3,
  1000: 2,
  500: 1,
};

const MasonryLayout = ({ properties }) => {
  return (
    <Masonry className='flex animate-slide-fwd' breakpointCols={breakpointObj}>
      {properties?.map((property) => (
        <Property key={property._id} property={property} className='w-max' />
      ))}
    </Masonry>
  );
};

export default MasonryLayout;
