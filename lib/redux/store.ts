import { configureStore } from "@reduxjs/toolkit";
import singleCustomer from "./slices/single-customer";
import auth from "./slices/auth";
import singleContractor from "./slices/single-contractor";
import totalSlice from "./slices/overview-data";

export const store = configureStore({
  reducer: {
    auth: auth,
    singleCustomerDetail: singleCustomer,
    singleContractorDetail: singleContractor,
    overviewTotal: totalSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
