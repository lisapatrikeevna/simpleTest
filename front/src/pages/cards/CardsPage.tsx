import {Box, ImageList, Typography} from "@mui/material";
import {useSelector} from "react-redux";
import type {CardType} from "../../bll/cards/cards.type.ts";
import type {RootStateType} from "../../bll/store.ts";
import ItemCard from "./ItemCard";
import cl from './Cards.module.scss'
import MyContainer from "../../components/container/Container";


const CardsPage = () => {
    const cards = useSelector<RootStateType, Array<CardType> | null>(state => state.cards.cards)


    return (<Box className={cl.root}>
        <Typography variant="h3">cards page</Typography>

        <MyContainer className={cl.wrap}>
            {cards ? <ImageList cols={3} rowHeight={164}>
                {cards?.map(i => <ItemCard key={i.id} card={i}/>)}
            </ImageList> : <Typography>there are no cards</Typography>}
        </MyContainer>
    </Box>);
};

export default CardsPage;