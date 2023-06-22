import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Grid } from '@mui/material';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import CardContent from '@mui/material/CardContent';
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";


const drawerWidth = 240;
const navItems = [''];

export default function Loginpg(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [assets, setassets] = React.useState([])
    const [thematic, setthematic] = React.useState([])
    const [statedata, setstatedata] = React.useState([])
    const [ofcindc, setofcindc] = React.useState([])
    const [activestate, setactivestate] = React.useState('')
    const [token, settoken] = React.useState([])
    const [open, setopen] = React.useState(true)
    const [links, setlinks] = React.useState([])
    const [dense, setDense] = React.useState(false);

    const navigate = useNavigate();

    React.useEffect(() => {
        const username = 'super_admin',
            password = '9mfH84HgBc0RYVeCZ1Sb'
        axios({
            method: "get",
            url: "https://kf.rbmgateway.org/token/?format=json",
            headers: {
                "Content-Type": "application/json",
                "Authorization": 'Basic ' + btoa(username + ':' + password)
            }
        })
            .then((response) => {
                settoken(response.data.token)

                let config = {
                    method: 'get',
                    maxBodyLength: Infinity,
                    url: 'https://kf.rbmgateway.org/api/v2/assets.json',
                    headers: {
                        'Authorization': 'Token ' + response.data.token
                    }
                };

                axios.request(config)
                    .then((response) => {
                        let thematicdata = []
                        let statedata = []
                        let ofcindc = []
                        setassets(response.data.results)
                        response.data.results.forEach(element => {
                            var surname = element.name
                            if (surname.includes("SIS") && surname.split("-").length == 3) {
                                thematicdata.push(surname.split("-")[1])
                                statedata.push(surname.split("-")[2])
                            } else if (surname.includes("Office Indicators")) {
                                ofcindc.push(surname.split("-")[1].trim())
                            }
                            console.log("names", element.name, surname.includes("SIS"), thematicdata, statedata, ofcindc)
                        });
                        setthematic(thematicdata.filter((value, index, array) => array.indexOf(value) === index))
                        setstatedata(statedata.filter((value, index, array) => array.indexOf(value) === index))
                        setofcindc(ofcindc.filter((value, index, array) => array.indexOf(value) === index))
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            })
            .catch((error) => {
                console.log("getRequest err>>", error);
            });
    }, [token])

    const handleChange = (event) => {
        setactivestate(event.target.value)
        let filterassets = assets.filter(a => a.name.includes(event.target.value))
        let linkarr = []
        filterassets.forEach(f => {
            let config2 = {
                method: 'get',
                maxBodyLength: Infinity,
                url: f.url,
                headers: {
                    'Authorization': 'Token ' + token
                }
            };

            axios.request(config2)
                .then((response) => {
                    let linkobj = {
                        name: response.data.name.split("-")[1],
                        formlink: response.data.deployment__links.offline_url
                    }
                    linkarr.push(linkobj)
                })
                .catch((error) => {
                    console.log(error);
                });
        })
        console.log("links", linkarr)
        setTimeout(() => {
            setlinks(linkarr)
        }, 1500);
        setopen(false)
    };

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const handleClose = () => {
        setopen(true);
    };

    const OpenSignoff = () => {
        navigate("/Signoff")
    }

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'left' }}>
            <Typography variant="h6" sx={{ my: 2, textAlign: 'left' }}>
                M & E - RBM Gateway
            </Typography>
            <Divider />
            <List>
                {navItems.map((item) => (
                    <ListItem key={item} disablePadding>
                        <ListItemButton sx={{ textAlign: 'center' }}>
                            <ListItemText primary={item} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar component="nav">
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, textAlign: 'left', display: { xs: 'none', sm: 'block' } }}
                    >
                        M & E - RBM Gateway
                    </Typography>
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        {navItems.map((item) => (
                            <Button key={item} sx={{ color: '#fff' }} onClick={OpenSignoff}>
                                {item}
                            </Button>
                        ))}
                        <Button variant="outlined" className='viewbtn mt-0 dbbutton'><a href={"http://20.198.83.145:8088/login/"} target="_blank">View Dashboard</a></Button>
                    </Box>
                </Toolbar>
            </AppBar>
            <Box component="nav">
                <Drawer
                    container={container}
                    variant="temporary"
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
            <Box component="main" className='MainContainer' sx={{ p: 0, width: '100%' }}>
                <Toolbar />
                <Grid container spacing={2} className='loginpagemaindiv'>
                    <Grid item xs={3} className='Logocontainer'>
                        <div className='Logodiv'></div>
                    </Grid>
                    <Grid item xs={9}>
                        <Card sx={{ maxWidth:"50%", margin:"0 auto", marginTop:"0px" }}>
                        <p className='formtitle '>Login</p>
                            <CardContent>
                           
                            <p className='formsubtitle text-left'>Fill your details to log in</p>
                    <p className='loginfielddiv'> 
                            <TextField id="outlined-basic" label="Username" variant="outlined" />
                    </p>
                    <p className='loginfielddiv'>
                            <TextField id="outlined-basic" label="Password" variant="outlined" />
                            </p>
                            <p>
                            <Button variant="outlined" className='viewbtn mt-10px'>View Form</Button>
                            </p>
                            </CardContent>
                           
                        </Card>
                    </Grid>
                </Grid>
            </Box>

        </Box>
    );
}