import { IJobs } from "@/lib/types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IState {
  value: IJobs;
}

const initialState: IState = {
  value: {
    job: {
      inspection: {
        status: false,
        confirmPayment: false,
      },
      _id: "",
      address: "",
      status: "",
      description: "",
      createdAt: "",
    },
    contractor: {
      _id: "",
      firstName: "",
      lastName: "",
      profileImage: "",
    },
    customer: {
      fullName: "",
      phoneNumber: "",
    },
  },
};

export const singleJobDetailsSlice = createSlice({
  name: "singleJob",
  initialState,
  reducers: {
    setsingleJobDetail: (state, action: PayloadAction<IJobs>) => {
      console.log(action.payload);
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setsingleJobDetail } = singleJobDetailsSlice.actions;

export default singleJobDetailsSlice.reducer;
