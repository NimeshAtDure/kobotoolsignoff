import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Grid } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Dialog from '@mui/material/Dialog';
import { useNavigate } from "react-router-dom";
import { Oval } from "react-loader-spinner"
import axios from "axios";
import Appnavbar from './Appnavbar';
import Footer from './Footer';


export default function Formview(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [assets, setassets] = React.useState([])
    const [thematic, setthematic] = React.useState([])
    const [statedata, setstatedata] = React.useState([])
    const [ofcindc, setofcindc] = React.useState([])
    const [activestate, setactivestate] = React.useState('')
    const [usertoken, setusertoken] = React.useState(sessionStorage.getItem("token"))
    const [open, setopen] = React.useState(false)
    const [links, setlinks] = React.useState([])
    const [oilinks, setoilinks] = React.useState([])
    const [dense, setDense] = React.useState(false);
    const [loading, setloading] = React.useState(false)
    const [formlink, setformlink] = React.useState("")
    
    const navigate = useNavigate();

    React.useEffect(() => {

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'https://kf.rbmgateway.org/api/v2/assets.json',
            headers: {
                'Authorization': 'Token ' + usertoken
            }
        };

        axios.request(config)
            .then((response) => {
                let thematicdata = []
                let statedata = []
                let ofcindc = []
                setassets(response.data.results)
                // response.data.results.forEach(element => {
                //     var surname = element.name
                //     if (surname.includes("SIS") && surname.split("-").length == 3) {
                //         thematicdata.push(surname.split("-")[1])
                //         statedata.push(surname.split("-")[2])
                //     } else if (surname.toLowerCase().includes("office indicators")) {
                //         ofcindc.push(element)
                //     }
                //     console.log("names", element.name, surname.includes("SIS"), thematicdata, statedata, ofcindc)
                // });
                // setthematic(thematicdata.filter((value, index, array) => array.indexOf(value) === index))
                // setstatedata(statedata.filter((value, index, array) => array.indexOf(value) === index))
                // setofcindc(ofcindc)
                setloading(true)
                let linkarr = []
                response.data.results.forEach(f => {
                    let config2 = {
                        method: 'get',
                        maxBodyLength: Infinity,
                        url: f.url,
                        headers: {
                            'Authorization': 'Token ' + usertoken
                        }
                    };

                    axios.request(config2)
                        .then((response) => {
                            let linkobj = {
                                name: response.data.name,
                                formlink: response.data.deployment__links.offline_url
                            }
                            linkarr.push(linkobj)
                            setlinks(linkarr)
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                })
                setTimeout(() => {
                    setloading(false)
                }, 2000);
            })
            .catch((error) => {
                console.log(error);
            });    
    }, [])

    // const handleChange = (event) => {
    //     setactivestate(event.target.value)
    //     let filterassets = assets.filter(a => a.name.includes(event.target.value))
    //     let linkarr = []
    //     let oilinkarr = []
    //     assets.forEach(f => {
    //         let config2 = {
    //             method: 'get',
    //             maxBodyLength: Infinity,
    //             url: f.url,
    //             headers: {
    //                 'Authorization': 'Token ' + token
    //             }
    //         };

    //         axios.request(config2)
    //             .then((response) => {
    //                 let linkobj = {
    //                     name: response.data.name.split("-")[1],
    //                     formlink: response.data.deployment__links.offline_url
    //                 }
    //                 setloading(true)
    //                 linkarr.push(linkobj)
    //             })
    //             .catch((error) => {
    //                 console.log(error);
    //             });
    //     })

    //     if(event.target.value == "DELHI"){

    //     ofcindc.forEach(f => {
    //         let config2 = {
    //             method: 'get',
    //             maxBodyLength: Infinity,
    //             url: f.url,
    //             headers: {
    //                 'Authorization': 'Token ' + token
    //             }
    //         };

    //         axios.request(config2)
    //             .then((response) => {
    //                 let linkobj = {
    //                     name: response.data.name.split("-")[1],
    //                     formlink: response.data.deployment__links.offline_url
    //                 }
    //                 // setloading(true)
    //                 oilinkarr.push(linkobj)
    //             })
    //             .catch((error) => {
    //                 console.log(error);
    //             });
    //     })
    //     }
    //     console.log("links", linkarr,oilinkarr)

    //     setTimeout(() => {
    //         setlinks(linkarr)
    //         setloading(false)
    //     }, 2000);

    //     setTimeout(() => {
    //         setoilinks(oilinkarr)
    //         setloading(false)
    //     }, 2000);
    //     setopen(false)
    // };

    const openForm = (link) => {
        setopen(true)
        setformlink(link)
    }

    const handleClose = () => {
        setopen(false);
    };


    return (
        <Box sx={{ display: 'flex' }}>
            <Appnavbar navItems={{"home":true,"supchck":true,"dashb":true}} />
            <Box component="main" className='MainContainer' sx={{ p: 0, width: '100%' }}>
                <Toolbar />
                <Grid container spacing={2}>

                    <Grid item xs={12} className='formviewmaindiv'>
                        {/* <p className='Statedrop'>
                            <FormControl >
                                <InputLabel id="demo-simple-select-label">State</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={activestate}
                                    label="Age"
                                    onChange={handleChange}
                                >
                                    {
                                        statedata?.map(s => {
                                            return <MenuItem value={s}>{s}</MenuItem>
                                        })
                                    }
                                </Select>
                            </FormControl>
                        </p> */}
                        <div className='Themetabs'>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>

                                {loading ? <Oval
                                    height={80}
                                    width={80}
                                    color="#ed8b00"
                                    wrapperStyle={{}}
                                    wrapperClass="loader"
                                    visible={true}
                                    ariaLabel='oval-loading'
                                    secondaryColor="#fff"
                                    strokeWidth={2}
                                    strokeWidthSecondary={2}
                                /> :
                                    <List dense={dense}>
                                        {
                                            links?.map(l => {
                                                return <>
                                                    {l.name && l.formlink && <Grid container spacing={0} className='formdiv'>
                                                        <Grid item xs={9}>
                                                            <p className='text-left'>
                                                                {l.name}
                                                            </p>
                                                        </Grid>
                                                        <Grid item xs={3} className='vert-center'>
                                                            <Button variant="outlined" className='viewbtn mt-0' onClick={() => openForm(l.formlink)}>Open</Button>
                                                        </Grid>

                                                    </Grid>}
                                                </>
                                            })
                                        }
                                        {
                                            oilinks.length > 0 && <>
                                                <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                                                    Office Indicators
                                                </Typography>
                                                {oilinks?.map(l => {
                                                    return <>
                                                        {l.name && l.formlink && <Grid container spacing={0} className='formdiv'>
                                                            <Grid item xs={9}>
                                                                <p className='text-left'>
                                                                    {l.name}
                                                                </p>
                                                            </Grid>
                                                            <Grid item xs={3} className='vert-center'>
                                                                {/* <Button variant="outlined" className='viewbtn mt-0'><a href={l.formlink} target="_blank">View Form</a></Button> */}
                                                                <Button variant="outlined" className='viewbtn mt-0' onClick={() => openForm(l.formlink)}>Open</Button>
                                                            </Grid>

                                                        </Grid>}
                                                    </>
                                                })
                                                }
                                            </>
                                        }

                                    </List>}
                            </Box>
                        </div>
                    </Grid>
                </Grid>
                <Footer />
            </Box>
            {/* <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                className="defaultdialog"
                disableEscapeKeyDown
            >
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            Welcome to M & E - RBM Gateway
                        </Typography>
                    </Toolbar>
                </AppBar>
                <p className='dialogtitle'>
                    Please select a state
                </p>
                <p className='DialogDdrop'>
                    <FormControl >
                        <InputLabel id="demo-simple-select-label">State</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={activestate}
                            label="Age"
                            onChange={handleChange}
                        >
                            {
                                statedata?.map(s => {
                                    return <MenuItem value={s}>{s}</MenuItem>
                                })
                            }
                        </Select>
                    </FormControl>
                </p>
            </Dialog> */}

            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                className="Formviewdialog"
                disableEscapeKeyDown
            >
                <iframe src={formlink} width="100%" height="100%" />
            </Dialog>
        </Box>
    );
}