import { IContractorsDetails } from "@/lib/types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IState {
  value: IContractorsDetails;
}

const initialState: IState = {
  value: {
    availability: "",
    contractorProfile: {
      _id: "",
      email: "",
      firstName: "",
      dateOfBirth: "",
      lastName: "",
      createdAt: "",
      updatedAt: "",
      __v: 0,
      location: "",
      profileImage: "",
      documentVerification: false,
      status: "",
    },
    document: {
      skill: "",
      phoneNumber: "",
      businessName: "",
      tradeTicket: "",
      postalCode: "",
      city: "",
      website: "",
      yearExpirence: "",
    },
    jobHistory: [],
  },
};

export const singleContractorSlice = createSlice({
  name: "singleContractor",
  initialState,
  reducers: {
    setsingleContractorsDetail: (
      state,
      action: PayloadAction<IContractorsDetails>
    ) => {
      console.log(action.payload);
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setsingleContractorsDetail } = singleContractorSlice.actions;

export default singleContractorSlice.reducer;
