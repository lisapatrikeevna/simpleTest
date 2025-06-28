import {baseApi} from '../base-api'
import type {innerCardType} from "./cards.type";


const cardsService = baseApi.injectEndpoints({
    endpoints: builder => {
        return {
            getCardsList: builder.query<any, void>({
                query: () => {
                    return {method: 'GET', url: 'posts'}
                },
            }),
            getItemCard: builder.query<innerCardType,{args:number}>({
                query: (args) => {
                    console.log(args);
                    return {method: 'GET', url: `comments/${args}`}
                },
            }),
        }
    },
})


export const {useGetCardsListQuery,useGetItemCardQuery} = cardsService

