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

const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        //   backgroundColor: '#f5f5f9',
        color: 'rgba(0, 0, 0, 0.87)',
        maxWidth: 500,
        minWidth:400
        //   fontSize: theme.typography.pxToRem(12),
        //   border: '1px solid #dadde9',
    },
}));


function Signoffresp() {
    const location = useLocation();

    const [user, setuser] = useState(JSON.parse(localStorage.getItem("user")))
    const [tabledata, settabledata] = useState([])
    const [thematic, setthematic] = useState([])
    const [states, setstates] = useState([])
    const [columns, setcolumns] = useState([])
    const [rowdata, setrowdata] = useState([])
    const [editdata, seteditdata] = useState({})
    const [editrespdata, seteditrespdata] = useState({})
    const [open, setOpen] = useState(false)
    const [open2, setOpen2] = useState(false)
    const [alerttxt, setalerttxt] = useState('')
    const [enablesignoffstate, setenablesignoffstate] = useState(true)
    const [enablesignoff, setenablesignoff] = useState(true)


    useEffect(() => {
        getFormData()
    }, [user, location.state])

    function getFormData() {
        axios({
            method: 'post',
            // url:'http://localhost:8080/getdata',
            url: 'https://service.rbmgateway.org/getdata',
            data: {
                "username": user.username,
                "usertype": "respperson"
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
                                console.log("data", Object.values(data))
                                if (data.findIndex((obj => obj.indic == i.questionname)) > -1) {
                                    let objIndex = data.findIndex((obj => (obj.indic == i.questionname && obj.theme == i.thematic)));
                                    data[objIndex][i.state + "id"] = i.unique_id
                                    data[objIndex][i.state + "actual"] = i.actual
                                    data[objIndex][i.state + "target"] = i.target
                                    data[objIndex][i.state + "comment"] = i.comments
                                    data[objIndex]["respcomment"] = i.responsible_person_comment && i.responsible_person_comment?.length>0 ? i.responsible_person_comment :data[objIndex]["respcomment"]
                                    data[objIndex]["actualtotal"] = i.actual && isNumeric(i.actual) ? data[objIndex]["actualtotal"] + parseInt(i.actual) : data[objIndex]["actualtotal"]
                                    data[objIndex]["targettotal"] = i.target && isNumeric(i.target) ? data[objIndex]["targettotal"] + parseInt(i.target) : data[objIndex]["targettotal"]
                                    data[objIndex][i.state + "respsignedOff"] = i.responsible_person_approved
                                } else {
                                    var rowobj3 = {}
                                    rowobj3[i.state + "id"] = i.unique_id
                                    rowobj3["indic"] = i.questionname
                                    rowobj3["theme"] = i.thematic
                                    rowobj3["haschild"] = false
                                    rowobj3[i.state + "actual"] = i.actual
                                    rowobj3[i.state + "target"] = i.target
                                    rowobj3[i.state + "comment"] = i.comments
                                    rowobj3["respcomment"] = i.responsible_person_comment
                                    rowobj3["actualtotal"] = i.actual && isNumeric(i.actual) ? parseInt(i.actual) : 0
                                    rowobj3["targettotal"] = i.target && isNumeric(i.target) ? parseInt(i.target) : 0
                                    rowobj3[i.state + "respsignedOff"] = i.responsible_person_approved

                                    data.push(rowobj3)
                                }
                                // console.log("ind", indi, i.questionname, i.actual, i.target)
                            })
                        })
                        console.log(thematicarr, data, themearr)
                    })

                    var signoffstate = response.data.data.filter(function (th) {
                        return th.statehead_approved == null
                    })
                    signoffstate.length == 0?setrowdata(data):setrowdata([])
                    setenablesignoff(!response.data.data.filter(function (th) {
                        return th.responsible_person_approved == "Yes"
                    }).length == 0)

                }
            ).catch((err) => { console.log(err) });
    }

    function isNumeric(num) {
        return !isNaN(num)
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
                "type": "respperson",
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
            // url:'http://localhost:8080/updatedata',
            url: 'https://service.rbmgateway.org/updatedata',
            data: {
                "username": user.username,
                "actual": editrespdata.actual,
                "comment": editrespdata.comments,
                "respcomment":editrespdata.responsible_person_comment,
                "type": "respperson",
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

    function signoffDataResp() {
        if (!enablesignoff ) {
            axios({
                method: 'post',
                // url:'http://localhost:8080/resposignoff',
                url: 'https://service.rbmgateway.org/resposignoff',
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

    const handleClose = () => {
        setOpen(false);
        setOpen2(false)
        setalerttxt("")
    };

    return (
        <>
            <div className="App signoffpg progressoverviewpage signoff-section">
                <Appnavbar navItems={{ "forms": true, "supchck": true, "dashboard": true, "progoverview": true }} />
                <Paper sx={{ width: '100%', overflow: 'hidden' }} >
                    <TableContainer sx={{ maxHeight: "100vh" }} className="heatmaptableholder">
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
                                    <TableCell colSpan={2}>
                                    Total
                                    </TableCell>
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
                                    <TableCell
                                        key={"targettotal"}
                                    >
                                        Target
                                    </TableCell>
                                    <TableCell
                                        key={"actualtotal"}
                                    >
                                        Actual
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rowdata.length > 0 ?
                                    <>
                                        {console.log}
                                        {rowdata.map((data) => {
                                            return (
                                                <TableRow>
                                                    {
                                                        data.haschild ?
                                                            <TableCell style={{
                                                                color: "#eb7e00",
                                                                fontWeight: 700
                                                            }}
                                                                colSpan={states.length * 2 + 3}>{data.indic}</TableCell> :
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
                                                                                    backgroundColor: (data[s + "actual"] ? data[s + "actual"] - data[s + "target"] >= 0 ? "#92d051" : "#ffc100" : '')
                                                                                }}>
                                                                                {data[s + "actual"]}
                                                                                {!data[s + "respsignedOff"] && data[s + "actual"] &&
                                                                                    <div className="editSection">
                                                                                        <HtmlTooltip
                                                                                            className="Commenttooltip"
                                                                                            title={
                                                                                                data[s + "comment"] ?<React.Fragment>
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
                                                                                                    
                                                                                                </React.Fragment>:""
                                                                                            }
                                                                                        >
                                                                                            <Button sx={{ m: 1 }}>
                                                                                                <CommentIcon />
                                                                                            </Button>
                                                                                        </HtmlTooltip>
                                                                                        <Button sx={{ m: 1 }} onClick={() => openModal(data[s + "id"])}><EditIcon /></Button>
                                                                                    </div>
                                                                                }
                                                                            </TableCell>

                                                                            {/* <TableCell>{data[s+"comment"]}</TableCell> */}
                                                                        </>
                                                                    )
                                                                })}                                                         <TableCell className="numberholder">{data.targettotal}</TableCell>
                                                                <TableCell className="numberholder" style={{
                                                                                    backgroundColor: (data["actualtotal"] ? data["actualtotal"] - data["targettotal"] >= 0 ? "#92d051" : "#ffc100" : '')
                                                                                }}>
                                                                                    {data.actualtotal}
                                                                                    {!enablesignoff && data["actualtotal"] &&
                                                                                    <div className="editSection">
                                                                                        <HtmlTooltip
                                                                                            className="Commenttooltip"
                                                                                            title={
                                                                                                data["respcomment"]?<React.Fragment>
                                                                                                    
                                                                                                    {data["respcomment"]&& <TextField
                                                                                                        
                                                                                                        autoFocus
                                                                                                        margin="dense"
                                                                                                        label="Responsible Person Comment"
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
                                                                                        <Button sx={{ m: 1 }} onClick={() => openModal2(data["indic"])}><EditIcon /></Button>
                                                                                    </div>
                                                                                }
                                                                                    </TableCell>
                                                            </>
                                                    }
                                                </TableRow>
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
                        label="Statehead Comment"
                        type="text"
                        fullWidth
                        multiline
                        disabled
                        value={editdata.comments}
                        variant="standard"
                        onChange={e => seteditdata({ ...editdata, comments: e.target.value })}
                    />
                    {/* <TextField
                        className="editdialogtxt"
                        autoFocus
                        margin="dense"
                        id="commentdata"
                        label="Responsible Person Comment"
                        type="text"
                        fullWidth
                        multiline
                        value={editdata.responsible_person_comment}
                        variant="standard"
                        onChange={e => seteditdata({ ...editdata, responsible_person_comment: e.target.value })}
                    /> */}
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
                        label="Responsible Person Comment"
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

            { !enablesignoff && rowdata.length > 0 && <Fab variant="extended" size="medium" sx={{
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
                onClick={signoffDataResp}
            >
                Sign off
            </Fab>}
            <Footer />
        </>

    )
}

export default Signoffresp;