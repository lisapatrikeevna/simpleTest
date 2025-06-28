import {useEffect} from 'react'
import {Outlet} from "react-router-dom";
import Header from "./components/header/Header";
import ErrorBoundary from "./ErrorBoundary";
import {useGetCardsListQuery} from "./bll/cards/cards.service";
import {useDispatch} from "react-redux";
import {appAC} from "./bll/app.slice";
import {cardsAC} from "./bll/cards/cards.slice";

function App() {
    const dispatch = useDispatch()
    const {data: cards, isError, isLoading} = useGetCardsListQuery()

    useEffect(() => {
        isLoading? dispatch(appAC.changeStatusIsLoading(true)):dispatch(appAC.changeStatusIsLoading(false))
        // isError? dispatch(appAC.changeStatusError())
        cards && dispatch(cardsAC.setCards(cards))
    }, [isError,isLoading]);



    return (<ErrorBoundary>
            <Header/>
            <main>
                <Outlet/>
            </main>
        </ErrorBoundary>)
}

export default App
