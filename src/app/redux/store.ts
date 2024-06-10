import { configureStore } from '@reduxjs/toolkit';
import cartReducer from "./features/cartSlice";
import loadingReducer from "./features/loadingSlice";
import productReducer from "./features/productSlice";
import userReducer from "./features/userSlice";
import orderReducer from "./features/orderSlice"
export const store = configureStore({
    reducer: {
     cartReducer,
     productReducer,
     loadingReducer,
     userReducer, 
     orderReducer,  
    },
    devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;  

