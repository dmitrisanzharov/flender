import { configureStore } from "@reduxjs/toolkit";
import generalStoreSlice from "./generalStore";
import { apiSlice } from "./api/flenderProjectsApi";

const storeConfig = configureStore({
	reducer: {
		generalStore: generalStoreSlice,
		[apiSlice.reducerPath]: apiSlice.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({}).concat([apiSlice.middleware]),
});

export default storeConfig;
