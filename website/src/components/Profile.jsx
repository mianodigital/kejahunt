import React, { useEffect, useState } from 'react';
import { GoogleLogout } from 'react-google-login';
import { useNavigate, useParams } from 'react-router-dom';

import { ReactComponent as LogoutIcon } from '../assets/icons/logout.svg';
import { client } from '../sanity';
import { userCreatedListingsQuery, userQuery, userSavedListingsQuery } from '../utils/data';
import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';

const randomImage = 'https://source.unsplash.com/1600x900/?architecture';
const activeBtnStyles =
  'bg-ash-300 text-ash-700 font-bold p-2 rounded-full w-20 outline-none';
const notActiveBtnStyles =
  'bg-ash-200 mr-4 text-ash-700 font-bold p-2 rounded-full w-20 outline-none';

const Profile = () => {
  const [user, setUser] = useState();
  const [listings, setListings] = useState();
  const [activeBtn, setActiveBtn] = useState('created');
  const [text, setText] = useState('Created');

  const navigate = useNavigate();
  const { userId } = useParams();

  useEffect(() => {
    const query = userQuery(userId);

    client.fetch(query).then((data) => {
      setUser(data[0]);
    });
  }, [userId]);

  useEffect(() => {
    if (text === 'Created') {
      const createdListingsQuery = userCreatedListingsQuery(userId);

      client.fetch(createdListingsQuery).then((data) => {
        setListings(data);
      });
    } else {
      const savedListingsQuery = userSavedListingsQuery(userId);

      client.fetch(savedListingsQuery).then((data) => {
        setListings(data);
      });
    }
  }, [userId, text]);

  const logout = () => {
    localStorage.clear();
    navigate('/login');
  };

  if (!user) {
    return <Spinner message='Loading profile...' />;
  }

  return (
    <div className='relative pb-2 h-full justify-center items-center'>
      <div className='flex flex-col pb-5'>
        <div className='flex relative flex-col mb-7'>
          <div className='flex flex-col justify-center items-center'>
            <img
              src={randomImage}
              alt='architecture'
              className='w-full h-370 2xl:h-510 shadow-lg object-cover'
            />
            <img
              src={user.image}
              alt=''
              className='rounded-full w-20 h-20 -mt-10 shadow-xl object-cover'
            />
            <h1 className='font-bold text-3xl text-center mt-3 text-ash-400'>
              {user.userName}
            </h1>
            <p className='font-normal text-xl text-center text-ash-700'>
              {user.email}
            </p>
            <div className='absolute top-0 z-1 right-0 p-5'>
              {userId === user._id && (
                <GoogleLogout
                  clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
                  render={(renderProps) => (
                    <button
                      onClick={renderProps.onClick}
                      type='button'
                      className='bg-ash-200 p-2  rounded-full cursor-pointer outline-none'
                      disabled={renderProps.disabled}
                    >
                      <LogoutIcon className='h-10 w-10 fill-red-500' />
                    </button>
                  )}
                  onLogoutSuccess={logout}
                  cookiePolicy='single_host_origin'
                />
              )}
            </div>
          </div>
          <div className='text-center mt-5 mb-7'>
            <button
              onClick={(e) => {
                setText(e.target.textContent);
                setActiveBtn('created');
              }}
              type='button'
              className={`${
                activeBtn === 'created' ? activeBtnStyles : notActiveBtnStyles
              }`}
            >
              Created
            </button>
            <button
              onClick={(e) => {
                setText(e.target.textContent);
                setActiveBtn('saved');
              }}
              type='button'
              className={`${
                activeBtn === 'saved' ? activeBtnStyles : notActiveBtnStyles
              }`}
            >
              Saved
            </button>
          </div>
          {listings?.length ? (
            <div className='px-2'>
              <MasonryLayout listings={listings} />
            </div>
          ) : (
            <div className='flex justify-center items-center text-ash-700 font-bold w-full text-xl mt-2'>
              No listings found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
