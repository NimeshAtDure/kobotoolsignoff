import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import { Grid } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Dialog from '@mui/material/Dialog';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { settoken,setdata } from './Reducers/appReducer';

const drawerWidth = 240;

export default function Appnavbar(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [user, setuser] = React.useState(null)
    const [btnvisible,setbtnvisible] = React.useState(false)
    const [menuopen, setmenuopen] = React.useState(false)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [formlink,setformlink] = React.useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate();

    React.useEffect(()=>{
        setTimeout(() => {
            if(sessionStorage.getItem("user")){
                var details = JSON.parse(sessionStorage.getItem("user"))
                setuser(details)
                setbtnvisible(details?.username.toLowerCase().includes("admin") || details?.username.toLowerCase().includes("kaushik"))
            }
        }, 2000);
    },[])


    const openMenu = (event) => {
        setAnchorEl(event.currentTarget);
        setmenuopen(true)
    }

    const closeMenu = () => {
        setmenuopen(false)
        setAnchorEl(null);
    }

    const Logout = () => {
        sessionStorage.setItem('token', "")
        sessionStorage.setItem('user', "")
        dispatch(settoken(""))
        navigate("/login")
    }

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const handleClose = () => {
        setformlink("");
    };

    const navItems = (
        <List>
            {props.navItems.home && <Button variant="outlined" className='viewbtn mt-0 dbbutton' onClick={() => navigate("/")}><span>Home</span></Button>}
            {props.navItems.supchck && <Button variant="outlined" className='viewbtn mt-0 dbbutton' onClick={()=>setformlink("https://ee.rbmgateway.org/x/QCgXLb2v")}><span>Supervision Checklist</span></Button>}
            {props.navItems.dashb && <Button variant="outlined" className='viewbtn mt-0 dbbutton' ><a href={"http://dashboard.rbmgateway.org:8088/superset/dashboard/11/?native_filters_key=Sn0k7O0XzuJ6IEkSzzbdggNIEah2YccuBHtPw6uleOWIyfojOlxyqsOxoOW2RLiF"} target="_blank"><span>Dashboard</span></a></Button>}
        </List>
    );

    const ProfileDiv = (
        <>
        {user && <><Button
            id="basic-button"
            className='profilebtn'
            aria-controls={menuopen ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={menuopen ? 'true' : undefined}
            onClick={openMenu}
        >
            {user?.username[0]}
        </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={menuopen}
                onClose={closeMenu}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
                className='profmenu'
            >
                <Grid container className='profilecontainer'>
                    <Grid item xs={3}>
                        <div className='proficondiv'>
                            <p className='proficon'>
                                <span>{user?.username[0]}</span>
                            </p>
                        </div>
                    </Grid>
                    <Grid item xs={9}>
                        <p className='profusrname'>
                            {user?.username}
                        </p>
                        <p className='profusremail'>
                            {user?.email}
                        </p>
                    </Grid>
                </Grid>

                {btnvisible && <MenuItem className='profmenubtn' ><a href={"https://kf.rbmgateway.org/#/forms"} target="_blank">Admin Panel</a></MenuItem>}
                {btnvisible && <MenuItem className='profmenubtn' onClick={() => navigate("/signoff")}>Sign Off</MenuItem>}
                <MenuItem className='profmenubtn' onClick={Logout}>Logout</MenuItem>
            </Menu>
        </>
        }
        </>
    )

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'left' }}>
            <Typography variant="h6" sx={{ my: 2, textAlign: 'left' }}>
                <div className='Logodiv'></div>
            </Typography>
            <Divider />
            <div >     
            {navItems}
            {ProfileDiv}
            </div>  
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <>
            <CssBaseline />
            <div>hi</div>
            <AppBar component="nav">
                 <div className='logobar'>
                     <div className='Logodiv'></div>
                     <div>
                        <p className='logo-name'>India</p></div> 
                 </div>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, textAlign: 'left', display: { xs: 'none', sm: 'block' } }}
                    >
                       <p>10<sup>th</sup> Country Programme</p>
                                           </Typography>
                    <Box className='navbardiv' sx={{ display: { xs: 'none', sm: 'block' } }}>
                        {navItems}
                        {ProfileDiv}
                    </Box>
                </Toolbar>
            </AppBar>
            <Box component="nav">
                <Drawer
                    container={container}
                    variant="temporary"
                    className='leftdrawer'
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
            </Box>
            <Dialog
                fullScreen
                open={formlink.length>0}
                onClose={handleClose}
                className="Formviewdialog"
                disableEscapeKeyDown
            >
                <iframe src={formlink} width="100%" height="100%" />
            </Dialog>
        </>
    );

}