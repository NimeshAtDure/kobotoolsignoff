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
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import './App.css';
import { useEffect, useState } from "react";
import Footer from "./Footer";


function ProgressOverview() {
    // ["SRH", "GENDER", "A&Y", "PD"]
    const [thematic, setthematic] = useState(["Consolidated Heatmap", "Office indicators"])
    const [activetheme, setactivetheme] = useState("Consolidated Heatmap")
    
    const navigate = useNavigate();

    function handlethemeChange(event, newvalue) {
        // console.log(newvalue, thematicdata[thematic.indexOf(newvalue)])
        setactivetheme(newvalue)
    }

    return (
        <>
            <div className="App signoffpg">
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
                    
                </TabContext>
                
            </div>
            
            <Footer />
        </>
    );
}

export default ProgressOverview;
