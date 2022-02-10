import React, { useEffect, useRef, useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';

import { ReactComponent as CloseIcon } from '../assets/icons/close.svg';
import { ReactComponent as LogoIcon } from '../assets/icons/kh.svg';
import { ReactComponent as MenuIcon } from '../assets/icons/menu.svg';
import { Profile, Sidebar } from '../components';
import { client } from '../sanity';
import { userQuery } from '../utils/data';
import Listings from './Listings';

const Home = () => {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [user, setUser] = useState();
  const userInfo =
    localStorage.getItem('user') !== 'undefined'
      ? JSON.parse(localStorage.getItem('user'))
      : localStorage.clear();
  const scrollRef = useRef(null);

  useEffect(() => {
    const query = userQuery(userInfo?.googleId);
    client.fetch(query).then((data) => {
      setUser(data[0]);
    });
  }, []);

  useEffect(() => {
    scrollRef.current.scrollTo(0, 0);
  }, []);

  return (
    <div className='flex bg-ash-200 md:flex-row flex-col h-screen transaction-height duration-75 ease-out'>
      <div className='hidden md:flex h-screen flex-initial'>
        <Sidebar user={user && user} />
      </div>
      <div className='flex md:hidden flex-row'>
        <div className='p-2 w-full flex flex-row justify-between items-center shadow-md bg-ash-100'>
          <MenuIcon
            className='cursor-pointer h-7 fill-ash-400'
            onClick={() => setToggleSidebar(true)}
          />
          <Link className='' to='/'>
            <LogoIcon className='h-10' alt='logo' />
          </Link>
          <Link className='' to={`profile/${user?._id}`}>
            <img
              src={user?.image}
              alt='user'
              className='h-10 w-10 rounded-full'
            />
          </Link>
        </div>
        {toggleSidebar && (
          <div className='fixed w-2/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in'>
            <div className='absolute w-full flex justify-end items-center p-2'>
              <CloseIcon
                className='cursor-pointer h-7 fill-ash-400'
                onClick={() => setToggleSidebar(false)}
              />
            </div>
            <Sidebar user={user && user} closeToggle={setToggleSidebar} />
          </div>
        )}
      </div>

      <div className='pb-2 flex-1 h-screen overflow-y-scroll' ref={scrollRef}>
        <Routes>
          <Route path='/profile/:userId' element={<Profile />} />
          <Route path='/*' element={<Listings user={user && user} />} />
        </Routes>
      </div>
    </div>
  );
};

export default Home;
