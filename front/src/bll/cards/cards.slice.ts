import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import type {CardType} from "./cards.type.ts";


type initialStateType = {
    listFields: Array<string>
    cards: Array<CardType> | null
}
const initialState: initialStateType = {
    listFields: [], cards: null,
}


const slice = createSlice({
                              name: 'App', initialState, reducers: {
        setCards: (state, action: PayloadAction<Array<CardType>>) => {
            state.cards = action.payload
        },
        clearListFields: (state): void => {
            state.listFields = []
        },
    }
                          })


export const cardsAC = slice.actions
export const cardsReducer = slice.reducer
