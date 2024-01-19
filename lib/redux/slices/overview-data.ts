import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IState {
  totalCustomers: string;
  totalContractors: string;
  totalRevenue: string;
  totalJobs: string;
}

const initialState: IState = {
  totalCustomers: "",
  totalContractors: "",
  totalRevenue: "",
  totalJobs: "",
};

export const totalSlice = createSlice({
  name: "total",
  initialState,
  reducers: {
    setTotalCustomers: (state, action: PayloadAction<string>) => {
      state.totalCustomers = action.payload;
    },
    setTotalContractors: (state, action: PayloadAction<string>) => {
      state.totalContractors = action.payload;
    },
    setTotalRevenue: (state, action: PayloadAction<string>) => {
      state.totalRevenue = action.payload;
    },
    setTotalJobs: (state, action: PayloadAction<string>) => {
      state.totalJobs = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setTotalContractors,
  setTotalCustomers,
  setTotalJobs,
  setTotalRevenue,
} = totalSlice.actions;

export default totalSlice.reducer;
