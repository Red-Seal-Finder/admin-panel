import { ITransactionsDetail } from "@/lib/types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IState {
  value: ITransactionsDetail;
}

const initialState: IState = {
  value: {
    transaction: {
      _id: "",
      type: "",
      amount: 0,
      initiator: "",
      from: "",
      to: "",
      fromId: "",
      invoiceId: "",
      toId: "",
      description: "",
      status: "",
      createdAt: "",
    },
    to: "",
    from: {
      _id: "",
      email: "",
      fullName: "",
      phoneNumber: "",
      createdAt: "",
      location: "",
      profileImg: "",
    },
    job: {
      address: "",
      contractorId: "",
      customerId: "",
      totalAmountContractorWithdraw: "",
      totalAmountCustomerToPaid: "",
      inspection: {
        status: false,
        confirmPayment: false,
      },
      status: "",
    },
  },
};

export const singleTranactionSlice = createSlice({
  name: "singleTranaction",
  initialState,
  reducers: {
    setSingleTranactionsDetail: (
      state,
      action: PayloadAction<ITransactionsDetail>
    ) => {
      console.log(action.payload);
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSingleTranactionsDetail } = singleTranactionSlice.actions;

export default singleTranactionSlice.reducer;
