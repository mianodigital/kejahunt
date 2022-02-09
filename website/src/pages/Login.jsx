import React from 'react';
import GoogleLogin from 'react-google-login';
import { useNavigate } from 'react-router-dom';

import { ReactComponent as GoogleIcon } from '../assets/icons/google.svg';
import logo from '../assets/images/kh-white.png';
import loginBg from '../assets/images/login-bg.png';
import { client } from '../sanity';

const Login = () => {
  const navigate = useNavigate();
  const responseGoogle = (response) => {
    localStorage.setItem('user', JSON.stringify(response.profileObj));

    const { name, googleId, imageUrl, email } = response.profileObj;

    const doc = {
      _id: googleId,
      _type: 'user',
      userName: name,
      image: imageUrl,
      email: email,
    };

    client.createIfNotExists(doc).then(() => {
      navigate('/', { replace: true });
    });
    console.log(response);
  };

  return (
    <div className='flex justify-start items-center flex-col h-screen'>
      <div className='relative h-full w-full'>
        <img
          src={loginBg}
          alt='login bg'
          className='w-full h-full object-cover'
        />
        <div className='absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-darkOverlay'>
          <div className=''>
            <img src={logo} alt='logo' className='h-20' />
          </div>
          <div className='flex flex-col items-center p-10 text-center'>
            <h2 className='text-ash-100  text-3xl py-1'>
              Discover rental listings in your ideal location
            </h2>
            <p className='font-light text-xl py-1 text-ash-200'>
              Reduce the hassle of physical property lookup
            </p>
            <p className='font-light text-xl text-ash-300 py-5'>
              Are you a property owner or agent? <br /> Reach potential tenants
              with instant feedback
            </p>
          </div>
          <div className='shadow-xl'>
            <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
              render={(renderProps) => (
                <button
                  onClick={renderProps.onClick}
                  type='button'
                  className='bg-ash-400 flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none'
                  disabled={renderProps.disabled}
                >
                  <GoogleIcon className='mr-4 fill-ash-200 h-9' />
                  <p className='text-ash-200 text-xl'>Sign in with Google</p>
                </button>
              )}
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy='single_host_origin'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
