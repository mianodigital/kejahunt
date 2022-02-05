import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { ReactComponent as DeleteIcon } from '../assets/icons/delete.svg';
import { ReactComponent as DownloadIcon } from '../assets/icons/download.svg';
import { client, urlFor } from '../sanity';

const Property = ({
  property: {
    postedBy,
    image,
    _id,
    about,
    bathrooms,
    bedrooms,
    category,
    price,
    save,
  },
}) => {
  const [postHovered, setPostHovered] = useState(false);
  const navigate = useNavigate();
  const user =
    localStorage.getItem('user') !== 'undefined'
      ? JSON.parse(localStorage.getItem('user'))
      : localStorage.clear();

  const alreadySaved = !!save?.filter(
    (item) => item?.postedBy?._id === user?.googleId
  )?.length;

  const saveProperty = (id) => {
    if (alreadySaved) {
      client
        .patch(id)
        .setIfMissing({ save: [] })
        .insert('after', 'save[-1]', [
          {
            _key: uuidv4(),
            userId: user?.googleId,
            postedBy: {
              _type: 'postedBy',
              _ref: user?.googleId,
            },
          },
        ])
        .commit()
        .then(() => {
          window.location.reload();
        });
    }
  };

  const deleteProperty = (id) => {
    client.delete(id).then(() => {
      window.location.reload();
    });
  };

  return (
    <div className='m-2'>
      <div
        className='relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out'
        onMouseEnter={() => setPostHovered(true)}
        onMouseLeave={() => setPostHovered(false)}
        onClick={() => navigate(`/property-detail/${_id}`)}
      >
        <img
          src={urlFor(image).width(250).url()}
          alt='user'
          className='w-full rounded-md'
        />
        {postHovered && (
          <div
            className='absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50'
            style={{ height: '100%' }}
          >
            <div className='flex items-center justify-between'>
              <div className='flex gap-2'>
                <a
                  href={`${image?.asset?.url}?dl=`}
                  download
                  onClick={(e) => e.stopPropagation()}
                  className='bg-white w-9 h-9 rounded-md flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none'
                >
                  <DownloadIcon className='h-4 w-5' />
                </a>
              </div>
              {alreadySaved ? (
                <button
                  type='button'
                  className='bg-ash-400 text-ash-200 font-medium px-5 py-1 text-base rounded-3xl opacity-70 hover:opacity-100 hover:shadow-md outline-none'
                >
                  {save?.length} Saved
                </button>
              ) : (
                <button
                  type='button'
                  className='bg-ash-400 text-ash-200 font-medium px-5 py-1 text-base rounded-3xl opacity-70 hover:opacity-100 hover:shadow-md outline-none'
                  onClick={(e) => {
                    e.stopPropagation();
                    saveProperty(_id);
                  }}
                >
                  Save
                </button>
              )}
            </div>
            <div className=' flex justify-between items-center gap-2 w-full'>
              {about?.slice(8).length > 0 ? (
                <a
                  href={about}
                  target='_blank'
                  className='bg-white flex items-center gap-2 text-black font-bold p-2 pl-4 pr-4 rounded-full opacity-70 hover:opacity-100 hover:shadow-md'
                  rel='noreferrer'
                >
                  {about?.slice(8, 17)}...
                </a>
              ) : undefined}
              {postedBy?._id === user?.googleId && (
                <button
                  type='button'
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteProperty(_id);
                  }}
                  className='bg-white p-2 rounded-full w-8 h-8 flex items-center justify-center text-dark opacity-75 hover:opacity-100 outline-none'
                >
                  <DeleteIcon className='h-5 w-5 fill-ash-400' />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      <Link
        to={`profile/${postedBy?._id}`}
        className='flex gap-2 mt-2 items-center'
      >
        <img
          src={postedBy?.image}
          alt='user-profile'
          className='w-8 h-8 rounded-full object-cover'
        />
        <p className='font-semi-bold capitalize'>{postedBy?.userName}</p>
      </Link>
    </div>
  );
};

export default Property;
