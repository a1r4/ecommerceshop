import React, { Dispatch, SetStateAction } from 'react';
import { IOrder } from '../../admin/orders/page'; // Adjust the path if necessary

interface OrderRowProps {
  srNo: number;
  setOpenEditOrder: Dispatch<SetStateAction<boolean>>;
  setUpdateTable: Dispatch<SetStateAction<boolean>>;
  order: IOrder;
}

const OrderRow: React.FC<OrderRowProps> = ({ order, srNo, setOpenEditOrder, setUpdateTable }) => {
  return (
    <tr className='text-gray-700 border-t border-[#ececec]'>
      <td>{srNo}</td>
      <td>{order._id}</td>
      <td>{order.user}</td>
      <td>{order.amount_total}</td>
      <td>{order.currency}</td>
      <td>{order.payment_status}</td>
      <td>{order.customer_email}</td>
      <td>
        <button
          className='text-blue-500 hover:underline'
          onClick={() => setOpenEditOrder(true)}
        >
          Edit
        </button>
      </td>
    </tr>
  );
};

export default OrderRow;
