"use client" 

import EditUser from '@/app/components/admin-panel/EditUser';
import Popup from '@/app/components/admin-panel/Popup';
import UserRow from '@/app/components/admin-panel/UserRow';
import { setLoading } from '@/app/redux/features/loadingSlice';
import { useAppDispatch } from '@/app/redux/hooks';
import axios from 'axios';
import React, { useEffect, useState } from 'react';


export interface IUser {
  _id: string,
  username: string,
  firstName: string,
  lastName: string,
  email: string,
  password: string,
}

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [openEditUser, setOpenEditUser] = useState(false);
  const[updateTable, setUpdateTable] = useState(false);

  const dispatch = useAppDispatch()

  

  useEffect(() => {
    dispatch(setLoading(true));

    axios
    .get("/api/get_users")
    .then((res) => setUsers(res.data))
    .catch(err => console.log(err))
    .finally(() => dispatch(setLoading(false)));
  }, [updateTable]);

    

  return (<div>
    <div className='bg-white h-[calc(100vh-96px)] rounded-lg p-4'>
      <h2 className='text-3xl'>All Users</h2>
      <div className="mt-4 h-[clac(100vh-180px)] overflow-y-auto">
        <table className='w-full'>
          <thead>
            <tr className='text-gray-500 border-t border-[#ececec]'>
              <th>SR No.</th>
              <th>Username</th>
              <th>FirstName</th>
              <th>LastName</th>
              <th>Email</th>
              <th>Password</th>
            </tr>
            
          </thead>
          <tbody>
            {
              users.map((user: IUser, index) =>(
              <UserRow
                key={user._id}
                srNo={index + 1}
                setOpenEditUser={setOpenEditUser}
                setUpdateTable={setUpdateTable} 
                user={user}
              />
            ))
            }
          </tbody>
        </table>
      </div>
    </div>

    {openEditUser && (
      <EditUser setOpenEditUser={setOpenEditUser} setUpdateTable={setUpdateTable} />
    )}
  </div>
  )
};

export default Dashboard;
