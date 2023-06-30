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
import Dialog from '@mui/material/Dialog';
import './App.css';
import { useEffect, useState } from "react";
import Footer from "./Footer";


function Signoff() {
    // ["SRH", "GENDER", "A&Y", "PD"]
    const [thematic, setthematic] = useState([])
    const [states, setstates] = useState([])
    const [statetables, setstatetables] = useState({})
    const [thematicdata, setthematicdata] = useState([])
    const [activetheme, setactivetheme] = useState('')
    const [activestate, setactivestate] = useState('')
    const [activetable, setactivetable] = useState(null)
    const [loading, setloading] = useState(false)
    const [token, settoken] = useState(sessionStorage.getItem("token"))
    const [user,setuser] = useState(JSON.parse(sessionStorage.getItem("user")))
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
                let thm = []
                let arr = []

                response.data.results.forEach(element => {
                    var surname = element.name
                    if (surname.includes("SIS") && surname.split("-").length == 3) {
                        thm.push(surname.split("-")[1])
                    } 
                });
                var filterthm = thm.filter((value, index, array) => array.indexOf(value) === index)
                console.log("themes",thm,filterthm)
                setthematic(filterthm)
                setactivetheme(filterthm[0])
                filterthm?.map((t) => {
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

    }, [token])

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
                            let indvresult = response.data.results[response.data.results.length - 1]
                            console.log("indvresult", indvresult)
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
                                            console.log(resultarr, i)
                                            if (i.toLowerCase().includes("actual")) {
                                                obj.actual = resultarr[i]
                                            } else if (i.toLowerCase().includes("target")) {
                                                obj.target = resultarr[i]
                                            } else if (i.toLowerCase().includes("datasignoff")){
                                                obj.user = resultarr[i]
                                            } else if(i.toLowerCase().includes("comment")){
                                                obj.comment = resultarr[i]
                                            }
                                            console.log(indcdata, themedata);
                                        })
                                        if(obj.user == user.email || (user.username.includes("admin") || user.username.includes("kaushik"))){
                                            themedata[statename].push(obj)
                                        }
                                    })
                                })
                                .catch((error) => {
                                    console.log(error);
                                });
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

        }, 2000);
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
        },
        {
            Header: 'Comment',
            accessor: 'comment',
        }
    ];

    return (
        <>
            <div className="App">
                <Appnavbar navItems={{ "forms": true, "supchck": true, "dashboard": true }} />
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
                <Button variant="outlined" disabled={loading} className='signoffbtn' >Sign off data</Button>
            </div>
            
            <Footer />
        </>
    );
}

export default Signoff;
