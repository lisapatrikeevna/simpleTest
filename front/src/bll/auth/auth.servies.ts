import { baseApi } from "../base-api";


const authService=baseApi.injectEndpoints({
 endpoints: builder => ({
   login: builder.mutation<{id:number}, string>({
     query: args => {
       console.log("path",`users?username=${args}`);
       return {url: `users?username=${args}`, method: 'POST'}
     },
   }),
 }),
})

export const { useLoginMutation } = authService

