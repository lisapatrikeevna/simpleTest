import { createApi ,fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {API_URL} from "../config";


export const baseApi = createApi({
  reducerPath: 'baseApi',
  tagTypes: [ 'User'],
  baseQuery: fetchBaseQuery({ baseUrl:API_URL}),
  endpoints: () => ({}),
})



