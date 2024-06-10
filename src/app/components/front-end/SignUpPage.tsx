import { setLoading } from '@/app/redux/features/loadingSlice';
import { useAppDispatch } from '@/app/redux/hooks';
import axios from 'axios';
import React, { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';

interface IUser {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const SignUpPage = () => {
  const [user, setUser] = useState<IUser>({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    
  });

  const dispatch = useAppDispatch();

  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault();

    try {
      dispatch(setLoading(true));

      const response = await axios.post('/api/add_user', user);
      const { data } = response;

      toast.success(data.msg);

      setUser({
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
      });

      dispatch(setLoading(false));
    } catch (error) {
      console.error('Error signing up:', error);

     
      toast.error('An error occurred while signing up. Please try again.');
      
        
      

      dispatch(setLoading(false));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  return (
    <div>
      <h2>Create Account</h2>
      <form className='flex flex-col gap-4' onSubmit={handleSignUp}>
      <div>
          <label className='block nl-1'>Username:</label>
          <input className="bg-gray-300 w-full px-4 py-2 border outline-pink rounded-md" type="text" name="username" value={user.username} onChange={handleChange} />
        </div>
        <div>
          <label className='block nl-1'>First Name:</label>
          <input className="bg-gray-300 w-full px-4 py-2 border outline-pink rounded-md" type="text" name="firstName" value={user.firstName} onChange={handleChange} />
        </div>
        <div>
          <label className='block nl-1'>Last Name:</label>
          <input className="bg-gray-300 w-full px-4 py-2 border outline-pink rounded-md" type="text" name="lastName" value={user.lastName} onChange={handleChange} />
        </div>
        <div>
          <label className='block nl-1'>Email:</label>
          <input className="bg-gray-300 w-full px-4 py-2 border outline-pink rounded-md" type="email" name="email" value={user.email} onChange={handleChange} />
        </div>
        <div>
          <label className='block nl-1'>Password:</label>
          <input className="bg-gray-300 w-full px-4 py-2 border outline-pink rounded-md" type="password" name="password" value={user.password} onChange={handleChange} />
        </div>
        <div className='flex justify-end'>
          <button className='bg-pink text-white px-8 py-2 rounded-md' type="submit">Create Account</button>
        </div>
      </form>
    </div>
  );
};

export default SignUpPage;
