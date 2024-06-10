import { IUser } from "@/app/admin/users/page"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"

const initialState: IUser = {
    _id: "",
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  
}

export const userSlice = createSlice({
    name: "userSlice",
    initialState, 
    reducers: {
        setUser: (state, action: PayloadAction<IUser>) => {
            return action.payload
        }
    }
})

export const {setUser} = userSlice.actions
export default userSlice.reducer; 