import React from "react";
import axios from "axios";
import Appnavbar from "./Appnavbar";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import Fab from '@mui/material/Fab';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CommentIcon from '@mui/icons-material/Comment';
import EditIcon from '@mui/icons-material/Edit';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Grid } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Link, useLocation } from "react-router-dom";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CustomWidthTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))({
    [`& .${tooltipClasses.tooltip}`]: {
        maxWidth: 500,
    },
});


function Signoffstate() {
    const location = useLocation();

    const [user, setuser] = useState(JSON.parse(localStorage.getItem("user")))
    const [tabledata, settabledata] = useState([])
    const [thematic, setthematic] = useState([])
    const [states, setstates] = useState([])
    const [columns, setcolumns] = useState([])
    const [rowdata, setrowdata] = useState([])
    const [editdata, seteditdata] = useState({})
    const [open, setOpen] = useState(false)
    const [alerttxt, setalerttxt] = useState('')
    const [enablesignoffstate, setenablesignoffstate] = useState(true)
    const [quarter,setquarter] = useState('Q3')
    const [year,setyear] = useState('2023')

    useEffect(() => {
        getFormData()
    }, [user,quarter,year])

    function getFormData() {
        axios({
            method: 'post',
            // url:'http://localhost:8080/getdata',
            url: 'https://service.rbmgateway.org/getdata',
            data: {
                "username": user.username,
                "usertype": "statehead",
                "quarter":quarter,
                "year":year
            }
        })
            .then(
                response => {
                    settabledata(response.data.data)
                    let filtthemes = [];
                    let filtstates = []
                    let thematicarr = []
                    response.data.data.forEach((item) => {
                        if (filtstates.indexOf(item.state) === -1) {
                            filtstates.push(item.state);
                        }
                        if (filtthemes.indexOf(item.thematic) === -1) {
                            filtthemes.push(item.thematic);
                        }
                    });
                    setthematic(filtthemes.sort())
                    setstates(filtstates)
                    thematicarr = filtthemes.map((theme) => {
                        let newArray = response.data.data.filter(function (el) {
                            return el.thematic == theme
                        }
                        );
                        return { [theme]: newArray }
                    })
                    var data = []
                    thematicarr.sort().map((theme) => {
                        var rowobj = {}
                        rowobj["indic"] = Object.keys(theme)[0]
                        rowobj["haschild"] = true
                        data.push(rowobj)
                        var themearr = Object.values(theme)[0]
                        let filtrrf = []
                        themearr.forEach(t => {
                            if (filtrrf.indexOf(t.rrfname) === -1) {
                                filtrrf.push(t.rrfname)
                            }
                        })
                        filtrrf?.forEach(f => {
                            var rowobj2 = {}
                            rowobj2["indic"] = f
                            rowobj2["haschild"] = true
                            data.push(rowobj2)

                            var indi = themearr.filter(function (th) {
                                return th.rrfname == f
                            })
                            indi.forEach(i => {
                                // console.log("data",Object.values(data))
                                if (data.findIndex((obj => obj.indic == i.questionname)) > -1) {
                                    let objIndex = data.findIndex((obj => (obj.indic == i.questionname && obj.theme==i.thematic)));
                                    data[objIndex][i.state + "id"] = i.unique_id
                                    data[objIndex][i.state + "actual"] = i.actual
                                    data[objIndex][i.state + "target"] = i.target
                                    data[objIndex][i.state + "comment"] = i.comments
                                    data[objIndex][i.state + "statesignedOff"] = i.statehead_approved
                                } else {
                                    var rowobj3 = {}
                                    rowobj3[i.state + "id"] = i.unique_id
                                    rowobj3["indic"] = i.questionname
                                    rowobj3["theme"] = i.thematic
                                    rowobj3["haschild"] = false
                                    rowobj3[i.state + "actual"] = i.actual
                                    rowobj3[i.state + "target"] = i.target
                                    rowobj3[i.state + "comment"] = i.comments
                                    rowobj3[i.state + "statesignedOff"] = i.statehead_approved
                                    data.push(rowobj3)
                                }
                                // console.log("ind", indi, i.questionname, i.actual, i.target)
                            })
                        })
                        // console.log(thematicarr, data, themearr)
                    })
                    setrowdata(data)
                    setenablesignoffstate(!response.data.data.filter(function (th) {
                        return th.statehead_approved == "Yes"
                    }).length == 0)
                    

                }
            ).catch((err) => { console.log(err) });
    }

    function openModal(id) {
        setOpen(true)
        seteditdata(tabledata.filter(function (td) {
            return td.unique_id == id
        })[0])

    }

    function editRowData() {
        const date = new Date();

        axios({
            method: 'post',
            // url:'http://localhost:8080/updatedata',
            url: 'https://service.rbmgateway.org/updatedata',
            data: {
                "username": user.username,
                "actual": editdata.actual,
                "comment": editdata.comments,
                "respcomment":editdata.responsible_person_comment,
                "type": "statehead",
                "respcomment":'',
                "id": editdata.unique_id,
            }
        })
            .then(
                response => {
                    // console.log(response)
                    setOpen(false);
                    setalerttxt("success")
                    getFormData()
                }
            ).catch((err) => {
                console.log(err)
                setalerttxt("error")
            });
    }

    function signoffDataState() {
        if (!enablesignoffstate && rowdata.length > 0) {
            axios({
                method: 'post',
                // url:'http://localhost:8080/stateSignoff',
                url: 'https://service.rbmgateway.org/stateSignoff',
                data: {
                    "username": user.username,
                    "quarter":quarter,
                    "year":year
                }
            })
                .then(
                    response => {
                        // console.log(response)
                        setalerttxt("success")
                        getFormData()
                    }
                ).catch((err) => {
                    console.log(err)
                    setalerttxt("error")
                });
        }
    }

    const handleyearchange = (event,value) =>{
        setyear(event.target.value)
      }
      
    const handlequarterchange = (event,value) =>{
        setquarter(event.target.value)
      }

    const handleClose = () => {
        setOpen(false);
        setalerttxt("")
    };

    return (
        <>
            <div className="App signoffpg progressoverviewpage signoff-section">
                <Appnavbar navItems={{ "forms": true, "supchck": true, "dashboard": true, "progoverview": true }} />
                <Paper sx={{ width: '100%', overflow: 'hidden' }} >
                    <TableContainer sx={{ maxHeight: "100vh" }} className="heatmaptableholder">
                    <Box sx={{ width: '100%' }}>
                    <Tabs
                        
                        aria-label="label tabs example"
                    >
                        <Grid container>
                                        <Grid item xs={3}></Grid>
                                        <Grid item xs={9}>
                                        <div className="signoffselect">

                                        <FormControl sx={{ m: 1, minWidth: 120 }} size="small" className='menubutton'>
                                        <InputLabel id="demo-simple-select-helper-label">Year</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-helper-label"
                                            id="demo-simple-select-helper"
                                            className='select-user'
                                            label="sign off"
                                            value={year}  
                                            defaultValue={year}
                                            onChange={handleyearchange}
                                        >

                                        <MenuItem value={"2023"} >2023</MenuItem>
                                        </Select>

                                    </FormControl>

                                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small" className='menubutton'>
                                        <InputLabel id="demo-simple-select-helper-label">Quarter</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-helper-label"
                                            id="demo-simple-select-helper"
                                            className='select-user'
                                            label="sign off"
                                            value={quarter}  
                                            defaultValue={quarter}
                                            onChange={handlequarterchange}
                                        >

                                            <MenuItem value={"Q1"} >Q1</MenuItem> 
                                            <MenuItem value={"Q2"} >Q2</MenuItem>    
                                            <MenuItem value={"Q3"} >Q3</MenuItem>
                                            <MenuItem value={"Q4"} >Q4</MenuItem>  
                                        </Select>

                                    </FormControl>
                                        </div>
                                        </Grid>
                                        </Grid>
                        
                    </Tabs>
                </Box>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>


                                <TableRow>
                                    <TableCell
                                        key="indic"
                                    >
                                        Thematic area and Indicators
                                    </TableCell>
                                    {states?.map((column, id) => (
                                        <TableCell
                                            key={column}
                                            align="center"
                                            colSpan={2}
                                        >
                                            {column}
                                        </TableCell>
                                    ))}
                                </TableRow>
                                <TableRow>
                                    <TableCell
                                        colSpan={1}
                                    >
                                        
                                    </TableCell>
                                    {states?.map((column, id) => (
                                        <>
                                            <TableCell
                                                key={column + "target"}
                                            >
                                                Target
                                            </TableCell>
                                            <TableCell
                                                key={column + "actual"}

                                            >
                                                Actual
                                            </TableCell>

                                            {/* <TableCell
                                            key={column + "comment"}
                                        >
                                            Comment
                                        </TableCell> */}
                                        </>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rowdata.length > 0 ?
                                    <>
                                        {rowdata.map((data) => {
                                            return (
                                                <TableRow>
                                                    {
                                                        data.haschild ?
                                                            <TableCell style={{
                                                                color: "#eb7e00",
                                                                fontWeight: 700
                                                            }}
                                                                colSpan={states.length * 2 + 1}>{data.indic}</TableCell> :
                                                            <>
                                                                <TableCell>{data.indic}</TableCell>
                                                                {states?.map(s => {
                                                                    return (
                                                                        <>
                                                                            <TableCell
                                                                                className="numberholder"


                                                                            >{data[s + "target"]}</TableCell>
                                                                            <TableCell
                                                                                className="numberholder"
                                                                                style={{
                                                                                    backgroundColor: (data[s + "actual"] ? (data[s + "actual"] - data[s + "target"] >= 0 || data[s + "actual"].toLowerCase()==data[s + "target"].toLowerCase())? "#92d051" : "#ffc100" : '')
                                                                                }}>
                                                                                {data[s + "actual"]}
                                                                                {  data[s + "actual"] &&
                                                                                    <div className="editSection">
                                                                                        <CustomWidthTooltip title={data[s + "comment"]}>
                                                                                            <Button sx={{ m: 1 }}><CommentIcon /></Button>
                                                                                        </CustomWidthTooltip>
                                                                                        { !data[s + "statesignedOff"]  &&<Button sx={{ m: 1 }} onClick={() => openModal(data[s + "id"])}><EditIcon /></Button>}
                                                                                    </div>
                                                                                }
                                                                            </TableCell>

                                                                            {/* <TableCell>{data[s+"comment"]}</TableCell> */}
                                                                        </>
                                                                    )
                                                                })}
                                                            </>
                                                    }
                                                </TableRow>
                                            )
                                        })}
                                        <TableRow>
                                        <TableCell colSpan={states.length * 2 + 2} align="center" style={{
                                                                height:"60px"
                                                                
                                                            }}>
                                        </TableCell>    
                                        </TableRow>
                                    </>
                                    : <TableRow>
                                        <TableCell colSpan={states.length + 1} align="center">
                                            Awaiting State Head Sign Off
                                        </TableCell>
                                    </TableRow>}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{editdata.thematic}</DialogTitle>
                <DialogContent>
                    <DialogContentText className="editdialoglabel">
                        {editdata.rrfname}
                    </DialogContentText>
                    <DialogContentText className="editdialoglabel1">
                        {editdata.questionname}
                    </DialogContentText>
                    <TextField
                        className="editdialogtxt"
                        autoFocus
                        margin="dense"
                        id="actualdata"
                        label="Actual Data"
                        type="text"
                        fullWidth
                        multiline
                        value={editdata.actual}
                        variant="standard"
                        onChange={e => seteditdata({ ...editdata, actual: e.target.value })}
                    />
                    <TextField
                        className="editdialogtxt"
                        autoFocus
                        margin="dense"
                        id="commentdata"
                        label="Comment"
                        type="text"
                        fullWidth
                        multiline
                        value={editdata.comments}
                        variant="standard"
                        onChange={e => seteditdata({ ...editdata, comments: e.target.value })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={editRowData} className="editdatabtn">Save Data</Button>
                    <Button onClick={handleClose} className="cancelbtn">Cancel</Button>
                </DialogActions>
            </Dialog>
            <Snackbar open={alerttxt.length > 0} autoHideDuration={6000} onClose={handleClose}>
                {alerttxt == "success" ? <Alert severity="success">Data saved !</Alert> : alerttxt == "error" ? <Alert severity="error">Update failed !</Alert> : ''
                }
            </Snackbar>
            {!enablesignoffstate && rowdata.length > 0 && <Fab variant="extended" size="medium" sx={{
                position: 'absolute',
                bottom: 50,
                right: 16,
                bgcolor: "#333847",
                color: "#fff",
                '&:hover': {
                    bgcolor: "#fff",
                    color: "#000"
                },
            }}
                onClick={signoffDataState}
            >
                Sign off
            </Fab> }
            
            <Footer />
        </>

    )
}

export default Signoffstate;
