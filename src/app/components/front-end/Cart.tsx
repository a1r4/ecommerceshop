import React, { Dispatch, SetStateAction, useState } from 'react'
import { RxCross1 } from 'react-icons/rx';
import CartProduct from "./CartProduct";
import { useAppSelector } from '@/app/redux/hooks';

import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
const stripePromise = loadStripe('pk_test_51PPRcA2Ndzri51qOUfqreowVKbSSuhqL5VVNNaw1R4L8baGRIwXuELCBLWOf9WcTpGBwSpNL6fsoke6fLoMPQMwa00vtKo4Qzo');
const Cart = ({ setShowCart }: any) => {
    const products = useAppSelector((state: any) => state.cartReducer);
    const [view, setView] = useState('cart');

    const getTotal = () => {
        let total = 0;
        products.forEach((item: any) => (total = total + item.price * item.quantity));
        return total;
    };

    const totalItems = () => {
        let total = 0;
        products.forEach((item: any) => (total = total + item.quantity));
        return total;
    }

    const renderCart = () => (
        <>
            <div className='flex justify-between items-center font-medium text-xl py-4'>
                <p>Total:</p>
                <p>{totalItems()} item(s)</p>
            </div>
            <h3 className='pt-6 text-lg font-medium text-gray-600 uppercase'>Your Cart</h3>
            <div className="mt-6 space-y-2" style={{ maxHeight: 'calc(100vh - 250px)', overflowY: 'auto' }}>
                {products?.map((item: any) => (
                    <CartProduct
                        key={item.id}
                        id={item.id}
                        img={item.img}
                        title={item.title}
                        price={item.price}
                        quantity={item.quantity}
                    />
                ))}
            </div>
            <div className='flex justify-between items-center font-medium text-xl py-4'>
                <p>Total:</p>
                <p>${getTotal()}</p>
            </div>
            <button className="bg-black text-white text-center w-full rounded-3xl py-2 hover:bg-accent mb-4 mt-4"
                onClick={() => setView('viewCart')}>
                View Cart 
            </button>
            <button className="bg-black text-white text-center w-full rounded-3xl py-2 hover:bg-accent"
                onClick={() => setView('checkout')}>
                CheckOut
            </button>
           
            
        </>
    );

    const renderViewCart = () => (
        <>
            <h3 className='pt-6 text-lg font-medium text-gray-600 uppercase'>Your Enlarged Cart</h3>
            <div className="mt-6 space-y-2">
                {products?.map((item: any) => (
                    <CartProduct
                        key={item.id}
                        id={item.id}
                        img={item.img}
                        title={item.title}
                        price={item.price}
                        quantity={item.quantity}
                        
                    />
                ))}
            </div>
            <button className="bg-black text-white text-center w-full rounded-3xl py-2 hover:bg-accent mt-4"
                onClick={() => setView('cart')}>
                Back to Cart
            </button>
        </>
    );

    return (
        <div className='bg-[#0000007d] w-full min-h-screen fixed left-0 top-0 z-20 overflow-y-scroll'>
            <div className='max-w-[400px] w-full min-h-full bg-white absolute right-0 top-0 p-6'>
                <RxCross1 className="absolute right-0 top-0 m-6 text-[24px] cursor-pointer"
                    onClick={() => setShowCart(false)}
                />
                {view === 'cart' && renderCart()}
                {view === 'viewCart' && renderViewCart()}
                {view === 'checkout' && <Elements stripe={stripePromise}></Elements>}
            </div>
        </div>
    );
};

export default Cart;