import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import { CreateListing, Feed, ListingDetail, Navbar, Search } from '../components';

const Properties = ({ user }) => {
  const [searchTerm, setSearchTerm] = useState('');
  return (
    <div className='px-2 md:px-5'>
      <div className='bg-ash-200 '>
        <Navbar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          user={user && user}
        />
      </div>
      <div className='h-full'>
        <Routes>
          <Route path='/' element={<Feed />} />
          <Route path='/category/:categoryId' element={<Feed />} />
          <Route
            path='/listing-detail/:listingId'
            element={<ListingDetail user={user} />}
          />
          <Route
            path='/create-listing'
            element={<CreateListing user={user} />}
          />
          <Route
            path='/search'
            element={
              <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default Properties;
