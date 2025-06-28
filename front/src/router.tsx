import {createBrowserRouter, Outlet, RouteObject, RouterProvider} from 'react-router-dom'
import App from './App'
import {useDispatch, useSelector} from 'react-redux'
import {RootStateType} from '@/bll/store'
import ErrorPage from "./pages/errorPage/ErrorPage"
import CardsPage from "./pages/cards/CardsPage"
import PageLogin from "./pages/auth/login/pageLogin"
import PageItemCard from "./pages/cards/PageItemCard"
import type {UserType} from "./bll/auth/auth.type.ts";

export const PATH = {
    cards: '/', login: '/login', innerCard:'/card' , errorLog: '/errorLog',
}

const publicRoutes: RouteObject[] = [
    {element: <CardsPage/>, path: PATH.cards},
    {element: <PageItemCard/>, path: PATH.innerCard},
    {element: <PageLogin/>, path: PATH.login},
]

const privateRoutes: RouteObject[] = [
    // {element: <LogoutPage/>, path: PATH.loginOut},
]

const router = createBrowserRouter([{
    element: <App/>,
    errorElement: <ErrorPage/>,
    children: [...publicRoutes,
        {
            element: <PrivateRoutes/>,
            children: privateRoutes,
        }, {
            path: '*',
            element: <ErrorPage/>, // 404
        },],
},])

export const Router = () => {
    return <RouterProvider router={router}/>
}


function PrivateRoutes() {
  const dispatch = useDispatch();
  const user = useSelector<RootStateType, UserType | null>((state) => state.app.user);

  // Используем skip для условного вызова useMeQuery
  // const {data, isError, isLoading} = useMeQuery(undefined, {skip: !!user});
  // console.log("useMeQuery/user", data);

  if( user ) {
    return <Outlet/>;
  }

  // if( isLoading ) {
  //   return <div>Loading...</div>;
  // }
  // if( isError || !data ) {
  //   return <Navigate to={PATH.login}/>;
  // }
  //
  // if(data && data.user ) {
  //   dispatch(appAC.setUser(data.user));
  // }

  return <Outlet/>;
}

