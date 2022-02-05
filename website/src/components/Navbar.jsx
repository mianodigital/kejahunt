import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { ReactComponent as AddIcon } from '../assets/icons/add.svg';
import { ReactComponent as SearchIcon } from '../assets/icons/search.svg';

const Navbar = ({ searchTerm, setSearchTerm, user }) => {
  const navigate = useNavigate();

  if (!user) return null;

  return (
    <div className='flex gap-2 md:gap-5 w-full mt-5 pb-7'>
      <div className='flex justify-start items-center w-full px-2 rounded-md bg-white border-none outline-none focus-within:shadow-sm'>
        <SearchIcon className='ml-1 h-5 w-5 fill-ash-400' />
        <input
          type='text'
          className='p-2 w-full bg-white outline-none'
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder='Search'
          value={searchTerm}
          onFocus={() => navigate('/search')}
        />
      </div>
      <div className='flex gap-3'>
        <Link
          to='/create-listing'
          className='bg-ash-400 text-white rounded-lg w-12 h-12 md:w-14 md:h-12 flex justify-center items-center'
        >
          <AddIcon className='h-5 w-5 fill-white' />
        </Link>
        <Link to={`profile/${user?._id}`} className='hidden md:block'>
          <img
            src={user.image}
            alt={user.userName}
            className='w-14 h-12 rounded-lg'
          />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
