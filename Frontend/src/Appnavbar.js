import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import axios from "axios";
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
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { settoken, setdata } from './Reducers/appReducer';

const drawerWidth = 240;

export default function Appnavbar(props) {

    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [user, setuser] = React.useState(null)
    const [btnvisible, setbtnvisible] = React.useState(false)
    const [menuopen, setmenuopen] = React.useState(false)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorEl1, setAnchorEl1] = React.useState(null);
    const [formlink, setformlink] = React.useState('')
    const [sgnoffmenuopn,setsgnoffmenuopn] = React.useState(false)
    const [statesignoff, setstatesignoff] = React.useState(false)
    const [respsignoff, setrespsignoff] = React.useState(false)
    const [SVC,setSVC] = React.useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate();
    let token = useSelector((state) => state.user.token)

    React.useEffect(() => {
        setTimeout(() => {
            if (localStorage.getItem("user")) {
                var details = JSON.parse(localStorage.getItem("user"))
                setuser(details)
                var checkadm = details?.username.toLowerCase().includes("admin") || details?.username.toLowerCase().includes("kaushik")
                if (checkadm) {
                    setbtnvisible(checkadm)
                    setrespsignoff(checkadm)
                    setstatesignoff(checkadm)
                } else {
                    getAccess(details)
                }
                let config = {
                    method: 'get',
                    maxBodyLength: Infinity,
                    url: 'https://kf.rbmgateway.org/api/v2/assets.json',
                    headers: {
                        'Authorization': 'Token ' + token
                    }
                };
        
                axios.request(config)
                    .then((response) => {
                        // console.log(response.data.results)
                        var filterSVC = response.data.results.filter((r) => {
                            return r.name == "Supervision Checklist for Health Facility"
                        })

                        setSVC(filterSVC.length>0?true:false)
                        let config2 = {
                            method: 'get',
                            maxBodyLength: Infinity,
                            url: filterSVC[0].url,
                            headers: {
                                'Authorization': 'Token ' + token
                            }
                        };
    
                        axios.request(config2)
                            .then((response) => {
                                var link = response.data.deployment__links.offline_url.split("/")
                                // console.log(response.data.deployment__links.offline_url)
                                setformlink(link[link.length-1])
                                
                            })
                            .catch((error) => {
                                console.log(error);
                            });
                    })
            }

        }, 1500);
    }, [])



    function getAccess(details) {
        axios({
            method: 'post',
            url: 'https://service.rbmgateway.org/getdata',
            data: {
                "username": details?.username,
                "usertype": "all"
            }
        })
            .then(
                response => {
                    setstatesignoff(response.data.data.filter((r) => {
                        return r.statehead == details.username
                    }).length > 0 ? true : false)
                    setrespsignoff(response.data.data.filter((r) => {
                        return r.responsible_person == details.username
                    }).length > 0 ? true : false)
                    // console.log("resp", response.data.data.filter((r) => {
                    //     return r.responsible_person == details.username
                    // }));
                }
            ).catch((err) => { console.log(err) });
    }

    const openMenu = (event) => {
        setAnchorEl(event.currentTarget);
        setmenuopen(true)
    }

    const closeMenu = () => {
        setmenuopen(false)
        setAnchorEl(null);
    }

    const openSgnoffmenu = (event) =>{
        setsgnoffmenuopn(true)
        setAnchorEl1(event.currentTarget);
    }

    const closeSgnoffmenu = () =>{
        setsgnoffmenuopn(false)
    }

    const Logout = () => {
        localStorage.setItem('token', "")
        localStorage.setItem('user', "")
        dispatch(settoken(""))
        document.cookie.split(";").forEach((c) => {
            document.cookie = c
                .replace(/^ +/, "")
                .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
        });
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
            {props.navItems.dashboard && <Button variant="outlined" className={window.location.pathname == "/dashboard" ? 'viewbtn mt-0 dbbutton active' : 'viewbtn mt-0 dbbutton'} onClick={() => navigate("/dashboard")}><span>Dashboard</span></Button>}
            {/* {props.navItems.dashboard && <Button variant="outlined" className={window.location.pathname == "/dashboard"?'viewbtn mt-0 dbbutton active': 'viewbtn mt-0 dbbutton'} onClick={()=>window.open("http://dashboard.rbmgateway.org:8088/superset/dashboard/11/?native_filters_key=Sn0k7O0XzuJ6IEkSzzbdggNIEah2YccuBHtPw6uleOWIyfojOlxyqsOxoOW2RLiF","_blank")}><span>Dashboard</span></Button>} */}
            {props.navItems.forms && <Button variant="outlined" className={window.location.pathname == "/forms" ? 'viewbtn mt-0 dbbutton active' : 'viewbtn mt-0 dbbutton'} onClick={() => navigate("/forms")}><span>SIS Reporting</span></Button>}
            {props.navItems.progoverview && <Button variant="outlined" className={window.location.pathname == "/progressoverview" ? 'viewbtn mt-0 dbbutton active' : 'viewbtn mt-0 dbbutton'}><Link to="/progressoverview" state={"admin"} ><span>Progress Report</span></Link></Button>}
            {SVC && formlink.length>0 && <Button variant="outlined" className='viewbtn mt-0 dbbutton'><Link to={"/formsview/"+formlink} target='_blank'><span>Supervision Checklist</span></Link></Button>}
            {statesignoff && <Button variant="outlined" className={window.location.pathname.includes("sign") ? 'viewbtn mt-0 dbbutton active' : 'viewbtn mt-0 dbbutton'} onClick={openSgnoffmenu}><span>Sign off</span></Button>}
            <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                className='signoffmenu'
                open={sgnoffmenuopn}
                anchorEl={anchorEl1}
                onClose={closeSgnoffmenu}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <MenuItem>{statesignoff && <Button variant="outlined" className={window.location.pathname == "/statesignoff" ? 'viewbtn mt-0 dbbutton active' : 'viewbtn mt-0 dbbutton'} ><Link to="/statesignoff" state={"statehead"}><span>Statehead signoff</span></Link></Button>}</MenuItem>
                <MenuItem>{respsignoff && <Button variant="outlined" className={window.location.pathname == "/respsignoff" ? 'viewbtn mt-0 dbbutton active' : 'viewbtn mt-0 dbbutton'} ><Link to="/respsignoff" state={"respperson"}><span>Responsible person signoff</span></Link></Button>}</MenuItem>
                <MenuItem></MenuItem>
            </Menu>
            
            
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

                    {btnvisible && <MenuItem className='profmenubtn' onClick={() => window.open("https://kf.rbmgateway.org/#/forms", "_blank")}>Admin Panel</MenuItem>}
                    {/* {btnvisible && <MenuItem className='profmenubtn' onClick={()=>window.open("https://forms.rbmgateway.org/","_blank")}>Admin Panel</MenuItem>} */}
                    {/* <MenuItem className='profmenubtn' onClick={() => navigate("/signoff")}>Data Sign Off</MenuItem> */}
                    {/* <MenuItem className='profmenubtn' onClick={() => navigate("/passreset")}>Reset password</MenuItem> */}
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


    return (
        <>
            <CssBaseline />

            <AppBar component="nav" >
                <div className='logobar'>
                    <div className='Logodiv' onClick={() => navigate("/")}><a></a></div>
                    <div>
                        <p className='logo-name'>India</p></div>
                </div>
                <Toolbar className='secondarynavbar'>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Box className='navbardiv' sx={{ display: { xs: 'none', sm: 'block' } }}>
                        {navItems}
                    </Box>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, textAlign: 'right', marginRight: '20px', display: { xs: 'none', sm: 'block' } }}
                    >
                        <p>10<sup>th</sup> Country Programme</p>
                    </Typography>
                    <Box className='navbardiv' sx={{ display: { xs: 'none', sm: 'block' } }}>
                        {ProfileDiv}
                    </Box>
                </Toolbar>
            </AppBar>
            <Box component="nav">
                <Drawer
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
            {/* <Dialog
                fullScreen
                open={formlink.length > 0}
                onClose={handleClose}
                className="Formviewdialog"
                disableEscapeKeyDown
            >
                <iframe src={formlink} width="100%" height="100%" />
            </Dialog> */}
        </>
    );

}