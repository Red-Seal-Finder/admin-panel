import { ICustomerData } from "@/lib/types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IState {
  value: ICustomerData;
}

const initialState: IState = {
  value: {
    customer: {
      _id: "",
      email: "",
      fullName: "",
      phoneNumber: "",
      createdAt: "",
      updatedAt: "",
      __v: 0,
    },
    jobHistory: [],
  },
};

export const singleCustomerSlice = createSlice({
  name: "singleCustomer",
  initialState,
  reducers: {
    setSingleCustomersDetail: (state, action: PayloadAction<ICustomerData>) => {
      console.log(action.payload);
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSingleCustomersDetail } = singleCustomerSlice.actions;

export default singleCustomerSlice.reducer;
