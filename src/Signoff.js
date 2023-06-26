import axios from "axios";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import Tab from '@mui/material/Tab';
import TabPanel from '@mui/lab/TabPanel';
import BasicTable from "./Table";
import List from '@mui/material/List';
import { Navigate, useNavigate } from "react-router-dom";
import { Oval } from "react-loader-spinner"
import Appnavbar from "./Appnavbar";
import './App.css';
import { useEffect, useState } from "react";
import Footer from "./Footer";

const navItems = ['Home'];


function Signoff() {

    const [thematic, setthematic] = useState(["SRH", "GENDER", "A&Y", "PD"])
    const [states, setstates] = useState([])
    const [statetables, setstatetables] = useState({})
    const [thematicdata, setthematicdata] = useState([])
    const [activetheme, setactivetheme] = useState(thematic[0])
    const [activestate, setactivestate] = useState('')
    const [activetable, setactivetable] = useState(null)
    const [loading, setloading] = useState(false)
    const [token, settoken] = useState(sessionStorage.getItem("token"))

    const navigate = useNavigate();

    useEffect(() => {

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
                setloading(true)
                let arr = []
                thematic?.map((t) => {
                    arr.push(response.data.results.filter((r) =>
                        r.name.split("-")[1] == t))
                })
                // console.log(arr);
                setthematicdata(arr)
                setTimeout(() => {
                    Configtabledata(arr[0])
                }, 5000);
            })
            .catch((error) => {
                console.log(error);
            });

    }, [])

    function Configtabledata(arr) {
        let themedata = {}
        arr.forEach(element => {
            if (element.name.split("-").length == 3) {
                let statename = element.name.split("-")[2]
                themedata[statename] = []

                let config1 = {
                    method: 'get',
                    maxBodyLength: Infinity,
                    url: element.data,
                    headers: {
                        'Authorization': 'Token ' + token
                    }
                };

                axios.request(config1)
                    .then((response) => {
                        if (response.data.results.length > 0) {

                            response.data.results.forEach(indvresult => {


                                let resultarr = indvresult
                                let ques = Object.keys(indvresult).filter(r => r.includes("Question_") && !r.includes("/Milestone"))
                                let quarter = indvresult[Object.keys(indvresult).filter(r => r.includes("/QuarterText"))]
                                let filterques = ques.map((q) => {
                                    return q.split("/").slice(0, 4).join("/")
                                }).filter((value, index, array) => array.indexOf(value) === index)
                                let queslabel = ques.map((q) => {
                                    return q.split("/").slice(0, 4).join("/")
                                }).filter((value, index, array) => array.indexOf(value) === index)
                                console.log("response1", ques, filterques, queslabel)


                                let config2 = {
                                    method: 'get',
                                    maxBodyLength: Infinity,
                                    url: element.url,
                                    headers: {
                                        'Authorization': 'Token ' + token
                                    }
                                };

                                axios.request(config2)
                                    .then((response) => {
                                        // console.log("response2", response.data.content.survey)
                                        var statedata = []
                                        filterques.forEach(f => {
                                            var obj = {}
                                            let Label = response.data.content.survey.filter(function (el) {
                                                return el.$xpath == f
                                            })[0].label[0].replaceAll("**", " ");
                                            obj.indic = Label
                                            obj.quarter = quarter
                                            let indcdata = ques.filter(r => r.includes(f))
                                            indcdata.forEach(i => {
                                                // console.log(resultarr, i)
                                                if (i.toLowerCase().includes("actual")) {
                                                    obj.actual = resultarr[i]
                                                } else if (i.toLowerCase().includes("target")) {
                                                    obj.target = resultarr[i]
                                                }
                                            })
                                            themedata[statename].push(obj)
                                            console.log(indcdata, themedata);
                                        })

                                    })
                                    .catch((error) => {
                                        console.log(error);
                                    });
                            })
                            
                        }

                    })
                    .catch((error) => {
                        console.log(error);
                        setstatetables(themedata)
                        setstates(Object.keys(themedata))
                        setactivestate(Object.keys(themedata)[0])
                        setactivetable(themedata[Object.keys(themedata)[0]])
                    });
            }
        });
        setTimeout(() => {   
            setloading(false)
            setstatetables(themedata)
            setstates(Object.keys(themedata))
            setactivestate(Object.keys(themedata)[0])
            setactivetable(themedata[Object.keys(themedata)[0]])
        }, 1000);
    }


    function handlethemeChange(event, newvalue) {
        // console.log(newvalue, thematicdata[thematic.indexOf(newvalue)])
        setloading(true)
        setactivetheme(newvalue)
        Configtabledata(thematicdata[thematic.indexOf(newvalue)])
    }


    function handlestateChange(event, newvalue) {
        setactivestate(newvalue)
        setactivetable(statetables[newvalue])
    }

    const COLUMNS = [
        {
            Header: 'Indicator',
            accessor: 'indic',
        },
        {
            Header: "Quarter",
            accessor: 'quarter'
        },
        {
            Header: 'Target',
            accessor: 'target',
        },
        {
            Header: 'Actual',
            accessor: 'actual',
        }
    ];

    const navItems = (
        <List>
            <Button variant="outlined" className='viewbtn mt-0 dbbutton' onClick={()=>navigate("/")}>Home</Button>
            <Button variant="outlined" className='viewbtn mt-0 dbbutton'><a href={"https://ee.rbmgateway.org/x/QCgXLb2v"} target="_blank">Supervision Checklist</a></Button>
            <Button variant="outlined" className='viewbtn mt-0 dbbutton' ><a href={"http://dashboard.rbmgateway.org:8088/superset/dashboard/11/?native_filters_key=Sn0k7O0XzuJ6IEkSzzbdggNIEah2YccuBHtPw6uleOWIyfojOlxyqsOxoOW2RLiF"} target="_blank">Dashboard</a></Button>        </List>
    );

    return (
        <>      
        <div className="App">
            <Appnavbar navItems={navItems} />
            <TabContext value={activetheme} >
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }} className="thematictab">
                    <TabList onChange={handlethemeChange} >
                        {
                            thematic?.map((t, i) => {
                                return <Tab label={t} value={t} />
                            })
                        }
                    </TabList>
                </Box>
                {
                    loading ? <Oval
                        height={80}
                        width={80}
                        color="#ed8b00"
                        wrapperStyle={{}}
                        wrapperClass="signoffloader"
                        visible={true}
                        ariaLabel='oval-loading'
                        secondaryColor="#fff"
                        strokeWidth={2}
                        strokeWidthSecondary={2}
                    /> :
                        thematic?.map((t, i) => {
                            return <TabPanel value={t} className="thematictabbody">
                                <TabContext value={activestate}>
                                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                        <TabList variant="scrollable" onChange={handlestateChange} >
                                            {
                                                states?.map((s, j) => {
                                                    return <Tab label={s} value={s} />
                                                })
                                            }
                                        </TabList>
                                    </Box>
                                    {
                                        states?.map((s, j) => {
                                            return <TabPanel value={s}>
                                                {activetable && <BasicTable columns={COLUMNS} data={activetable} />}
                                            </TabPanel>
                                        })
                                    }
                                </TabContext>
                            </TabPanel>
                        })
                }
            </TabContext>
            <Button variant="outlined" disabled={loading} className='signoffbtn'>Sign off</Button>
        </div>
            <Footer/>
        </>
    );
}

export default Signoff;
