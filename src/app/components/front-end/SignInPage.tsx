import React, { useState, useEffect, useRef } from 'react';
import SignUpPage from './SignUpPage'; // Import your SignUpPage component
import { IoIosCloseCircleOutline } from "react-icons/io";
import axios from 'axios'; // Import axios for making HTTP requests
import { useAppSelector } from '@/app/redux/hooks';
import { useDispatch } from 'react-redux';
import { setUser } from '@/app/redux/features/userSlice';
import toast from 'react-hot-toast';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { setLoading } from "@/app/redux/features/loadingSlice";

const SignInPage = ({ setIsLoggedIn, closeSignInModal }: { setIsLoggedIn: Function, closeSignInModal: Function }) => {
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();

  const openSignUpModal = () => {
    setIsSignUpModalOpen(true);
  };

  const closeSignUpModal = () => {
    setIsSignUpModalOpen(false);
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setLoading(true));
    try {
      const response = await axios.post('/api/signin', { username, password });
      const { data } = response;
      if (data.success) {
        dispatch(setUser(data.user));
        setIsLoggedIn(true); // Set user as logged in
        closeSignInModal(); // Close sign-in modal
        console.log('User data:', data.user);
      } else {
        setErrorMessage(data.message);
        toast.error(data.message); // Display error message if login failed
      }
    } catch (error) {
      console.error('Error signing in:', error);
      setErrorMessage('An error occurred during sign-in. Please try again.');
      toast.error('An error occurred during sign-in. Please try again.');
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleGoogleLoginSuccess = async (response: any) => {
    try {
      const googleResponse = await axios.post('/api/google_signin', { token: response.credential });
      const { data } = googleResponse;
      if (data.success) {
        dispatch(setUser(data.user));
        setIsLoggedIn(true);
        closeSignInModal();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Error with Google sign-in:', error);
      toast.error('An error occurred during Google sign-in. Please try again.');
    }
  };

  useEffect(() => {
    const closeModalsOnOutsideClick = (event: MouseEvent) => {
      if (
        isSignUpModalOpen &&
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        closeSignUpModal();
      }
    };

    document.body.addEventListener('click', closeModalsOnOutsideClick);

    return () => {
      document.body.removeEventListener('click', closeModalsOnOutsideClick);
    };
  }, [isSignUpModalOpen]);

  return (
    <div>
      <h1>Sign In</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSignIn}>
        <div>
          <label className='block nl-1'>Username:</label>
          <input
            className="bg-gray-300 w-full px-4 py-2 border outline-pink rounded-md"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label className='block nl-1'>Password:</label>
          <input
            className="bg-gray-300 w-full px-4 py-2 border outline-pink rounded-md"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        <button className="bg-pink text-white px-8 py-2 rounded-md cursor-pointer" type="submit">
          Sign In
        </button>
      </form>
      <p>
        Don't have an account?{' '}
        <span className="text-blue-600 cursor-pointer" onClick={openSignUpModal}>
          Sign Up
        </span>
      </p>

      <GoogleOAuthProvider clientId={process.env.USER_CLIENT_ID!}>
        <GoogleLogin
          onSuccess={handleGoogleLoginSuccess}
          onError={() => {
            console.error('Login Failed');
            toast.error('Google sign-in failed. Please try again.');
          }}
        />
      </GoogleOAuthProvider>

      {/* Modal for Sign Up */}
      {isSignUpModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-md modal" ref={modalRef}>
            <SignUpPage />
            <IoIosCloseCircleOutline className="absolute top-4 right-4" onClick={closeSignUpModal}/>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignInPage;
