import React, { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAppSelector } from '@/app/redux/hooks';

const Checkout = ({ setView }: any) => {
    const [billingAddress, setBillingAddress] = useState('');
    const [currency, setCurrency] = useState('USD');
    const [amountTotal, setAmountTotal] = useState(0);
    const [customerEmail, setCustomerEmail] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const userData = useAppSelector((state) => state.userReducer);
    const cartItems = useAppSelector((state) => state.cartReducer)

    useEffect(() => {
        // Calculate total amount from cartItems
        const total = cartItems.reduce((sum: number, item: { price: number; quantity: number; }) => sum + item.price * item.quantity, 0);
        setAmountTotal(total);
        setCustomerEmail(userData.email);
    }, [cartItems, userData]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            return;
        }

        const cardElement = elements.getElement(CardElement);

        if (!cardElement) {
            // Handle the case when cardElement is null
            console.error('Card element not found');
            toast.error('Error processing payment. Please try again later.');
            return;
        }

        try {
            const { error, paymentMethod } = await stripe.createPaymentMethod({
                type: 'card',
                card: cardElement,
                billing_details: {
                    address: {
                        line1: billingAddress,
                    },
                    email: customerEmail,
                    name: userData.username, // Assuming userData has a name field
                },
            });

            if (error) {
                console.error(error);
                toast.error('Payment failed: ' + error.message);
            } else {
                console.log('PaymentMethod created:', paymentMethod);

                // Send payment information to your server
                const response = await axios.post('/api/add_order', {
                    user: userData._id,
                    items: cartItems,
                    amount_total: amountTotal,
                    currency,
                    payment_status: 'paid',
                    customer_email: customerEmail,
                });

                if (response.data.msg === "Created Order successfully") {
                    toast.success('Payment successful!');
                    setView('cart');
                } else {
                    toast.error('Payment failed: ' + response.data.msg);
                }
            }
        } catch (error) {
            console.error('Error processing payment:', error);
            toast.error('Error processing payment. Please try again later.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3 className='pt-6 text-lg font-medium text-gray-600 uppercase'>Checkout</h3>
            <div className='mt-6'>
                <label className='block mb-2'>Billing Address</label>
                <input
                    type='text'
                    value={billingAddress}
                    onChange={(e) => setBillingAddress(e.target.value)}
                    className='w-full p-2 border border-gray-300 rounded'
                    required
                />
            </div>
            <div className='mt-4'>
                <label className='block mb-2'>Email</label>
                <input
                    type='email'
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className='w-full p-2 border border-gray-300 rounded'
                    required
                />
            </div>
            <div className='mt-4'>
                <label className='block mb-2'>Currency</label>
                <input
                    type='text'
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className='w-full p-2 border border-gray-300 rounded'
                    required
                />
            </div>
            <div className='mt-4'>
                <label className='block mb-2'>Total Amount</label>
                <input
                    type='number'
                    value={amountTotal}
                    onChange={(e) => setAmountTotal(Number(e.target.value))}
                    className='w-full p-2 border border-gray-300 rounded'
                    readOnly
                />
            </div>
            <div className='mt-4'>
                <label className='block mb-2'>Credit Card Number</label>
                <CardElement className='w-full p-2 border border-gray-300 rounded' />
            </div>
            <button type='submit' className="bg-black text-white text-center w-full rounded-3xl py-2 hover:bg-accent mt-4">
                Submit Payment
            </button>
            <button type='button' className="bg-black text-white text-center w-full rounded-3xl py-2 hover:bg-accent mt-4"
                onClick={() => setView('cart')}>
                Back to Cart
            </button>
        </form>
    );
};

export default Checkout;
