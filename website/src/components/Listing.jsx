import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { ReactComponent as BathIcon } from '../assets/icons/bath.svg';
import { ReactComponent as BedIcon } from '../assets/icons/bed.svg';
import { ReactComponent as DeleteIcon } from '../assets/icons/delete.svg';
import { ReactComponent as DownloadIcon } from '../assets/icons/download.svg';
import { client, urlFor } from '../sanity';

const Listing = ({ listing }) => {
  const [postHovered, setPostHovered] = useState(false);
  const [savingPost, setSavingPost] = useState(false);
  const navigate = useNavigate();
  const {
    image,
    _id,
    title,
    bedrooms,
    bathrooms,
    street,
    town,
    estate,
    county,
    rent,
    postedBy,
  } = listing;
  const user =
    localStorage.getItem('user') !== 'undefined'
      ? JSON.parse(localStorage.getItem('user'))
      : localStorage.clear();

  let alreadySaved = listing.save?.filter(
    (item) => item?.postedBy?._id === user?.googleId
  );

  alreadySaved = alreadySaved?.length > 0 ? alreadySaved : [];

  const saveListing = (id) => {
    if (alreadySaved?.length === 0) {
      setSavingPost(true);
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
          setSavingPost(false);
        });
    }
  };

  const deleteListing = (id) => {
    client.delete(id).then(() => {
      window.location.reload();
    });
  };

  return (
    <div
      className='m-2 bg-ash-100 rounded-lg cursor-pointer overflow-hidden'
      onMouseEnter={() => setPostHovered(true)}
      onMouseLeave={() => setPostHovered(false)}
      onClick={() => navigate(`/listing-detail/${_id}`)}
    >
      <div className='relative cursor-zoom-in w-auto hover:shadow-lg transition-all duration-500 ease-in-out'>
        <img
          src={urlFor(image).width(240).url()}
          alt='user'
          className='w-full'
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
              {alreadySaved?.length !== 0 ? (
                <button
                  type='button'
                  className='bg-ash-400 text-ash-200 font-medium px-5 py-1 text-base rounded-3xl opacity-70 hover:opacity-100 hover:shadow-md outline-none'
                >
                  {listing?.save?.length} Saved
                </button>
              ) : (
                <button
                  type='button'
                  className='bg-ash-400 text-ash-200 font-medium px-5 py-1 text-sm rounded-3xl opacity-80 hover:opacity-100 hover:shadow-md outline-none'
                  onClick={(e) => {
                    e.stopPropagation();
                    saveListing(_id);
                  }}
                >
                  {listing?.save?.length} {savingPost ? 'Saving' : 'Save'}
                </button>
              )}
            </div>
            <div className=' flex justify-between items-center gap-2 w-full'>
              <p className='bg-white flex items-center text-black text-sm font-medium py-1 px-4 rounded-full opacity-70 hover:opacity-100 hover:shadow-md'>
                {town}, {county}
              </p>
              {postedBy?._id === user?.googleId && (
                <button
                  type='button'
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteListing(_id);
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
      <div className='flex flex-col gap-1 mt-2 px-2 pb-5'>
        <div className='flex items-center gap-2 justify-between'>
          <p className='text-xl font-bold text-ash-400'>{rent} / mo</p>
          <div className='flex gap-4'>
            <div className='flex items-center gap-1'>
              <BedIcon className='h-5 w-5 fill-ash-400' />
              <p className='text-md font-bold text-ash-400'>{bedrooms}</p>
            </div>
            <div className='flex items-center gap-1'>
              <BathIcon className='h-4 w-4 fill-ash-400' />
              <p className='text-md font-bold text-ash-400'>{bathrooms}</p>
            </div>
          </div>
        </div>
        <div className='flex flex-col'>
          <p className='text-base font-semibold text-ash-800'>{title}</p>
          <p className='text-sm text-ash-700'>
            {street}, {estate}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Listing;
