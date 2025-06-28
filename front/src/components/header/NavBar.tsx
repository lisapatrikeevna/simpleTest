import cl from "./Header.module.scss";
import List from "@mui/material/List";
import { Box, Divider, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { NavLink } from "react-router-dom";
import { PATH } from "../../router";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import TableChartIcon from '@mui/icons-material/TableChart';
import { UserType } from "../../bll/auth/auth.type";
import { useTranslation } from "react-i18next";
import ErrorIcon from '@mui/icons-material/Error';


type propsType = {
    user: UserType | null
    setOpen: (open: boolean) => void
    toggleDrawer: (newOpen: boolean) => void
}


const NavBar = ({ user, ...props }: propsType) => {
    const { t } = useTranslation();
    const optionList = [
        { id: 1, path: PATH.profile, text: 'edit profile', icon: <EditIcon color={'primary'} /> },
        { id: 2, path: PATH.createEmployee, text: 'create employee', icon: <AddCircleIcon color={'primary'} /> },
        { id: 3, path: PATH.createCurriculum, text: 'curriculum', icon: <AddCircleIcon color={'primary'} /> },
        { id: 4, path: PATH.employeeTable, text: 'lehrer table', icon: <TableChartIcon color={'primary'} /> },
        { id: 5, path: PATH.errorLog, text: 'error log', icon: <ErrorIcon color={'primary'} /> },
    ]


    return <>
        <Box component="div" sx={{ width: 500 }} role="presentation" onClick={() => props.toggleDrawer(false)}
            className={cl.drawer}>
            <List>
                {user?.is_admin && optionList.map((i) => (<ListItem key={i.id} disablePadding>
                    <ListItemButton>
                        <NavLink to={i.path} className={cl.itemLi}>
                            <ListItemIcon>{i.icon}</ListItemIcon>
                            <ListItemText primary={i.text} />
                        </NavLink>
                    </ListItemButton>
                </ListItem>))}
            </List>
            {user && <Divider />}
            <List className={cl.mainList}>
                <ListItem disablePadding>
                    <ListItemButton>
                        {!user ? <NavLink to={PATH.login} className={cl.itemLi}>
                            <ListItemIcon>
                                <LoginIcon color={'success'} />
                            </ListItemIcon>
                            <ListItemText primary={t('login')} />
                        </NavLink> : <NavLink to={PATH.loginOut} className={cl.itemLi}>
                            <ListItemIcon>
                                <LogoutIcon color={'error'} />
                            </ListItemIcon>
                            <ListItemText primary={t('logOut')} />
                        </NavLink>}
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    </>
};

export default NavBar;
