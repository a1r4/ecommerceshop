"use client"
import { setLoading } from '@/app/redux/features/loadingSlice';
import { useAppDispatch } from '@/app/redux/hooks';
import { makeToast } from '@/utils/helper';
import { UploadButton } from '@/utils/uploadthing';
import axios from 'axios';
import Image from 'next/image';
import React, { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';

interface Ipayload {
    imgSrc: null | string;
    filekey: null | string;
    name: string;
    category: string;
    price: string;
}

const ProductForm = () => {

    const [payLoad, setPayLoad] = useState<Ipayload>({
        imgSrc: null,
        filekey: null,
        name: "", 
        category: "",
        price: ""
    })

    const dispatch = useAppDispatch()

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()

        dispatch(setLoading(true))

        axios
        .post("/api/add_product", payLoad)
        .then((res) => {
            toast.success("Product added Successfully")
            setPayLoad({
                imgSrc: null,
                filekey: null,
                name: "", 
                category: "",
                price: ""
            });
        })
        .catch(err => console.log(err)
        ).finally(() => dispatch(setLoading(false)));
    };


  return (
  <form className='flex flex-col gap-4' onSubmit={handleSubmit}> 
  <Image 
    className="max-h-[300px] w-auto object-contain rounded-md"
    src={payLoad.imgSrc ? payLoad.imgSrc : "/placeholder.jpg"}
    width={800}
    height={500}
    alt="product_image"
    />

    <UploadButton 
    endpoint = "imageUploader"
    onClientUploadComplete={(res) => {
        console.log(res);

        setPayLoad({
            ...payLoad,
            imgSrc: res[0]?.url,
            filekey: res[0]?.key,
        });
    }}
    onUploadError={(error: Error) => {
        console.log(`ERROR! ${error}`);
    }}
    />

    <div>
        <label className='block nl-1'>Product Name</label>
        <input className="bg-gray-300 w-full px-4 py-2 border outline-pink rounded-md"
        type="text" 
        value={payLoad.name}
        onChange={(e) => setPayLoad({...payLoad, name: e.target.value})}
        required
        />
    </div>

    <div>
        <label className='block nl-1'>Product Category</label>
        <input className="bg-gray-300 w-full px-4 py-2 border outline-pink rounded-md"
        type="text" 
        value={payLoad.category}
        onChange={(e) => setPayLoad({...payLoad, category: e.target.value})}
        required
        />
    </div>
    <div>
        <label className='block nl-1'>Product Price</label>
        <input className="bg-gray-300 w-full px-4 py-2 border outline-pink rounded-md"
        type="text" 
        value={payLoad.price} 
        onChange={(e) => setPayLoad({...payLoad, price: e.target.value})}
        required
        />
    </div>

    <div className='flex justify-end'>
        <button className='bg-pink text-white px-8 py-2 rounded-md'>Add</button>

    </div>

  </form>
  );
};

export default ProductForm;
