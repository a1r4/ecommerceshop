import React, { useState } from 'react';
import { IOrder } from '../../admin/orders/page'; // Adjust the path if necessary
import axios from 'axios';
import { useAppDispatch } from '@/app/redux/hooks';
import { setLoading } from '@/app/redux/features/loadingSlice';

interface EditOrderProps {
  setOpenEditOrder: (open: boolean) => void;
  setUpdateTable: (update: boolean) => void;
  order: IOrder;
}

const EditOrder: React.FC<EditOrderProps> = ({ setOpenEditOrder, setUpdateTable, order }) => {
  const [formData, setFormData] = useState(order);
  const dispatch = useAppDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setLoading(true));
    try {
      await axios.put(`/api/orders/${order._id}`, formData);
      setUpdateTable(true);
      setOpenEditOrder(false);
    } catch (error) {
      console.error('Failed to update order:', error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded-lg w-1/2">
        <h2 className="text-xl mb-4">Edit Order</h2>
        <form onSubmit={handleSubmit}>
          {/* Add form fields for editing order details */}
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="amount_total">
              Total Amount
            </label>
            <input
              type="number"
              name="amount_total"
              value={formData.amount_total}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
          {/* Add more fields as necessary */}
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Save
          </button>
          <button
            type="button"
            className="ml-2 bg-red-500 text-white px-4 py-2 rounded-lg"
            onClick={() => setOpenEditOrder(false)}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditOrder;
