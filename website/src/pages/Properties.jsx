import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import { CreateProperty, Feed, Navbar, PropertyDetail, Search } from '../components';

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
            path='/property-detail/:propertyId'
            element={<PropertyDetail user={user} />}
          />
          <Route
            path='/create-property'
            element={<CreateProperty user={user} />}
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
