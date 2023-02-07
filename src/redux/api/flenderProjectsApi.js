import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// routes
import { serverUrl, finlendersDB } from "../../utils/serverUrls";
import { projectsFromFinlendersDB } from "../../utils/routes";

export const apiSlice = createApi({
	reducerPath: "api",
	baseQuery: fetchBaseQuery({
		baseUrl: serverUrl + finlendersDB,
	}),
	endpoints: (builder) => ({
		getAll: builder.query({
			query: () => projectsFromFinlendersDB,
		}),
	}),
});

export const { useGetAllQuery } = apiSlice;
