import cl from './pageLogin.module.scss'
import {useLocation, NavLink} from 'react-router-dom'
import {Box, Button, Paper, TextField, Typography} from '@mui/material'
import {useDispatch, useSelector} from 'react-redux'
import {appAC} from '../../../bll/app.slice'
import {RootStateType} from '../../../bll/store'
import {UserType} from '../../../bll/auth/auth.type'
import  {type ChangeEvent, useState} from 'react'
import {useLoginMutation} from '../../../bll/auth/auth.servies'
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft'

const PageLogin = () => {
    const dispatch = useDispatch()
    const location = useLocation()
    const from = location.state?.from?.pathname || '/'
    const user = useSelector<RootStateType, UserType | null>((state) => state.app.user)
    const [username, setUsername] = useState('')
    const [error, setError] = useState('')
    const [signIn, {isLoading}] = useLoginMutation()

    const validateUsername = (name: string) => {
        const trimmed = name.trim()
        if (trimmed.length < 2) return 'Minimum 2 characters'
        if (!/^[A-Za-z]+$/.test(trimmed)) return 'Only letters'
        return ''
    }

    const handleSubmit = async () => {
        const validationError = validateUsername(username)
        if (validationError) return setError(validationError)

        signIn(username).unwrap().then(res=> {
            dispatch(appAC.setUser({id:res.id,username:username}))
        } )
        .catch(err=> console.log(err))
    }

    const handleLogout = () => {
        dispatch(appAC.setLogout())
        setUsername('')
    }
    const changeUsername = (e: ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value)
        setError('')
    }

    return (<Box className={cl.root}>
        <Typography className={cl.pageTitle}>Auth page</Typography>
        <Paper className={cl.card}>
            {user ?
                    <Button onClick={handleLogout} variant="contained" color="secondary">
                    Log Out
                    </Button> :
                <>
                    <TextField label="Username" value={username} error={!!error} helperText={error} onChange={changeUsername}/>
                    <Button onClick={handleSubmit} variant="contained" disabled={isLoading} sx={{mt: 2}}>
                        {isLoading ? 'Loading...' : 'Sign In'}
                    </Button>
                </>
            }
        </Paper>
        <NavLink to={from} className={cl.link}><ArrowCircleLeftIcon/>{from=='/'? 'cards page': from}</NavLink>

    </Box>)
}

export default PageLogin