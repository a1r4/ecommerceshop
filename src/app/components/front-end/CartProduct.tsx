import React, { Dispatch, SetStateAction } from 'react'
import { RxCross1 } from 'react-icons/rx';
import { useAppDispatch } from '@/app/redux/hooks';
import { removeFromcart } from '@/app/redux/features/cartSlice';
import Image from 'next/image';
interface propsType {
    id: string;
    img: string;
    title: string;
    price: number;
    quantity: number;
}

const CartProduct: React.FC<propsType> = ({
    id, 
    img, 
    title,
    price,
    quantity,
}) => {
    const dispatch = useAppDispatch();

    return (
        <div className='flex justify-between items-center'>
            <div className='flex items-center gap-4'>
                <Image className='h-[80px]' src={img} alt={title}width={150} height={600} />
                <div className='space-y-2'>
                    <h3 className='font-medium'>{title}</h3>
                    <p className='text-gray-600 text-[14px]'>
                        {quantity} x ${price}
                    </p>
                </div>
            </div>

            <RxCross1 
            className='cursor-pointer'
            onClick={() => dispatch(removeFromcart(id))} />
        </div>
    );
};

export default CartProduct;
