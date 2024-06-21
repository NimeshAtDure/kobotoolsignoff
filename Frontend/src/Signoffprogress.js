import React from "react";
import axios from "axios";
import Appnavbar from "./Appnavbar";
import Footer from "./Footer";
import { useEffect, useState, useRef } from "react";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import { alpha,styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import Fab from '@mui/material/Fab';
import { Grid } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CommentIcon from '@mui/icons-material/Comment';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Link, useLocation } from "react-router-dom";
import { DownloadTableExcel } from 'react-export-table-to-excel';

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

const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        //   backgroundColor: '#f5f5f9',
        color: 'rgba(0, 0, 0, 0.87)',
        maxWidth: 500,
        minWidth: 400
        //   fontSize: theme.typography.pxToRem(12),
        //   border: '1px solid #dadde9',
    },
}));

function Signoffprogress() {
    const location = useLocation();
    const tableRef = useRef(null);

    const [user, setuser] = useState(JSON.parse(localStorage.getItem("user")))
    const [tabledata, settabledata] = useState([])
    const [thematic, setthematic] = useState([])
    const [states, setstates] = useState([])
    const [ufstates, setufstates] = useState([])
    const [columns, setcolumns] = useState([])
    const [rowdata, setrowdata] = useState([])
    const [ufrowdata, setufrowdata] = useState([])
    const [editdata, seteditdata] = useState({})
    const [editrespdata, seteditrespdata] = useState({})
    const [open, setOpen] = useState(false)
    const [open2, setOpen2] = useState(false)
    const [alerttxt, setalerttxt] = useState('')
    const [enablesignoffstate, setenablesignoffstate] = useState(true)
    const [filterstate, setfilterstate] = useState('Cumulative')
    const [enablesignoff, setenablesignoff] = useState(true)
    const [value, setValue] = React.useState('progressovsis');
    const [percarr, setpercarr] = React.useState({  })
    // { "% of AFHCs in UNFPA priority districts with trained provider to offer adolescent responsive health services": 25, "% of health facilities in UNFPA priority districts which report no stock out of contraceptives in last  3 months": 65, "Percentage of public health facilities in priority districts providing at least 5 reversible contraceptive methods": 60, "Percentage of public health facilities in priority districts providing safe delivery services": 60, "Percentage of public health facilities in priority districts doing HIV screening during ANC": 55, "Percentage of public health facilities in priority districts providing safe abortion services": 25 }
    const [quarter, setquarter] = useState("Q" + Math.floor((new Date().getMonth() + 3) / 3).toString())
    const [year, setyear] = useState(new Date().getFullYear().toString())
    const [anchorEl, setAnchorEl] = React.useState(null);
    const openfilter = Boolean(anchorEl);

    useEffect(() => {
        getFormData()
    }, [user, value, quarter, year])

    function getFormData() {
        axios({
            method: 'post',
            // url:'http://localhost:8080/getdata',
            url: 'https://service.rbmgateway.org/getdata',
            data: {
                "username": user.username,
                "usertype": value == "progressovnr" ? "progressovsis" : value,
                "quarter": quarter,
                "year": year
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
                        if (item.thematic) {
                            if (filtthemes.indexOf(item.thematic) === -1) {
                                filtthemes.push(item.thematic);
                            }
                        } else {
                            if (filtthemes.indexOf(item.form_name) === -1) {
                                filtthemes.push(item.form_name);
                            }
                        }
                    });
                    filtstates.sort()
                    if (filtstates.length > 1 && filtstates.includes("Delhi")) {
                        const state = filtstates.slice(1, 2)
                        filtstates.splice(1, 1);
                        filtstates.push(state)
                    }
                    setthematic(filtthemes.sort())
                    setstates(filtstates)
                    setufstates(filtstates)
                    thematicarr = filtthemes.map((theme) => {
                        let newArray = response.data.data.filter(function (el) {
                            if (el.thematic) {
                                return el.thematic == theme
                            } else {
                                return el.form_name == theme
                            }
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
                        filtrrf?.sort().forEach(f => {
                            var rowobj2 = {}
                            rowobj2["indic"] = f
                            rowobj2["haschild"] = true
                            data.push(rowobj2)

                            var indi = themearr.filter(function (th) {
                                return th.rrfname == f
                            })
                            indi.forEach(i => {
                                // console.log("data",Object.values(data))
                                let actval = i.actual ? i.actual : i.percent ? i.percent : i.numerator
                                if (data.findIndex((obj => obj.indic == i.questionname)) > -1) {
                                    let objIndex = data.findIndex((obj => (obj.indic == i.questionname && obj.theme == i.thematic)));
                                    data[objIndex][i.state + "id"] = i.unique_id
                                    data[objIndex][i.state + "actual"] = actval
                                    data[objIndex][i.state + "target"] = i.target
                                    data[objIndex][i.state + "comment"] = i.comments
                                    data[objIndex]["respcomment"] = i.responsible_person_comment?.length && i.responsible_person_comment?.length > 0 ? i.responsible_person_comment : data[objIndex]["respcomment"]
                                    data[objIndex]["actualtotal"] = actval ? isNumeric(actval) ? data[objIndex]["actualtotal"] + parseInt(actval) : data[objIndex]["actualtotal"] : 0
                                    data[objIndex]["targettotal"] = i.target ? isNumeric(i.target) ? data[objIndex]["targettotal"] + parseInt(i.target) : data[objIndex]["targettotal"] : 0
                                    data[objIndex][i.state + "respsignedOff"] = i.responsible_person_approved
                                } else {
                                    var rowobj3 = {}
                                    rowobj3[i.state + "id"] = i.unique_id
                                    rowobj3["indic"] = i.questionname
                                    rowobj3["theme"] = i.thematic
                                    rowobj3["haschild"] = false
                                    rowobj3[i.state + "actual"] = i.actual ? i.actual : i.percent ? i.percent : i.numerator
                                    rowobj3[i.state + "target"] = i.target
                                    rowobj3[i.state + "comment"] = i.comments
                                    rowobj3["respcomment"] = i.responsible_person_comment
                                    rowobj3["actualtotal"] = actval ? isNumeric(actval) ? parseInt(actval) : actval : 0
                                    rowobj3["targettotal"] = i.target ? isNumeric(i.target) ? parseInt(i.target) : i.target : 0
                                    rowobj3[i.state + "respsignedOff"] = i.responsible_person_approved
                                    data.push(rowobj3)
                                }
                                // console.log("ind", indi, i.questionname, i.actual, i.target)
                            })
                        })
                        // console.log(thematicarr, data, themearr)
                    })
                    var signoffstate = response.data.data.filter(function (th) {
                        return th.statehead_approved == null
                    })
                    signoffstate.length == 0 ? setrowdata(data) : setrowdata([])

                    // setenablesignoff(!response.data.data.filter(function (th) {
                    //     return th["m&ehead_approved"] == "Yes"
                    // }).length == 0)

                }
            ).catch((err) => { console.log(err) });
    }

    function openModal(id) {
        setOpen(true)
        seteditdata(tabledata.filter(function (td) {
            return td.unique_id == id
        })[0])

    }

    function openModal2(id) {
        setOpen2(true)
        seteditrespdata(tabledata.filter(function (td) {
            return td.questionname == id
        }).sort((a, b) => {
            return a._id - b._id;
        })[0])
    }

    function isNumeric(num) {
        return !isNaN(num)
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
                "type": "mnehead",
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

    function editRespData() {
        const date = new Date();

        axios({
            method: 'post',
            // url: 'http://localhost:8080/updatedata',
            url: 'https://service.rbmgateway.org/updatedata',
            data: {
                "username": user.username,
                "actual": editrespdata.actual,
                "comment": editrespdata.comments,
                "respcomment": editrespdata.responsible_person_comment,
                "type": "mnehead",
                "id": editrespdata.unique_id,
            }
        })
            .then(
                response => {
                    // console.log(response)
                    setOpen2(false);
                    setalerttxt("success")
                    getFormData()
                }
            ).catch((err) => {
                console.log(err)
                setalerttxt("error")
            });
    }

    function signoffData() {
        if (!enablesignoff) {
            axios({
                method: 'post',
                // url:'http://localhost:8080/m&esignoff',
                url: 'https://service.rbmgateway.org/m&esignoff',
                data: {
                    "username": user.username,
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

    const handleChange = (event, newValue) => {
        setValue(newValue);
        setstates(ufstates)
    };

    const handleStateChange = (event, value) => {
        setfilterstate(event.target.value)
        if (ufstates.includes(event.target.value)) {
            setstates([event.target.value])
        } else {
            setstates(ufstates)
        }
    }

    const handleyearchange = (event, value) => {
        setyear(event.target.value)
    }

    const handlequarterchange = (event, value) => {
        setquarter(event.target.value)
    }

    const handleClose = () => {
        setOpen(false);
        setOpen2(false)
        setalerttxt("")
    };

    const handleFilterClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleFilterClose = () => {
        setAnchorEl(null);
    };

    const StyledMenu = styled((props) => (
        <Menu
            elevation={0}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            {...props}
        />
    ))(({ theme }) => ({
        '& .MuiPaper-root': {
            borderRadius: 6,
            marginTop: theme.spacing(1),
            minWidth: 180,
            color:
                theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
            boxShadow:
                'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
            '& .MuiMenu-list': {
                padding: '4px 0',
            },
            '& .MuiMenuItem-root': {
                '& .MuiSvgIcon-root': {
                    fontSize: 18,
                    color: theme.palette.text.secondary,
                    marginRight: theme.spacing(1.5),
                },
                '&:active': {
                    backgroundColor: alpha(
                        theme.palette.primary.main,
                        theme.palette.action.selectedOpacity,
                    ),
                },
            },
        },
    }));

    return (
        <>
            <div className="App signoffpg progressoverviewpage signoff-section mnesignoff">
                <Appnavbar navItems={{ "forms": true, "supchck": true, "dashboard": true, "progoverview": true }} />
                <Paper sx={{ width: '100%', overflow: 'hidden' }} >
                    <TableContainer sx={{ maxHeight: "100vh" }} className="heatmaptableholder">
                        <Box sx={{ width: '100%' }}>
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                aria-label="label tabs example"
                            >
                                <Tab
                                    value="progressovsis"
                                    label="Consolidated Heat Map"
                                />
                                <Tab value="progressovnr" label="Program Cycle Output" />
                                <Tab value="progressovoi" label="Office Indicators" />
                                <Tab value="progressovcpap" label="CPAP" />
                                <Tab value="progressovrrf" label="RRF" />
                                
                                <Grid container className="options-buttondiv">
                                    <Grid item xs={6}></Grid>
                                    <Grid item xs={3}>
                                    <Button
                                    id="demo-customized-button"
                                    aria-controls={openfilter ? 'demo-customized-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={openfilter ? 'true' : undefined}
                                    variant="contained"
                                    disableElevation
                                    onClick={handleFilterClick}
                                    endIcon={<KeyboardArrowDownIcon />}
                                    className="options-button"
                                >
                                    Filters
                                </Button>
                                <StyledMenu
                                    id="demo-customized-menu"
                                    MenuListProps={{
                                        'aria-labelledby': 'demo-customized-button',
                                    }}
                                    anchorEl={anchorEl}
                                    open={openfilter}
                                    onClose={handleFilterClose}
                                > 
                                 <MenuItem  className='filtermenu' disableRipple>
                                 <div className="signoffselect">
                                 {value == "progressovsis" && <FormControl sx={{ m: 1, minWidth: 120 }} size="small" className='menubutton'>
                                        <InputLabel id="demo-simple-select-helper-label">State Filter </InputLabel>
                                        <Select
                                            labelId="demo-simple-select-helper-label"
                                            id="demo-simple-select-helper"
                                            value={filterstate}

                                            label="sign off"
                                            onChange={handleStateChange}
                                        >

                                            <MenuItem value={"Cumulative"} >Cumulative</MenuItem>
                                            {ufstates?.map((column, id) => (
                                                <MenuItem value={column} >{column}</MenuItem>
                                            ))}
                                        </Select>

                                    </FormControl>}
                                        </div>
                                    </MenuItem>
                                    
                                     <MenuItem  className='filtermenu' disableRipple>
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
                                            <MenuItem value={"2024"} >2024</MenuItem>
                                        </Select>

                                    </FormControl>
                                        </div>
                                    </MenuItem>  

                                     <MenuItem className='filtermenu' disableRipple>
                                     <div className="signoffselect">
                                     {(value === "progressovsis" || value ==="progressovoi" || value === "progressovnr") && (<FormControl sx={{ m: 1, minWidth: 120 }} size="small" className='menubutton'>
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

                                    </FormControl>)}
                                        </div>
                                    </MenuItem>    
                </StyledMenu>
                                    
                                    </Grid>
                                    <Grid item xs={3}>
                                
                                    <DownloadTableExcel
                                    filename="users table"
                                    sheet="users"
                                    currentTableRef={tableRef.current}
                                >
                                    <Button variant="outlined" className="exprtbtn" size="large">Export</Button>
                                </DownloadTableExcel>
                                    </Grid>
                                    </Grid>

                                {/* <Grid container>
                                    <Grid item xs={12}>
                                        <div className="signoffselect">
                                            {value == "progressovsis" && <FormControl sx={{ m: 1, minWidth: 120 }} size="small" className='menubutton'>
                                                <InputLabel id="demo-simple-select-helper-label">State Filter </InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-helper-label"
                                                    id="demo-simple-select-helper"
                                                    value={filterstate}

                                                    label="sign off"
                                                    onChange={handleStateChange}
                                                >

                                                    <MenuItem value={"Cumulative"} >Cumulative</MenuItem>
                                                    {ufstates?.map((column, id) => (
                                                        <MenuItem value={column} >{column}</MenuItem>
                                                    ))}
                                                </Select>

                                            </FormControl>}
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
                                                    <MenuItem value={"2024"} >2024</MenuItem>
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
                                </Grid> */}
                            </Tabs>
                        </Box>
                        <Table stickyHeader aria-label="sticky table" ref={tableRef}>
                            <TableHead>


                                <TableRow>
                                    <TableCell
                                        key="indic"
                                    >
                                        Thematic area and Indicators
                                    </TableCell>
                                    {(["progressovoi", "progressovcpap", "progressovrrf"].includes(value) || states.length != 1) && <TableCell colSpan={2}>
                                        National
                                    </TableCell>}
                                    {value == "progressovsis" && states?.map((column, id) => (
                                        <TableCell
                                            key={column}
                                            align="center"
                                            colSpan={2}
                                        >
                                            {column}
                                        </TableCell>
                                    ))}
                                    {value == "progressovcpap" && states?.map((column, id) => (
                                        <TableCell
                                            key={column}
                                            align="center"
                                            colSpan={2}
                                        >
                                            {column}
                                        </TableCell>
                                    ))}
                                    {value == "progressovrrf" && states?.map((column, id) => (
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
                                    {(["progressovoi", "progressovcpap", "progressovrrf"].includes(value) || states.length != 1) && <TableCell
                                        key={"targettotal"}
                                    >
                                        Target
                                    </TableCell>}
                                    {(["progressovoi", "progressovcpap", "progressovrrf"].includes(value) || states.length != 1) && <TableCell
                                        key={"actualtotal"}
                                    >
                                        Actual
                                    </TableCell>}
                                    {value == "progressovsis" && states?.map((column, id) => (
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
                                    {value == "progressovcpap" && states?.map((column, id) => (
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
                                    {value == "progressovrrf" && states?.map((column, id) => (
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
                                                <>
                                                    <TableRow>
                                                        {
                                                            data.haschild ?
                                                                <TableCell style={{
                                                                    color: "#eb7e00",
                                                                    fontWeight: 700
                                                                }}
                                                                    colSpan={states.length * 2 + 3}>{data.indic}</TableCell> :
                                                                <>
                                                                    <TableCell rowSpan={2}>{data.indic}</TableCell>
                                                                    {(["progressovoi", "progressovcpap", "progressovrrf"].includes(value) || states.length != 1) && <TableCell className="numberholder">{Object.keys(percarr).includes(data.indic) ? percarr[data.indic] : data.targettotal}</TableCell>}
                                                                    {(["progressovoi", "progressovcpap", "progressovrrf"].includes(value) || states.length != 1) && <TableCell className="numberholder" style={{
                                                                        backgroundColor: (String(data["actualtotal"]) != '' ? (parseInt(data["actualtotal"]) - (Object.keys(percarr).includes(data.indic) ? percarr[data.indic] : parseInt(data["targettotal"])) >= 0 || String(data["actualtotal"]).toLowerCase() == String(data["targettotal"]).toLowerCase()) ? "#92d051" : "#ffc100" : '')
                                                                    }}>{Object.keys(percarr).includes(data.indic) ? Math.round(data.actualtotal / 3) : data.actualtotal}
                                                                        {/* {  String(data["actualtotal"])!='' &&
                                                                                    <div className="editSection">
                                                                                        <HtmlTooltip
                                                                                            className="Commenttooltip"
                                                                                            title={
                                                                                                data["respcomment"]?<React.Fragment>
                                                                                                    
                                                                                                    {data["respcomment"]&& <TextField
                                                                                                        
                                                                                                        autoFocus
                                                                                                        margin="dense"
                                                                                                        label="Comment"
                                                                                                        type="text"
                                                                                                        fullWidth
                                                                                                        multiline
                                                                                                        disabled
                                                                                                        value={data["respcomment"]}
                                                                                                        variant="standard"
                                                                                                    />}
                                                                                                </React.Fragment>:""
                                                                                            }
                                                                                        >
                                                                                            <Button sx={{ m: 1 }}>
                                                                                                <CommentIcon />
                                                                                            </Button>
                                                                                        </HtmlTooltip>
                                                                                        {!enablesignoff && <Button sx={{ m: 1 }} onClick={() => openModal2(data["indic"])}><AddIcon /></Button>}
                                                                                    </div>
                                                                                } */}
                                                                    </TableCell>}
                                                                    {value == "progressovsis" && states?.map(s => {
                                                                        return (
                                                                            <>
                                                                                <TableCell
                                                                                    className="numberholder"


                                                                                >{data[s + "target"]}</TableCell>
                                                                                <TableCell
                                                                                    className="numberholder"
                                                                                    style={{
                                                                                        backgroundColor: (data[s + "actual"] ? (parseInt(data[s + "actual"]) - parseInt(data[s + "target"]) >= 0 || data[s + "actual"].toLowerCase() == data[s + "target"].toLowerCase()) ? "#92d051" : "#ffc100" : '')
                                                                                    }}>
                                                                                    {data[s + "actual"]}
                                                                                    {/* { !data[s + "respsignedOff"] && data[s + "actual"] &&
                                                                                    <div className="editSection">
                                                                                        <CustomWidthTooltip title={data[s + "comment"]}>
                                                                                            <Button sx={{ m: 1 }}><CommentIcon /></Button>
                                                                                        </CustomWidthTooltip>
                                                                                        <Button sx={{ m: 1 }} onClick={() => openModal(data[s + "id"])}><EditIcon /></Button>
                                                                                    </div>
                                                                                } */}
                                                                                    {/* { String(data[s + "actual"])!='undefined' &&
                                                                                    <div className="editSection">
                                                                                        <HtmlTooltip
                                                                                            className="Commenttooltip"
                                                                                            title={
                                                                                                data[s + "comment"] ? <React.Fragment>
                                                                                                    {data[s + "comment"] && <TextField

                                                                                                        autoFocus
                                                                                                        margin="dense"
                                                                                                        label="Statehead Comment"
                                                                                                        type="text"
                                                                                                        fullWidth
                                                                                                        multiline
                                                                                                        disabled
                                                                                                        value={data[s + "comment"]}
                                                                                                        variant="standard"
                                                                                                    />}

                                                                                                </React.Fragment> : ""
                                                                                            }
                                                                                        >
                                                                                            <Button sx={{ m: 1 }}>
                                                                                                <CommentIcon />
                                                                                            </Button>
                                                                                        </HtmlTooltip>
                                                                                        <Button sx={{ m: 1 }} onClick={() => openModal(data[s + "id"])}><EditIcon /></Button>
                                                                                    </div>
                                                                                } */}
                                                                                </TableCell>

                                                                                {/* <TableCell>{data[s+"comment"]}</TableCell> */}
                                                                            </>
                                                                        )
                                                                    })}

                                                                    {value == "progressovcpap" && states?.map(s => {
                                                                        return (
                                                                            <>
                                                                                <TableCell
                                                                                    className="numberholder"


                                                                                >{data[s + "target"]}</TableCell>
                                                                                <TableCell
                                                                                    className="numberholder"
                                                                                    style={{
                                                                                        backgroundColor: (data[s + "actual"] ? (parseInt(data[s + "actual"]) - parseInt(data[s + "target"]) >= 0 || data[s + "actual"].toLowerCase() == data[s + "target"].toLowerCase()) ? "#92d051" : "#ffc100" : '')
                                                                                    }}>
                                                                                    {data[s + "actual"]}
                                                                                    {/* { !data[s + "respsignedOff"] && data[s + "actual"] &&
                                                                                    <div className="editSection">
                                                                                        <CustomWidthTooltip title={data[s + "comment"]}>
                                                                                            <Button sx={{ m: 1 }}><CommentIcon /></Button>
                                                                                        </CustomWidthTooltip>
                                                                                        <Button sx={{ m: 1 }} onClick={() => openModal(data[s + "id"])}><EditIcon /></Button>
                                                                                    </div>
                                                                                } */}
                                                                                    {/* { String(data[s + "actual"])!='undefined' &&
                                                                                    <div className="editSection">
                                                                                        <HtmlTooltip
                                                                                            className="Commenttooltip"
                                                                                            title={
                                                                                                data[s + "comment"] ? <React.Fragment>
                                                                                                    {data[s + "comment"] && <TextField

                                                                                                        autoFocus
                                                                                                        margin="dense"
                                                                                                        label="Statehead Comment"
                                                                                                        type="text"
                                                                                                        fullWidth
                                                                                                        multiline
                                                                                                        disabled
                                                                                                        value={data[s + "comment"]}
                                                                                                        variant="standard"
                                                                                                    />}

                                                                                                </React.Fragment> : ""
                                                                                            }
                                                                                        >
                                                                                            <Button sx={{ m: 1 }}>
                                                                                                <CommentIcon />
                                                                                            </Button>
                                                                                        </HtmlTooltip>
                                                                                        <Button sx={{ m: 1 }} onClick={() => openModal(data[s + "id"])}><EditIcon /></Button>
                                                                                    </div>
                                                                                } */}
                                                                                </TableCell>

                                                                                {/* <TableCell>{data[s+"comment"]}</TableCell> */}
                                                                            </>
                                                                        )
                                                                    })}

                                                                    {value == "progressovrrf" && states?.map(s => {
                                                                        return (
                                                                            <>
                                                                                <TableCell
                                                                                    className="numberholder"


                                                                                >{data[s + "target"]}</TableCell>
                                                                                <TableCell
                                                                                    className="numberholder"
                                                                                    style={{
                                                                                        backgroundColor: (data[s + "actual"] ? (parseInt(data[s + "actual"]) - parseInt(data[s + "target"]) >= 0 || data[s + "actual"].toLowerCase() == data[s + "target"].toLowerCase()) ? "#92d051" : "#ffc100" : '')
                                                                                    }}>
                                                                                    {data[s + "actual"]}
                                                                                    {/* { !data[s + "respsignedOff"] && data[s + "actual"] &&
                                                                                    <div className="editSection">
                                                                                        <CustomWidthTooltip title={data[s + "comment"]}>
                                                                                            <Button sx={{ m: 1 }}><CommentIcon /></Button>
                                                                                        </CustomWidthTooltip>
                                                                                        <Button sx={{ m: 1 }} onClick={() => openModal(data[s + "id"])}><EditIcon /></Button>
                                                                                    </div>
                                                                                } */}
                                                                                    {/* { String(data[s + "actual"])!='undefined' &&
                                                                                    <div className="editSection">
                                                                                        <HtmlTooltip
                                                                                            className="Commenttooltip"
                                                                                            title={
                                                                                                data[s + "comment"] ? <React.Fragment>
                                                                                                    {data[s + "comment"] && <TextField

                                                                                                        autoFocus
                                                                                                        margin="dense"
                                                                                                        label="Statehead Comment"
                                                                                                        type="text"
                                                                                                        fullWidth
                                                                                                        multiline
                                                                                                        disabled
                                                                                                        value={data[s + "comment"]}
                                                                                                        variant="standard"
                                                                                                    />}

                                                                                                </React.Fragment> : ""
                                                                                            }
                                                                                        >
                                                                                            <Button sx={{ m: 1 }}>
                                                                                                <CommentIcon />
                                                                                            </Button>
                                                                                        </HtmlTooltip>
                                                                                        <Button sx={{ m: 1 }} onClick={() => openModal(data[s + "id"])}><EditIcon /></Button>
                                                                                    </div>
                                                                                } */}
                                                                                </TableCell>

                                                                                {/* <TableCell>{data[s+"comment"]}</TableCell> */}
                                                                            </>
                                                                        )
                                                                    })}


                                                                </>
                                                        }
                                                    </TableRow>
                                                    <TableRow className="progress-row">
                                                        {
                                                            !data.haschild && <>
                                                                {(["progressovoi", "progressovcpap", "progressovrrf"].includes(value) || states.length != 1) && <TableCell colSpan={2} className="">
                                                                    <div className="progress-table">
                                                                        {data["respcomment"]}
                                                                    </div>
                                                                </TableCell>}
                                                                {value == "progressovsis" && states?.map(s => {
                                                                    return (<TableCell colSpan={2} className="">
                                                                        <div className="progress-table">
                                                                            {data[s + "comment"]}
                                                                        </div>
                                                                    </TableCell>)
                                                                })}
                                                                {value == "progressovcpap" && states?.map(s => {
                                                                    return (<TableCell colSpan={2} className="">
                                                                        <div className="progress-table">
                                                                            {data[s + "comment"]}
                                                                        </div>
                                                                    </TableCell>)
                                                                })}
                                                                {value == "progressovrrf" && states?.map(s => {
                                                                    return (<TableCell colSpan={2} className="">
                                                                        <div className="progress-table">
                                                                            {data[s + "comment"]}
                                                                        </div>
                                                                    </TableCell>)
                                                                })}
                                                            </>
                                                        }
                                                    </TableRow>
                                                </>
                                            )
                                        })}
                                        <TableRow>
                                            <TableCell colSpan={states.length * 2 + 3} align="center" style={{
                                                height: "60px"

                                            }}>
                                            </TableCell>
                                        </TableRow>
                                    </>
                                    : <TableRow>
                                        <TableCell colSpan={states.length * 2 + 3} align="center">
                                            Awaiting Sign Off
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
            <Dialog open={open2} onClose={handleClose}>
                <DialogTitle>{editrespdata.thematic}</DialogTitle>
                <DialogContent>
                    <DialogContentText className="editdialoglabel">
                        {editrespdata.rrfname}
                    </DialogContentText>
                    <DialogContentText className="editdialoglabel1">
                        {editrespdata.questionname}
                    </DialogContentText>
                    <TextField
                        className="editdialogtxt"
                        autoFocus
                        margin="dense"
                        id="commentdata"
                        label="Comment"
                        type="text"
                        fullWidth
                        multiline
                        value={editrespdata.responsible_person_comment}
                        variant="standard"
                        onChange={e => seteditrespdata({ ...editrespdata, responsible_person_comment: e.target.value })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={editRespData} className="editdatabtn">Save Data</Button>
                    <Button onClick={handleClose} className="cancelbtn">Cancel</Button>
                </DialogActions>
            </Dialog>
            <Snackbar open={alerttxt.length > 0} autoHideDuration={6000} onClose={handleClose}>
                {alerttxt == "success" ? <Alert severity="success">Data saved !</Alert> : alerttxt == "error" ? <Alert severity="error">Update failed !</Alert> : ''
                }
            </Snackbar>

            {/* { !enablesignoff && rowdata.length > 0 && <Fab variant="extended" size="medium" sx={{
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
                onClick={signoffData}
            >
                Sign off
            </Fab> } */}
            <Footer />
        </>

    )
}

export default Signoffprogress;
