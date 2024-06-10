"use client";

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Login from '@/app/components/admin-panel/Login';
import Loader from '@/app/components/admin-panel/Loader';
import Sidebar from '@/app/components/admin-panel/Sidebar';
import OrderRow from '@/app/components/admin-panel/OrderRow';
import EditOrder from '@/app/components/admin-panel/EditOrder';
import axios from 'axios';
import { setLoading } from '@/app/redux/features/loadingSlice';
import { useAppDispatch, useAppSelector } from '@/app/redux/hooks';

export interface IOrder {
    _id: string;
    user: string;
    items: Array<{
      product: string;
      quantity: number;
      price: number;
    }>;
    amount_total: number;
    currency: string;
    payment_status: string;
    customer_email: string;
    created_at: string;
}

const TransactionsDashboard = () => {
  const [openEditOrder, setOpenEditOrder] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<IOrder | null>(null);
  const [updateTable, setUpdateTable] = useState(false);
  const [orders, setOrders] = useState<IOrder[]>([]);

  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(state => state.loadingReducer);
  const { data: session } = useSession();

  useEffect(() => {
    dispatch(setLoading(true));

    axios.get("/api/get_orders")
      .then(res => setOrders(res.data))
      .catch(err => console.log(err))
      .finally(() => dispatch(setLoading(false)));
  }, [updateTable]);

  if (!session?.user) {
    return <Login />;
  }

  return (
    <div className='flex'>
     
      <div className='w-full h-full'>
        <div className='bg-gray-100 p-4 h-[calc(100vh-64px)]'>
          <h2 className='text-3xl'>All Transactions</h2>
          <div className="mt-4 h-[calc(100vh-180px)] overflow-y-auto">
            <table className='w-full'>
              <thead>
                <tr className='text-gray-500 border-t border-[#ececec]'>
                  <th>SR No.</th>
                  <th>Order ID</th>
                  <th>User</th>
                  <th>Total Amount</th>
                  <th>Currency</th>
                  <th>Status</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order: IOrder, index: number) => (
                  <OrderRow
                    key={order._id}
                    srNo={index + 1}
                    order={order}
                    setOpenEditOrder={(open) => {
                      setCurrentOrder(order);
                      setOpenEditOrder(open);
                    }}
                    setUpdateTable={setUpdateTable}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {isLoading && <Loader />}
      {openEditOrder && currentOrder && (
        <EditOrder
          setOpenEditOrder={setOpenEditOrder}
          setUpdateTable={setUpdateTable}
          order={currentOrder}
        />
      )}
    </div>
  );
};

export default TransactionsDashboard;
