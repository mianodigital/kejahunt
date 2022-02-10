import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ReactComponent as DeleteIcon } from '../assets/icons/delete.svg';
import { ReactComponent as UploadIcon } from '../assets/icons/upload.svg';
import { client } from '../sanity';
import { categories } from '../utils/data';
import CreateMap from './CreateMap';
import Spinner from './Spinner';

const ph =
  'outline-none text-light sm:text-lg border-b-2 border-ghost-200 p-2 placeholder:text-ash-700 placeholder:text-light text-ash-700 w-auto';

const CreateListing = ({ user }) => {
  // Listing states
  const [title, setTitle] = useState('');
  const [about, setAbout] = useState('');
  const [description, setDescription] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [size, setSize] = useState('');
  const [features, setFeatures] = useState('');
  const [amenities, setAmenities] = useState('');
  const [county, setCounty] = useState('');
  const [town, setTown] = useState('');
  const [location, setLocation] = useState('');
  const [estate, setEstate] = useState('');
  const [street, setStreet] = useState('');
  const [rent, setRent] = useState('');
  const [deposit, setDeposit] = useState('');
  const [extraCosts, setExtraCosts] = useState('');
  const [phoneNo, setPhoneNo] = useState('');

  // Other states
  const [loading, setLoading] = useState(false);
  const [fields, setFields] = useState();
  const [category, setCategory] = useState();
  const [imageAsset, setImageAsset] = useState();
  const [wrongimageType, setWrongImageType] = useState(false);

  const navigate = useNavigate();

  const uploadImage = (e) => {
    const selectedFile = e.target.files[0];
    if (
      selectedFile.type === 'image/png' ||
      selectedFile.type === 'image/svg' ||
      selectedFile.type === 'image/jpeg' ||
      selectedFile.type === 'image/gif' ||
      selectedFile.type === 'image/tiff'
    ) {
      setWrongImageType(false);
      setLoading(true);
      client.assets
        .upload('image', selectedFile, {
          contentType: selectedFile.type,
          filename: selectedFile.name,
        })
        .then((document) => {
          setImageAsset(document);
          setLoading(false);
        })
        .catch((error) => {
          console.log('Image upload failed', error.message);
        });
    } else {
      setWrongImageType(true);
      setLoading(false);
    }
  };

  const saveListing = () => {
    if (
      title &&
      about &&
      description &&
      imageAsset?._id &&
      category &&
      bedrooms &&
      bathrooms &&
      size &&
      features &&
      amenities &&
      county &&
      location &&
      town &&
      estate &&
      street &&
      rent &&
      deposit &&
      extraCosts &&
      phoneNo
    ) {
      const doc = {
        _type: 'listing',
        title,
        about,
        description,
        category,
        bedrooms,
        bathrooms,
        size,
        features,
        amenities,
        county,
        town,
        estate,
        street,
        rent,
        deposit,
        extraCosts,
        phoneNo,
        location,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: imageAsset?._id,
          },
        },
        userId: user._id,
        postedBy: {
          _type: 'postedBy',
          _ref: user._id,
        },
      };

      client.create(doc).then(() => {
        navigate('/');
      });
    } else {
      setFields(true);
      setTimeout(() => setFields(false), 2000);
    }
  };

  return (
    <div className='flex flex-col justify-center items-center mt-5 lg:h-4/5'>
      {fields && (
        <p className='text-red-500 mb-5 text-xl transition-all duration-150 ease-in'>
          Please fill in all fields
        </p>
      )}
      <div className='flex flex-col justify-center items-start bg-white lg:p-5 p-3 w-full rounded-lg'>
        <div className='bg-ash-200 p-3 flex items-start w-full rounded-lg'>
          <div className='flex justify-center items-center flex-col border-2 border-dashed border-ash-700 p-3 w-full h-420  rounded-lg'>
            {loading && <Spinner />}
            {wrongimageType && <p>Wrong image type</p>}
            {!imageAsset ? (
              <label className='cursor-pointer'>
                <div className='flex flex-col items-center justify-center h-full'>
                  <div className='flex flex-col justify-center items-center'>
                    <p className=' '>
                      <UploadIcon className='h-20 w-20 fill-ghost-500' />
                    </p>
                    <p className='font-bold text-2xl text-ghost-500'>
                      Click to upload
                    </p>
                  </div>
                  <p className='mt-8 text-ash-700 text-center text-sm'>
                    Please upload high quality JPG, SVG, PNG, GIF or TIFF less
                    than 20 MB.
                  </p>
                </div>
                <input
                  type='file'
                  name='upload-image'
                  onChange={uploadImage}
                  className='w-0 h-0'
                />
              </label>
            ) : (
              <div className='relative h-full'>
                <img
                  src={imageAsset?.url}
                  alt='upload pic'
                  className='w-full h-full'
                />
                <button
                  onClick={() => setImageAsset(null)}
                  type='button'
                  className='bg-ash-100 absolute bottom-3 right-3 p-3 rounded-full text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out'
                >
                  <DeleteIcon className='h-5 w-5 fill-red-500' />
                </button>
              </div>
            )}
          </div>
        </div>
        {/* Form */}
        <div className='flex flex-col w-full'>
          {/* Main Title */}
          <div className=' flex flex-col gap-2 mx-5 py-2'>
            <h2 className='mb-2 font-semibold text-lg sm:text-xl text-ash-400'>
              Basic Information
            </h2>
            <div className='flex flex-wrap gap-5'>
              <input
                type='text'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder='Property name'
                className={`${ph}`}
              />
              <input
                type='text'
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                placeholder='Contact number'
                className={`${ph}`}
              />
            </div>
            <textarea
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              placeholder='Short description'
              className={`${ph}`}
            />
          </div>
          {/* Category */}
          <div className='mx-5 my-5'>
            <p className='mb-2 font-semibold text-lg sm:text-xl text-ash-400'>
              Choose listing category
            </p>
            <select
              onChange={(e) => setCategory(e.target.value)}
              className='outline-none w-[90%] text-lg border-b-2 text-ash-700 border-ghost-200 p-2 cursor-pointer'
              name=''
              id=''
            >
              <option value='other' className='hover:bg-ash-400 bg-white '>
                Select Category
              </option>
              {categories.map((category) => (
                <option
                  className={`${ph} shadow-none`}
                  value={category.name}
                  key={category.name}
                >
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          {/* Dimensions */}
          <div className='flex flex-col mx-5 my-5'>
            <h3 className='mb-2 font-semibold text-lg sm:text-xl text-ash-400'>
              Dimensions & Capacity
            </h3>
            <div className='flex gap-5 flex-wrap'>
              <input
                type='text'
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
                placeholder='Bedrooms'
                className={`${ph}`}
              />
              <input
                type='text'
                value={bathrooms}
                onChange={(e) => setBathrooms(e.target.value)}
                placeholder='Bathrooms'
                className={`${ph}`}
              />
              <input
                type='text'
                value={size}
                onChange={(e) => setSize(e.target.value)}
                placeholder='Size in sqft'
                className={`${ph}`}
              />
            </div>
          </div>
          {/* Further Details */}
          <div className='mx-5 my-5'>
            <h3 className='mb-2 font-semibold text-lg sm:text-xl text-ash-400'>
              Further Information
            </h3>
            <div className='flex flex-col flex-wrap gap-5'>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder='Detailed description'
                className={`${ph}`}
              />
              <textarea
                value={features}
                onChange={(e) => setFeatures(e.target.value)}
                placeholder='Features'
                className={`${ph}`}
              />
              <textarea
                value={amenities}
                onChange={(e) => setAmenities(e.target.value)}
                placeholder='Amenities'
                className={`${ph}`}
              />
            </div>
          </div>
          {/* Location Data */}
          <div className='mx-5 my-5'>
            <h3 className='mb-2 font-semibold text-lg sm:text-xl text-ash-400'>
              Location Information
            </h3>
            <div className='flex flex-wrap gap-5'>
              <CreateMap />
              <input
                type='text'
                value={county}
                onChange={(e) => setCounty(e.target.value)}
                placeholder='County'
                className={`${ph}`}
              />
              <input
                type='text'
                value={town}
                onChange={(e) => setTown(e.target.value)}
                placeholder='Town'
                className={`${ph}`}
              />
              <input
                type='text'
                value={estate}
                onChange={(e) => setEstate(e.target.value)}
                placeholder='Estate'
                className={`${ph}`}
              />
              <input
                type='text'
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                placeholder='Street'
                className={`${ph}`}
              />
            </div>
          </div>
          {/* Pricing */}
          <div className='mx-5 my-5'>
            <h3 className='mb-2 font-semibold text-lg sm:text-xl text-ash-400'>
              Pricing Information
            </h3>
            <div className='flex flex-wrap gap-5'>
              <input
                type='text'
                value={rent}
                onChange={(e) => setRent(e.target.value)}
                placeholder='Rent / month'
                className={`${ph}`}
              />
              <input
                type='text'
                value={deposit}
                onChange={(e) => setDeposit(e.target.value)}
                placeholder='Security deposit'
                className={`${ph}`}
              />
              <input
                type='text'
                value={extraCosts}
                onChange={(e) => setExtraCosts(e.target.value)}
                placeholder='Other costs'
                className={`${ph}`}
              />
            </div>
          </div>
          {/* Call to Action */}
          <div className='flex items-center justify-end'>
            <button
              onClick={saveListing}
              type='button'
              className='text-ash-200 bg-ash-400 px-5 py-3 rounded-lg'
            >
              Save Listing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateListing;
