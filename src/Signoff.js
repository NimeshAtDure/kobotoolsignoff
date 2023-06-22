import axios from "axios";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import Tab from '@mui/material/Tab';
import TabPanel from '@mui/lab/TabPanel';
import BasicTable from "./Table";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Navigate,useNavigate } from "react-router-dom";

import './App.css';
import { useEffect, useState } from "react";

const navItems = ['Home'];


function Signoff() {

  const [token, settoken] = useState([])
  const [mobileOpen, setMobileOpen] = useState(false);
  const [thematic, setthematic] = useState(["SRH", "GENDER", "A&Y"])
  const [states, setstates] = useState([])
  const [statetables, setstatetables] = useState({})
  const [thematicdata, setthematicdata] = useState([])
  const [activetheme, setactivetheme] = useState(thematic[0])
  const [activestate, setactivestate] = useState('')
  const [activetable, setactivetable] = useState(null)

  const navigate = useNavigate();

  useEffect(() => {
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
      })
      .catch((error) => {
        console.log("getRequest err>>", error);
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

              response.data.results.forEach(indvresult => {


                let resultarr = indvresult
                let ques = Object.keys(indvresult).filter(r => r.includes("Question_") && !r.includes("/Milestone"))
                let quarter = indvresult[Object.keys(indvresult).filter(r => r.includes("/QuarterText"))]
                let filterques = ques.map((q) => {
                  return q.split("/").slice(0, 4).join("/")
                }).filter((value, index, array) => array.indexOf(value) === index)
                let queslabel=ques.map((q) => {
                  return q.split("/").slice(0, 4).join("/")
                }).filter((value, index, array) => array.indexOf(value) === index)
                console.log("response1", ques, filterques,queslabel)


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
                      // console.log(Label, indcdata, themedata, resultarr["Output_3/QuarterText"]);
                    })

                  })
                  .catch((error) => {
                    console.log(error);
                  });
              })
              setstatetables(themedata)
              setstates(Object.keys(themedata))
              setactivestate(Object.keys(themedata)[0])
              setactivetable(themedata[Object.keys(themedata)[0]])
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
  }

  // useEffect(()=>{
  //   console.log("table",activestate,statetables[activestate],statetables)
  //   setactivetable(statetables[activestate])
  // },[])

    function handlethemeChange(event, newvalue) {
    // console.log(newvalue, thematicdata[thematic.indexOf(newvalue)])
        setactivetheme(newvalue)
        Configtabledata(thematicdata[thematic.indexOf(newvalue)])
    }


    function handlestateChange(event, newvalue) {
        setactivestate(newvalue)
        setactivetable(statetables[newvalue])
    }

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const OpenSignoff = () =>{
        navigate("/home")
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

  return (
    <div className="App">
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
      <Button variant="outlined" className='viewbtn'>Sign off</Button>
    </div>
  );
}

export default Signoff;
