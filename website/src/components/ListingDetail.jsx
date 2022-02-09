import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { client, urlFor } from '../sanity';
import { listingDetailMoreQuery, listingDetailQuery } from '../utils/data';
import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';

const ListingDetail = ({ user }) => {
  const { listingId } = useParams();
  const [comment, setComment] = useState('');
  const [listingDetail, setListingDetail] = useState();
  const [listings, setListings] = useState();
  const [addingComment, setAddingComment] = useState(false);

  const fetchListingDetails = () => {
    const query = listingDetailQuery(listingId);
    if (query) {
      client.fetch(`${query}`).then((data) => {
        setListingDetail(data[0]);
        if (data[0]) {
          const query1 = listingDetailMoreQuery(data[0]);
          client.fetch(query1).then((response) => {
            setListings(response);
          });
        }
      });
    }
  };

  useEffect(() => {
    fetchListingDetails();
  }, [listingId]);

  const addComment = () => {
    if (comment) {
      setAddingComment(true);
      client
        .patch(listingId)
        .setIfMissing({ comments: [] })
        .insert('after', 'comments[-1]', [
          {
            comment,
            _key: uuidv4(),
            postedBy: {
              _type: 'postedBy',
              _ref: user._id,
            },
          },
        ])
        .commit()
        .then(() => {
          fetchListingDetails();
          setComment('');
          setAddingComment(false);
        });
    }
  };

  if (!listingDetail) return <Spinner message='Loading listing...' />;

  return (
    <>
      {listingDetail && (
        <div
          className='flex flex-col m-auto bg-white'
          style={{ maxWidth: '1500px', borderRadius: '32px' }}
        >
          <div className='flex justify-center '>
            <img
              src={listingDetail?.image && urlFor(listingDetail.image).url()}
              alt='listing'
              className='rounded-t-3xl rounded-b-lg'
            />
          </div>
          <div className='md:w-[60%] w-full-height p-5'>
            {/* Basic Information */}
            <div className='flex items-center justify-between'>
              <p className='text-4xl font-bold break-words mt-3 text-ash-400'>
                {listingDetail.title}
              </p>
              <p className='text-4xl font-bold break-words mt-3 text-ash-400'>
                {listingDetail.rent} / mo
              </p>
            </div>
            <div className='flex gap-2 items-center justify-between'>
              <p className='text-xl font-bold break-words mt-3'>
                {listingDetail.about}
              </p>
              <Link
                to={`profile/${listingDetail?.postedBy?._id}`}
                className='flex gap-2 mt-5 items-center bg-white rounded-lg'
              >
                <p className='font-semibold capitalize'>
                  {listingDetail?.postedBy?.userName}
                </p>
                <img
                  src={listingDetail?.postedBy?.image}
                  alt='profile'
                  className='w-8 h-8 rounded-full object-cover'
                />
              </Link>
            </div>
            <div className='flex flex-col gap-2 mt-5'>
              <div className='flex justify-between'>
                <p>{listingDetail.geolocation}</p>
                <p className=''>{listingDetail.phoneNo}</p>
              </div>
              <div className='flex gap-2 justify-between'>
                <p>{listingDetail.street}</p>
                <p className=''>
                  {listingDetail.bedrooms} Bed {listingDetail.bathrooms} Bath
                </p>
              </div>
              <div className='flex gap-2 justify-between'>
                <p className=''>
                  {listingDetail.town}, {listingDetail.county}
                </p>
                <p className=''>{listingDetail.size} SqFt</p>
              </div>
            </div>

            {/* More Information */}
            <div>
              <div className=''>
                <h1 className='text-xl font-bold break-words mt-3'>
                  Description
                </h1>
                <p>{listingDetail.description}</p>
              </div>
              <div className=''>
                <h1 className='text-xl font-bold break-words mt-3'>Features</h1>
                <p>{listingDetail.features}</p>
              </div>
              <div className=''>
                <h1 className='text-xl font-bold break-words mt-3'>
                  Amenities
                </h1>
                <p>{listingDetail.amenities}</p>
              </div>
              <div className=''>
                <h1 className='text-xl font-bold break-words mt-3'>Pricing</h1>
                <div className=''>
                  <p>{listingDetail.rent}</p>
                  <p>{listingDetail.deposit}</p>
                </div>

                <div className=''>
                  <h3 className='text-xl font-bold break-words mt-3'>
                    Other Costs
                  </h3>
                  <p>{listingDetail.extraCosts}</p>
                </div>
              </div>
            </div>
            {/* Comments */}
            <div className=''>
              <h1 className='mt-5 text-xl font-bold'>Comments</h1>
              <div className='max-h-370 overflow-y-auto'>
                {listingDetail?.comments?.map((comment, i) => (
                  <div
                    className='flex gap-2 mt-5 items-center bg-white rounded-lg'
                    key={i}
                  >
                    <img
                      src={comment.postedBy?.image}
                      alt='comment'
                      className='w-10 h-10 rounded-full cursor-pointer'
                    />
                    <div className='flex flex-col'>
                      <p className='font-bold'>{comment.postedBy?.userName}</p>
                      <p>{comment?.comment}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Create comment */}
            <div className='flex flex-wrap mt-6 gap-3 items-center'>
              <Link
                to={`/profile/${user._id}`}
                className='border-2 border-ghost-100 rounded-full'
              >
                <img
                  src={user.image}
                  alt='profile'
                  className='w-8 h-8 rounded-full cursor-pointer m-2'
                />
              </Link>
              <input
                type='text'
                className='flex-1 border-ghost-100 outline-none border-2 p-2 rounded-full focus:border-gray-300'
                placeholder='Add a comment'
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <button
                onClick={addComment}
                type='button'
                className='bg-ash-400 text-white font-semibold rounded-full px-6 py-2 text-base outline-none'
              >
                {addingComment ? 'Posting...' : 'Post'}
              </button>
            </div>
          </div>
        </div>
      )}
      {listings?.length > 0 && (
        <h2 className='text-center font-bold text-2x mt-8 mb-5'>
          More like this
        </h2>
      )}
      {listings ? (
        <MasonryLayout listings={listings} />
      ) : (
        <Spinner message='Loading more listings...' />
      )}
    </>
  );
};

export default ListingDetail;
