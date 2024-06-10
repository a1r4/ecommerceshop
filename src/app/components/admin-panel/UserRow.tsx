import { IUser } from "@/app/admin/users/page";
import { setLoading } from "@/app/redux/features/loadingSlice";
import { setUser } from "@/app/redux/features/userSlice";
import { useAppDispatch } from "@/app/redux/hooks";
import { makeToast } from "@/utils/helper";
import axios from "axios";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import toast from "react-hot-toast";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin5Line } from "react-icons/ri";

interface PropsType {
    srNo: number;
    setOpenEditUser: Dispatch<SetStateAction<boolean>>;
    setUpdateTable: Dispatch<SetStateAction<boolean>>;
    user: IUser
}

const UserRow = ({
    srNo, 
    setOpenEditUser, 
    setUpdateTable, 
    user,
}: PropsType) => {
    const dispatch = useAppDispatch();
    
    const onEdit = () => {
        dispatch(setUser(user));
        setOpenEditUser(true);
    };

    const onDelete = () => {
        dispatch(setLoading(true))

        

        

            axios.delete(`/api/delete_user/${user._id}`).then(res => {
                console.log(res.data);
                toast.success("User deleted Successfully")
                setUpdateTable((prevState) => !prevState)
            }).catch((err) => console.log(err)
        ).finally(() => dispatch(setLoading(false)))
       
        
   };   

  return <tr>
    <td>
        <div>{srNo}</div>
    </td>
    <td>
        <div>{user.username}</div>
    </td>
    <td>
        <div>{user.firstName}</div>
    </td>
    <td>{user.lastName}</td>
    <td>
        {user.email}
    </td>
    <td >
        {user.password}
    </td>
    <td>
        <div className="text-2xl flex items-center gap-2 text-gray-600">
        <CiEdit 
          className="cursor-pointer hover:text-black"
          onClick={onEdit} 
        />
        <RiDeleteBin5Line
           className="text=[20px] cursor-pointer hover:text-red-600"
           onClick={onDelete}
           />
        </div>
    </td>
  </tr>
};

export default UserRow
