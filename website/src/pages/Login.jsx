import React from 'react';
import GoogleLogin from 'react-google-login';
import { useNavigate } from 'react-router-dom';

import { ReactComponent as GoogleIcon } from '../assets/icons/google.svg';
import { ReactComponent as Logo } from '../assets/icons/kh-white.svg';
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
          <div className='p-5'>
            <Logo alt='logo' width='320px' />
          </div>
          <div className='shadow-xl'>
            <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
              render={(renderProps) => (
                <button
                  onClick={renderProps.onClick}
                  type='button'
                  className='bg-fire-500 flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none'
                  disabled={renderProps.disabled}
                >
                  <GoogleIcon className='mr-4 fill-fire-400 h-9' />
                  <p className='text-fire-400'>Sign in with Google</p>
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
