import React, { Dispatch, SetStateAction, useState, useEffect } from 'react';
import Link from 'next/link'; // Import Link from Next.js
import { AiOutlineShoppingCart, AiOutlineUser } from 'react-icons/ai';
import { BsSearch } from 'react-icons/bs';


import { useAppSelector } from '@/app/redux/hooks';

import Image from 'next/image';
interface PropsType {
  setShowCart: Dispatch<SetStateAction<boolean>>;
}

const Navbar = ({ setShowCart }: PropsType) => {
  
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track user's authentication status
  const [username, setUsername] = useState('');

 

  const products = useAppSelector((state: any) => state.cartReducer);
  const totalItems = () => {
    let total = 0;
    products.forEach((item: any) => (total = total + item.quantity));
    return total;
  };

  return (
    <div className="pt-4 bg-white top-0 sticky">
      <div className="container">
        <div className="flex justify-between items-center">
          <Image className="inline-block w-full max-w-[100px] h-[70px] object-cover" src="/logo.jpg" alt="" width={500} height={500}/>
          <div className="lg:flex hidden w-full max-w-[500px]">
            <input
              className="border-2 border-accent px-6 py-2 w-full"
              type="text"
              placeholder="Search for products..."
            />
            <div className="bg-accent text-white text-[26px] grid place-items-center px-4">
              <BsSearch />
            </div>
          </div>

          <div className="flex gap-4 md:gap-8 items-center">
            <div className="md:flex hidden gap-3 items-center">
              <div
                className="rounded-full border-2 border-gray-300 text-gray-500 text-[32px]
                    [50px] h-[50px] w-[50px] grid place-items-center cursor-pointer"
                
              >
                <AiOutlineUser />
              </div>

              <div>
                
                 
          
                  <>
                    <p className="text-gray-500">
                      <span className="cursor-pointer" >Sign in</span>
                    </p>
                    <p className="font-medium">Your Account</p>
                  </>
              
              </div>
            </div>

            <div
              className="text-gray-500 text-[32px] relative cursor-pointer"
              onClick={() => setShowCart(true)}
            >
              <AiOutlineShoppingCart />
              <div className="absolute top-[-15px] right-[-10px] bg-red-600 w-[25px] h-[25px] rounded-full text-white text-[14px] grid place-items-center">
                {totalItems()}
              </div>
            </div>
          </div>
        </div>
        <div className="border-b border-gray-200 pt-4"></div>
      </div>

      
    </div>
  );
};

export default Navbar;
