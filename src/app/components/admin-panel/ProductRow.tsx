import { IProduct } from "@/app/admin/dashboard/page";
import { setLoading } from "@/app/redux/features/loadingSlice";
import { setProduct } from "@/app/redux/features/productSlice";
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
    setOpenPopup: Dispatch<SetStateAction<boolean>>;
    setUpdateTable: Dispatch<SetStateAction<boolean>>;
    product: IProduct
}

const ProductRow = ({
    srNo, 
    setOpenPopup, 
    setUpdateTable, 
    product,
}: PropsType) => {
    const dispatch = useAppDispatch();
    
    const onEdit = () => {
        dispatch(setProduct(product));
        setOpenPopup(true);
    };

    const onDelete = () => {
        dispatch(setLoading(true))

        const payLoad = {
            fileKey: product.fileKey
        }

        

            axios.delete(`/api/delete_product/${product._id}`).then(res => {
                console.log(res.data);
                toast.success("Product deleted Successfully")
                setUpdateTable((prevState) => !prevState)
            }).catch((err) => console.log(err)
        ).finally(() => dispatch(setLoading(false)))
       
        
   };   

  return <tr>
    <td>
        <div>{srNo}</div>
    </td>
    <td>
        <div>{product.name}</div>
    </td>
    <td>${product.price}</td>
    <td className="py-2">
        <Image 
            src={product.imgSrc} 
            width={40} 
            height={40} 
            alt="product_image"
        />
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

export default ProductRow
