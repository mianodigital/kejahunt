import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ReactComponent as DeleteIcon } from '../assets/icons/delete.svg';
import { ReactComponent as UploadIcon } from '../assets/icons/upload.svg';
import { client } from '../sanity';
import { categories } from '../utils/data';
import Spinner from './Spinner';

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
  const [geolocation, setGeolocation] = useState('');
  const [county, setCounty] = useState('');
  const [town, setTown] = useState('');
  const [estate, setEstate] = useState('');
  const [street, setStreet] = useState('');
  const [rent, setRent] = useState('');
  const [deposit, setDeposit] = useState('');
  const [extraCosts, setExtraCosts] = useState('');
  const [phoneNo, setPhoneNo] = useState('');

  // Other states
  const [loading, setLoading] = useState(false);
  const [fields, setFields] = useState(null);
  const [category, setCategory] = useState(null);
  const [imageAsset, setImageAsset] = useState(null);
  const [wrongimageType, setWrongImageType] = useState(null);

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
      geolocation &&
      county &&
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
        geolocation,
        county,
        town,
        estate,
        rent,
        deposit,
        extraCosts,
        phoneNo,
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
      <div className='flex lg:flex-row flex-col justify-center items-center bg-white lg:p-5 p-3 lg:w-4/5 w-full'>
        <div className='bg-ash-200 p-3 flex flex-0.7 w-full'>
          <div className='flex justify center items-center flex-col border-2 border-dotted border-gray-300 p-3 ww-full h-420'>
            {loading && <Spinner />}
            {wrongimageType && <p>Wrong image type</p>}
            {!imageAsset ? (
              <label className='cursor-pointer'>
                <div className='flex flex-col items-center justify-center h-full'>
                  <div className='flex flex-col justify-center items-center'>
                    <p className='font-bold text-2xl'>
                      <UploadIcon className='h-5 w-5' />
                    </p>
                    <p className='text-lg'>Click to upload</p>
                  </div>
                  <p className='mt-32 text-gray-400'>
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
                  className='bg-ash-400 absolute bottom-3 right-3 rounded-full text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out'
                >
                  <DeleteIcon className='h-5 w-5' />
                </button>
              </div>
            )}
          </div>
        </div>
        {/* Form */}

        <div className='flex flex-1 flex-col gap-6 lg:pl-5 mt-5 w-full'>
          {/* Title */}
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Add title'
            className='outline-none text-2xl sm:text-3xl font-bold border-b-2 border-gray-200 p-2'
          />
          {/* About */}
          <input
            type='text'
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            placeholder='Short description of your listing'
            className='outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2'
          />
          <div className='flex flex-col'>
            <div>
              <p className='mb-2 font-semibold text-lg sm:text-xl'>
                Choose listing category
              </p>
              <select
                onChange={(e) => setCategory(e.target.value)}
                className='outline-none w-4/5 text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer'
                name=''
                id=''
              >
                <option value='other' className='bg-white'>
                  Select Category
                </option>
                {categories.map((category) => (
                  <option
                    className='bg-white text-base border-0 outline-none capitalize text-ash-400'
                    value={category.name}
                    key={category.name}
                  >
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className=''>
              <input
                type='text'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder='Detailed description of your listing'
                className='outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2'
              />
              <input
                type='text'
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
                placeholder='Number of bedrooms'
                className='outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2'
              />
              <input
                type='text'
                value={bathrooms}
                onChange={(e) => setBathrooms(e.target.value)}
                placeholder='Number of bathrooms'
                className='outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2'
              />
              <input
                type='text'
                value={size}
                onChange={(e) => setSize(e.target.value)}
                placeholder='Size of listing in square feet'
                className='outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2'
              />
              <input
                type='text'
                value={features}
                onChange={(e) => setFeatures(e.target.value)}
                placeholder='Include features'
                className='outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2'
              />
              <input
                type='text'
                value={amenities}
                onChange={(e) => setAmenities(e.target.value)}
                placeholder='Amenities offered'
                className='outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2'
              />
              <input
                type='text'
                value={geolocation}
                onChange={(e) => setGeolocation(e.target.value)}
                placeholder='Geolocation'
                className='outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2'
              />
              <input
                type='text'
                value={county}
                onChange={(e) => setCounty(e.target.value)}
                placeholder='County of your listing'
                className='outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2'
              />
              <input
                type='text'
                value={town}
                onChange={(e) => setTown(e.target.value)}
                placeholder='Town of your listing'
                className='outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2'
              />
              <input
                type='text'
                value={estate}
                onChange={(e) => setEstate(e.target.value)}
                placeholder='Estate of your listing'
                className='outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2'
              />
              <input
                type='text'
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                placeholder='Street of your listing'
                className='outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2'
              />
              <input
                type='text'
                value={rent}
                onChange={(e) => setRent(e.target.value)}
                placeholder='Rent per month'
                className='outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2'
              />
              <input
                type='text'
                value={deposit}
                onChange={(e) => setDeposit(e.target.value)}
                placeholder='Security deposit'
                className='outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2'
              />
              <input
                type='text'
                value={extraCosts}
                onChange={(e) => setExtraCosts(e.target.value)}
                placeholder='Other costs'
                className='outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2'
              />
              <input
                type='text'
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                placeholder='Contact number'
                className='outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2'
              />
            </div>
            <div className='flex justify-between item-end mt-5'>
              {user && (
                <div className='flex gap-2 my-2 items-center rounded-lg md:hidden'>
                  <img
                    className='w-10 h-10 rounded-full'
                    src={user.image}
                    alt='user-profile'
                  />
                  <p className='text-ash-700 font-medium'>{user.userName}</p>
                </div>
              )}
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
    </div>
  );
};

export default CreateListing;
