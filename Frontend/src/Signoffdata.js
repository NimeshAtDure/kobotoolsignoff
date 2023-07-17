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
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CommentIcon from '@mui/icons-material/Comment';
import EditIcon from '@mui/icons-material/Edit';

const CustomWidthTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))({
    [`& .${tooltipClasses.tooltip}`]: {
        maxWidth: 500,
    },
});


function Signoffdata() {

    const [user, setuser] = useState(JSON.parse(sessionStorage.getItem("user")))
    const [tabledata, settabledata] = useState([])
    const [thematic, setthematic] = useState([])
    const [states, setstates] = useState([])
    const [columns, setcolumns] = useState([])
    const [rowdata, setrowdata] = useState([])
    const [editdata, seteditdata] = useState({})
    const [open, setOpen] = useState(false)
    useEffect(() => {

        axios({
            method: 'post',
            url: 'https://service.rbmgateway.org/getdata',
            data: {
                "username": user.username
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
                    setthematic(filtthemes)
                    setstates(filtstates)
                    thematicarr = filtthemes.map((theme) => {
                        let newArray = response.data.data.filter(function (el) {
                            return el.thematic == theme
                        }
                        );
                        return { [theme]: newArray }
                    })
                    var data = []
                    thematicarr.map((theme) => {
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
                                var rowobj3 = {}
                                rowobj3["id"] = i.unique_id
                                rowobj3["indic"] = i.questionname
                                rowobj3["haschild"] = false
                                rowobj3[i.state + "actual"] = i.actual
                                rowobj3[i.state + "target"] = i.target
                                rowobj3[i.state + "comment"] = i.comments
                                data.push(rowobj3)
                            })
                            // console.log("ind",indi)
                        })
                        console.log(thematicarr, data, themearr)
                    })
                    setrowdata(data)

                }
            ).catch((err) => { console.log(err) });
    }, [user])

    function openModal(id) {
        setOpen(true)
        seteditdata(tabledata.filter(function (td) {
            return td.unique_id == id
        })[0])
    }

    function editRowData(){
        console.log("edit",editdata)
        axios({
            method: 'post',
            url: 'https://service.rbmgateway.org/updatedata',
            data: {
                "username": user.username,
                "actual":editdata.actual,
                "comment":editdata.comments,
                "theme":editdata.thematic.toLowerCase(),
                "id":editdata.unique_id
            }
        })
            .then(
                response => {
                    console.log(response)
                }
                ).catch((err) => { console.log(err) });
    }

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <div className="App signoffpg progressoverviewpage">
                <Appnavbar navItems={{ "forms": true, "supchck": true, "dashboard": true, "progoverview": true }} />
                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                    <TableContainer sx={{ maxHeight: "100vh" }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>


                                <TableRow>
                                    <TableCell
                                        key="indic"
                                    >
                                        Theme and Indicators
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
                                                key={column + "actual"}

                                            >
                                                Actual
                                            </TableCell>
                                            <TableCell
                                                key={column + "target"}
                                            >
                                                Target
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
                                {rowdata.map((data) => {
                                    return (
                                        <TableRow>
                                            {
                                                data.haschild ?
                                                    <TableCell colSpan={states.length * 2 + 1}>{data.indic}</TableCell> :
                                                    <>
                                                        <TableCell>{data.indic}</TableCell>
                                                        {states?.map(s => {
                                                            return (
                                                                <>
                                                                    <TableCell
                                                                        style={{
                                                                            backgroundColor: (data[s + "actual"] ? data[s + "actual"] - data[s + "target"] >= 0 ? "#92d051" : "#ffc100" : '')
                                                                        }}>
                                                                        {data[s + "actual"]}
                                                                        {data[s + "actual"] && data[s + "comment"] &&
                                                                            <div className="editSection">
                                                                                <CustomWidthTooltip title={data[s + "comment"]}>
                                                                                    <Button sx={{ m: 1 }}><CommentIcon /></Button>
                                                                                </CustomWidthTooltip>
                                                                                <Button sx={{ m: 1 }} onClick={()=>openModal(data.id)}><EditIcon /></Button>
                                                                            </div>
                                                                        }
                                                                    </TableCell>
                                                                    <TableCell>{data[s + "target"]}</TableCell>
                                                                    {/* <TableCell>{data[s+"comment"]}</TableCell> */}
                                                                </>
                                                            )
                                                        })}
                                                    </>
                                            }
                                        </TableRow>
                                    )
                                })}
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
                    <DialogContentText className="editdialoglabel">
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
                        onChange={e => seteditdata({...editdata,actual:e.target.value})}
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
                        onChange={e => seteditdata({...editdata,comments:e.target.value})}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={editRowData} className="editdatabtn">Edit Data</Button>
                    <Button onClick={handleClose} className="cancelbtn">Cancel</Button>
                </DialogActions>
            </Dialog>
            <Footer />
        </>

    )
}

export default Signoffdata;
