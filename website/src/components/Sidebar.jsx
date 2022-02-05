import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import logo from '../assets/images/kh.png';

const isNotActiveStyle =
  'flex items-center px-5 gap-2 text-ash-700 hover:text-ash-400 transition-all duration-200 ease-in-out capitalize';
const isActiveStyle =
  'flex items-center px-5 gap-2 text-ash-400 font-medium border-r-2 border-ash-400 transition-all duration-200 ease-in-out capitalize';

const categories = [
  { name: 'studio', title: 'Studio / Bedsitter' },
  { name: 'one-bedroom', title: '1+ Bedroom' },
  { name: 'two-bedroom', title: '2+ Bedroom' },
  { name: 'three-bedroom', title: '3+ Bedroom' },
  { name: 'four-bedroom', title: '4+ Bedroom' },
  { name: 'single-family-homes', title: 'Single Family' },
  { name: 'other', title: 'Other' },
];

const Sidebar = ({ user, closeToggle }) => {
  const handleCloseSidebar = () => {
    if (closeToggle) closeToggle(false);
  };
  return (
    <div className='flex flex-col justify-between bg-ash-100 h-full overflow-y-scroll min-w-210 scrollbar-hide'>
      <div className='flex flex-col'>
        <Link
          to='/'
          className='flex px-5 gap-2 my-6 pt-1 w-190 items-center'
          onClick={handleCloseSidebar}
        >
          <img src={logo} alt='logo' className='w-full' />
        </Link>
        <div className='flex flex-col gap-5  '>
          <NavLink
            to='/'
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
            onClick={handleCloseSidebar}
          >
            Home
          </NavLink>
          <h3 className='text-ash-400 mt-2 px-5 text-base font-medium 2xl:text-xl'>
            Discover Categories
          </h3>
          {categories.slice(0, categories.length - 1).map((category) => (
            <NavLink
              to={`/category/${category.name}`}
              className={({ isActive }) =>
                isActive ? isActiveStyle : isNotActiveStyle
              }
              onClick={handleCloseSidebar}
              key={category.name}
            >
              {category.title}
            </NavLink>
          ))}
        </div>
      </div>
      {user && (
        <Link
          onClick={handleCloseSidebar}
          to={`profile/${user._id}`}
          className='flex my-5 mb-3 gap-2 p-2 items-center text-ash-200 bg-ash-400 rounded-lg shadow-lg mx-3'
        >
          <img
            className='w-10 h-10 rounded-full'
            src={user.image}
            alt={user.userName}
          />
          <p>{user.userName}</p>
        </Link>
      )}
    </div>
  );
};

export default Sidebar;
