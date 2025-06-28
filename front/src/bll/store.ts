import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { baseApi} from "./base-api";
import { appReducer } from "./app.slice";
import {cardsReducer} from "./cards/cards.slice";


export const store = configureStore({
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(baseApi.middleware,),
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer ,
    app: appReducer,
    cards:cardsReducer,
  },
})

setupListeners(store.dispatch)
export type AppDispatchType = typeof store.dispatch
export type RootStateType = ReturnType<typeof store.getState>


