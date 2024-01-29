import { ICustomer } from "@/lib/types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IState {
  value: ICustomer;
}

const initialState: IState = {
  value: {
    _id: "",
    email: "",
    fullName: "",
    phoneNumber: "",
    createdAt: "",
    updatedAt: "",
    __v: 0,
  },
};

export const singleCustomerSlice = createSlice({
  name: "singleCustomer",
  initialState,
  reducers: {
    setSingleCustomersDetail: (state, action: PayloadAction<ICustomer>) => {
      console.log(action.payload);
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSingleCustomersDetail } = singleCustomerSlice.actions;

export default singleCustomerSlice.reducer;
