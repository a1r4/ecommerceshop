import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {IOrder} from "../../admin/orders/page" // Adjust the path if necessary

const initialState: IOrder = {
  _id: "",
  user: "",
  items: [],
  amount_total: 0,
  currency: "",
  payment_status: "",
  customer_email: "",
  created_at: "",
};

export const orderSlice = createSlice({
  name: "orderSlice",
  initialState, 
  reducers: {
    setOrder: (state, action: PayloadAction<IOrder>) => {
      return action.payload;
    }
  }
});

export const { setOrder } = orderSlice.actions;
export default orderSlice.reducer;
