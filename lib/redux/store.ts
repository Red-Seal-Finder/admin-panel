import { configureStore } from "@reduxjs/toolkit";
import singleCustomer from "./slices/single-customer";

export const store = configureStore({
  reducer: {
    singleCustomerDetail: singleCustomer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
