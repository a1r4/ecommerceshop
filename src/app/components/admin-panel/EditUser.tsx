import { setLoading } from '@/app/redux/features/loadingSlice';
import { useAppDispatch, useAppSelector } from '@/app/redux/hooks';
import { makeToast } from '@/utils/helper';
import axios from 'axios';
import React, { Dispatch, FormEvent, SetStateAction, useState } from 'react';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import Image from "next/image";
import { UploadButton } from '@/utils/uploadthing';
import toast from 'react-hot-toast';

interface PropsType {
    setOpenEditUser: Dispatch<SetStateAction<boolean>>;
    setUpdateTable: Dispatch<SetStateAction<boolean>>;
}

const EditUser = ({setOpenEditUser, setUpdateTable}: PropsType) => {
    const userData = useAppSelector((state) => state.userReducer)
    const dispatch = useAppDispatch()

    const [inputData, setInputData] = useState({
        username: userData.username,
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email, 
        password: userData.password
    })

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        dispatch(setLoading(true))

        axios.put(`/api/edit_user/${userData._id}`, inputData).then((res) => {
            toast.success("Account Updated Succesfully")
            setUpdateTable((prevState) => !prevState) 
        })
        .catch((err) => console.log(err))
        .finally(() => {
            dispatch(setLoading(false));
            setOpenEditUser(false);
        });
    };

    return (
    <div className='fixed top-0 left-0 w-full h-screen bg-[#00000070] grid place-items-center'>
        <div className='bg-white w-[700px] py-8 rounded-lg text-center relative'>
             <IoIosCloseCircleOutline
             className="absolute text-2xl right-0 top-0 m-4 cursor-pointer hover:text-mod-600" 
             onClick={() => setOpenEditUser(false)}
             />

        

           

             <h2 className="text-2xl -mt-3">Edit Product</h2>
             <form className='mt-6 w-fit space-y-4 mx-auto' onSubmit={handleSubmit}>
             <input 
                className="border block border-gray-500 outline-none px-4 py-2 rounded-lg w-fit"
                type="text"
                placeholder='Username'
                value={inputData.username}
                onChange={(e) =>
                    setInputData({ ...inputData, username: e.target.value })
                }
                required 
                />
                <input 
                className="border block border-gray-500 outline-none px-4 py-2 rounded-lg w-fit"
                type="text"
                placeholder='FirstName'
                value={inputData.firstName}
                onChange={(e) =>
                    setInputData({ ...inputData, firstName: e.target.value })
                }
                required 
                />
                <input 
                className="border block border-gray-500 outline-none px-4 py-2 rounded-lg w-fit"
                type="text"
                placeholder='LastName'
                value={inputData.lastName}
                onChange={(e) =>
                    setInputData({ ...inputData, lastName: e.target.value })
                }
                required 
                />
                <input 
                className="border block border-gray-500 outline-none px-4 py-2 rounded-lg w-fit"
                type="text"
                placeholder='Email'
                value={inputData.email}
                onChange={(e) =>
                    setInputData({ ...inputData, email: e.target.value })
                }
                required 
                />
                <input 
                className="border block border-gray-500 outline-none px-4 py-2 rounded-lg w-fit"
                type="text"
                placeholder='Password'
                value={inputData.password}
                onChange={(e) =>
                    setInputData({ ...inputData, password: e.target.value })
                }
                required 
                />
                <div className='flex justify-end'>
                    <button className='bg-accent block text-white px-8 py-2 rounded-lg self-center'>
                        Save
                    </button>
                </div>
             </form>
        </div>
    </div>
    )
};

export default EditUser;
