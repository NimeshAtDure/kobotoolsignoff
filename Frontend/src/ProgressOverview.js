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

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';



function ProgressOverview() {
    // ["SRH", "GENDER", "A&Y", "PD"]
    const [thematic, setthematic] = useState(["Consolidated Heatmap", "Office indicators"])
    const [activetheme, setactivetheme] = useState("Consolidated Heatmap")

    const [age, setAge] = useState('2023');
    const [quarter, setQuarter] = useState('Q2');

    const handleChange = (event) => {
      setAge(event.target.value);
    };

    const handleChangeQuarter = (event) => {
        setQuarter(event.target.value);
      };
    
    const navigate = useNavigate();

    function handlethemeChange(event, newvalue) {
        // console.log(newvalue, thematicdata[thematic.indexOf(newvalue)])
        setactivetheme(newvalue)
    }

    return (
        <>
            <div className="App signoffpg progressoverviewpage">
                <Appnavbar navItems={{ "forms": true, "supchck": true, "dashboard": true,"progoverview":true }} />
              
                <TabContext value={activetheme} >
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }} className="thematictab">
                    <div className="filtercontrolholder">
                        <p>Please Select</p>
                <FormControl>
        <InputLabel id="demo-simple-select-label">Year</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={"2023"}>2023</MenuItem>
          <MenuItem value={"2022"}>2022</MenuItem>
          <MenuItem value={"2021"}>2021</MenuItem>
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel id="demo-simple-select-label">Quarter</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={quarter}
          label="Age"
          onChange={handleChangeQuarter}
        >
          <MenuItem value={"Q1"}>Q1</MenuItem>
          <MenuItem value={"Q2"}>Q2</MenuItem>
          <MenuItem value={"Q3"}>Q3</MenuItem>
          <MenuItem value={"Q4"}>Q4</MenuItem>
        </Select>
      </FormControl>
                </div>
                        <TabList onChange={handlethemeChange} >
                            {
                                thematic?.map((t, i) => {
                                    return <Tab label={t} value={t} />
                                })
                            }
                        </TabList>
                     
                    </Box>
                 
                    <TabPanel value={"Consolidated Heatmap"} className="thematictabbody">
                                   <div className="heatmaptableholder">
                                   <table>
    <thead>
        <tr>
        <th></th>
            <th colSpan={2} >National</th>
           
            <th  colSpan={2}>Bihar</th>
           
            <th colSpan={2}>MP</th>
           
            <th colSpan={2}>Odisha</th>
           
            <th colSpan={2}>Rajasthan</th>
           
            <th colSpan={2}>Delhi</th>
           
        </tr>
        <tr className="secondline">
        <th></th>
<th className="fw-bold">Target</th>
<th className="fw-bold">Achieved</th>
<th className="fw-bold">Target</th>
<th className="fw-bold">Achieved</th>
<th className="fw-bold">Target</th>
<th className="fw-bold">Achieved</th>
<th className="fw-bold">Target</th>
<th className="fw-bold">Achieved</th>
<th className="fw-bold">Target</th>
<th className="fw-bold">Achieved</th>
<th className="fw-bold">Target</th>
<th className="fw-bold">Achieved</th>
        </tr>
    </thead>
    <tbody>
       
       
        <tr>
            <td colSpan={13} className="fw-bold titleorange">Sexual and Reproductive Health and Rights</td>
           
        </tr>
        <tr>
            <td colSpan={13} className="fw-bold fs-14px">RRF 3 : Number of UNFPA focus-States developing and implementing Family Planning 2030 road maps and action plans to increase the uptake of modern contraceptives, especially reversible methods.</td>
            
        </tr>
        <tr className="fs-13px">
            <td>% of health facilities in UNFPA priority districts which report no stock out of contraceptives in last 3 months</td>
            <td className="cell-yellow">65</td>
            <td></td>
            <td className="cell-yellow">65</td>
            <td className="cell-yellow">50</td>
            <td className="cell-yellow">65</td>
            <td className="cell-yellow">55</td>
            <td className="cell-green">65</td>
            <td className="cell-green">70</td>
            <td className="cell-green">65</td>
            <td className="cell-green">65</td>
            <td className="cell-yellow">65</td>
            <td className="cell-yellow">60</td>
        </tr>
       
        <tr>
            <td colSpan={13} className="fw-bold fs-14px">RRF 4 : Proportion of facilities in priority districts providing comprehensive package of high quality sexual and reproductive health services (at least five components) as part of universal health coverage.</td>
          
        </tr>
        <tr className="fs-13px">
            <td>Percentage of public health facilities in priority districts providing safe delivery services</td>
            <td className="cell-green">60</td>
            <td className="cell-green">70</td>
            <td className="cell-yellow">60</td>
            <td className="cell-yellow">55</td>
            <td className="cell-green">60</td>
            <td className="cell-green">70</td>
            <td className="cell-yellow">60</td>
            <td className="cell-yellow">59</td>
            <td className="cell-green">60</td>
            <td className="cell-green">70</td>
            <td className="cell-green">60</td>
            <td className="cell-green">70</td>
        </tr>
        <tr className="fs-13px">
            <td>Percentage of public health facilities in priority districts providing at least 5 reversible contraceptive methods</td>
            <td className="cell-yellow">60</td>
            <td className="cell-yellow">55</td>
            <td className="cell-green">60</td>
            <td className="cell-green">70</td>
            <td className="cell-green">60</td>
            <td className="cell-green">62</td>
            <td className="cell-green">60</td>
            <td className="cell-green">61</td>
            <td className="cell-green">60</td>
            <td className="cell-green">60</td>
            <td className="cell-green">60</td>
            <td className="cell-green">60</td>
        </tr>
        <tr className="fs-13px">
            <td>Percentage of public health facilities in priority districts providing safe abortion services</td>
            <td className="cell-yellow">25</td>
            <td className="cell-yellow">15</td>
            <td className="cell-yellow">25</td>
            <td className="cell-yellow">15</td>
            <td className="cell-yellow">25</td>
            <td className="cell-yellow">15</td>
            <td className="cell-yellow">25</td>
            <td className="cell-yellow">15</td>
            <td className="cell-green">25</td>
            <td className="cell-green">25</td>
            <td className="cell-yellow">25</td>
            <td className="cell-yellow">15</td>
        </tr>
        <tr className="fs-13px">
            <td>Percentage of public health facilities in priority districts doing HIV screening during ANC</td>
            <td className="cell-green">55</td>
<td className="cell-green">76</td>
<td className="cell-green">55</td>
<td className="cell-green">76</td>
<td className="cell-green">55</td>
<td className="cell-green">76</td>
<td className="cell-green">55</td>
<td className="cell-green">76</td>
<td className="cell-green">55</td>
<td className="cell-green">76</td>
<td className="cell-green">55</td>
<td className="cell-green">76</td>
        </tr>
       
       
        <tr>
            <td colSpan={13} className="fw-bold titleorange">Adolescent and Youth</td>
          
        </tr>
        <tr>
            <td colSpan={13} class="fw-bold fs-14px">RRF 5 : Number of districts in UNFPA focus-States that offer age appropriate, gender-transformative life-skills education programmes through schools in line with international guidelines.</td>
           
        </tr>
        <tr className="fs-13px">
            <td>No of districts in UNFPA focus states implementing all three components (PE approach, AFHCs and AHWDs) of RKSK program.</td>
            <td className="cell-green">17</td>
<td className="cell-green">18</td>
<td className="cell-yellow">17</td>
<td className="cell-yellow">16</td>
<td className="cell-yellow">17</td>
<td className="cell-yellow">16</td>
<td className="cell-green">17</td>
<td className="cell-green">18</td>
<td className="cell-green">17</td>
<td className="cell-green">18</td>
<td className="cell-green">17</td>
<td className="cell-green">18</td>
        </tr>
        <tr className="fs-13px">
            <td>No of schools implementing LSE (schools, ITI, madarsas, tribal schools and hostels, special schools).</td>
            <td className="cell-yellow">32894</td>
<td className="cell-yellow">25000</td>
<td className="cell-green">32894</td>
<td className="cell-green">35000</td>
<td className="cell-green">32894</td>
<td className="cell-green">35000</td>
<td className="cell-green">32894</td>
<td className="cell-green">35000</td>
<td className="cell-yellow">32894</td>
<td className="cell-yellow">25000</td>
<td className="cell-yellow">32894</td>
<td className="cell-yellow">25000</td>
        </tr>
        <tr className="fs-13px">
            <td>No of teachers trained to impart school based LSE sessions (schools, ITI, madarsas, tribal schools and hostels, special schools) in UNFPA supported states</td>
            <td className="cell-green">21901</td>
<td className="cell-green">22000</td>
<td className="cell-yellow">21901</td>
<td className="cell-yellow">20000</td>
<td className="cell-yellow">21901</td>
<td className="cell-yellow">20000</td>
<td className="cell-green">21901</td>
<td className="cell-green">22000</td>
<td className="cell-green">21901</td>
<td className="cell-green">22000</td>
<td className="cell-green">21901</td>
<td className="cell-green">22000</td>
        </tr>
       
        <tr>
            <td colSpan={13} class="fw-bold fs-14px">RRF 6 : Number of priority districts in UNFPA focus-States where at least 75 per cent of adolescent-friendly health clinics provide adolescent-responsive health and well-being services, as per national guidelines.</td>
           
        </tr>
        <tr className="fs-13px">
            <td>No of AFHCs functional in UNFPA focus states</td>
            <td className="cell-green">683</td>
<td className="cell-green">700</td>
<td className="cell-green">683</td>
<td className="cell-green">700</td>
<td className="cell-green">683</td>
<td className="cell-green">700</td>
<td className="cell-green">683</td>
<td className="cell-green">700</td>
<td className="cell-green">683</td>
<td className="cell-green">700</td>
<td className="cell-green">683</td>
<td className="cell-green">700</td>
        </tr>
        <tr className="fs-13px">
            <td>% of AFHCs in UNFPA priority districts with trained provider to offer adolescent responsive health services</td>
            <td className="cell-green">25</td>
<td className="cell-green">32</td>
<td className="cell-green">25</td>
<td className="cell-green">32</td>
<td className="cell-green">25</td>
<td className="cell-green">32</td>
<td className="cell-green">25</td>
<td className="cell-green">32</td>
<td className="cell-green">25</td>
<td className="cell-green">32</td>
<td className="cell-green">25</td>
<td className="cell-green">32</td>
        </tr>
        <tr className="fs-13px">
            <td>No of adolescent girls receiving counseling, psychosocial support and health services in UNFPA focus states (AFHCs, health facilities, counselling in school, tele- counseling etc).</td>
            <td className="cell-yellow">209950</td>
<td className="cell-yellow">200000</td>
<td className="cell-yellow">209950</td>
<td className="cell-yellow">200000</td>
<td className="cell-yellow">209950</td>
<td className="cell-yellow">200000</td>
<td className="cell-green">209950</td>
<td className="cell-green">220000</td>
<td className="cell-yellow">209950</td>
<td className="cell-yellow">200000</td>
<td className="cell-yellow">209950</td>
<td className="cell-yellow">200000</td>
        </tr>
        <tr className="fs-13px">
            <td>No of adolescent boys receiving counseling, psychosocial support and health services in UNFPA focus states (AFHCs, health facilities, counselling in school, tele- counseling etc).</td>
            <td className="cell-green">204750</td>
<td className="cell-green">205000</td>
<td className="cell-green">204750</td>
<td className="cell-green">205000</td>
<td className="cell-green">204750</td>
<td className="cell-green">205000</td>
<td className="cell-green">204750</td>
<td className="cell-green">205000</td>
<td className="cell-green">204750</td>
<td className="cell-green">205000</td>
<td className="cell-green">204750</td>
<td className="cell-green">205000</td>
        </tr>
       
        <tr>
            <td colSpan={13} className="fw-bold titleorange">Gender and Rights</td>
           
        </tr>
        <tr>
            <td colSpan={13} class="fw-bold fs-14px">RRF 9 : Number of new State policies and strategic action plans that address gender- based violence, harmful practices and discriminatory gender and social norms developed and implemented in UNFPA focus-States.</td>
          
        </tr>
        <tr className="fs-13px">
            <td>Number of participants trained on strengthening the implementation of laws and policies relating to Gender Based Violence</td>
            <td className="cell-green">50</td>
<td className="cell-green">51</td>
<td className="cell-green">50</td>
<td className="cell-green">51</td>
<td className="cell-green">50</td>
<td className="cell-green">51</td>
<td className="cell-green">50</td>
<td className="cell-green">51</td>
<td className="cell-green">50</td>
<td className="cell-green">51</td>
<td className="cell-green">50</td>
<td className="cell-green">51</td>
        </tr>
        <tr className="fs-13px">
            <td>Number of participants trained on the effective implementation of laws, policies and programmes addressing gender biased sex selection</td>
            <td className="cell-yellow">120</td>
<td className="cell-yellow">100</td>
<td className="cell-yellow">120</td>
<td className="cell-yellow">100</td>
<td className="cell-yellow">120</td>
<td className="cell-yellow">100</td>
<td className="cell-yellow">120</td>
<td className="cell-yellow">100</td>
<td className="cell-yellow">120</td>
<td className="cell-yellow">100</td>
<td className="cell-yellow">120</td>
<td className="cell-yellow">100</td>
        </tr>
        <tr className="fs-13px">
            <td>Number of participants trained on strengthening the implementation of laws and policies addressing child marriage and promoting girls&#39; empowerment</td>
            <td className="cell-green">80</td>
<td className="cell-green">90</td>
<td className="cell-green">80</td>
<td className="cell-green">90</td>
<td className="cell-green">80</td>
<td className="cell-green">90</td>
<td className="cell-green">80</td>
<td className="cell-green">90</td>
<td className="cell-green">80</td>
<td className="cell-green">90</td>
<td className="cell-green">80</td>
<td className="cell-green">90</td>
        </tr>
        
        <tr>
            <td colSpan={13} class="fw-bold fs-14px">RRF 10 : Number of UNFPA focus-States where multi-sectoral coordination mechanisms to address gender-based violence are strengthened to function, including in disasters and health emergencies, with UNFPA support.</td>
          
        </tr>
        <tr className="fs-13px">
            <td>Number of service providers capacitated to provide survivor centered GBV and MHPSS services</td>
            <td className="cell-green">325</td>
<td className="cell-green">330</td>
<td className="cell-green">325</td>
<td className="cell-green">330</td>
<td className="cell-green">325</td>
<td className="cell-green">330</td>
<td className="cell-green">325</td>
<td className="cell-green">330</td>
<td className="cell-green">325</td>
<td className="cell-green">330</td>
<td className="cell-green">325</td>
<td className="cell-green">330</td>
        </tr>
      
        <tr>
            <td colSpan={13} class="fw-bold fs-14px">RRF 11 : Number of community-based organizations, civil society organizations, women-led organizations, faith-based organizations and other change agents (including those catering to the most vulnerable populations) whose capacities are strengthened to promote gender-equal social norms to respond to gender-based violence and harmful practices, with UNFPA support.</td>
           
        </tr>
       
        <tr className="fs-13px">
            <td>Number of local actors (e.g. traditional, religious and community leaders) with participation in dialogues and consensus- building to end child marriage and GBSS</td>
            <td className="cell-green">370</td>
<td className="cell-green">380</td>
<td className="cell-green">370</td>
<td className="cell-green">380</td>
<td className="cell-green">370</td>
<td className="cell-green">380</td>
<td className="cell-green">370</td>
<td className="cell-green">380</td>
<td className="cell-green">370</td>
<td className="cell-green">380</td>
<td className="cell-green">370</td>
<td className="cell-green">380</td>
        </tr>
        <tr className="fs-13px">
            <td>Number of CBO/CSO/FBO participants capacitated to promote gender equitable norms and practices</td>
            <td className="cell-yellow">1160</td>
<td className="cell-yellow">1110</td>
<td className="cell-yellow">1160</td>
<td className="cell-yellow">1110</td>
<td className="cell-yellow">1160</td>
<td className="cell-yellow">1110</td>
<td className="cell-yellow">1160</td>
<td className="cell-yellow">1110</td>
<td className="cell-yellow">1160</td>
<td className="cell-yellow">1110</td>
<td className="cell-yellow">1160</td>
<td className="cell-yellow">1110</td>
        </tr>
        <tr className="fs-13px">
            <td>Number of media/communications personnel trained/sensitized to ensure gender sensitive reporting</td>
            <td className="cell-green">175</td>
<td className="cell-green">180</td>
<td className="cell-green">175</td>
<td className="cell-green">180</td>
<td className="cell-green">175</td>
<td className="cell-green">180</td>
<td className="cell-green">175</td>
<td className="cell-green">180</td>
<td className="cell-green">175</td>
<td className="cell-green">180</td>
<td className="cell-green">175</td>
<td className="cell-green">180</td>
        </tr>
        <tr className="fs-13px">
            <td>Number of individuals (girls, boys, women and men) reached by mass media (traditional and social media) messaging on gender, child marriage, the rights of adolescent girls, value of women and girls, and gender equality</td>
            <td className="cell-green">1500000</td>
<td className="cell-green">1600000</td>
<td className="cell-green">1500000</td>
<td className="cell-green">1600000</td>
<td className="cell-green">1500000</td>
<td className="cell-green">1600000</td>
<td className="cell-green">1500000</td>
<td className="cell-green">1600000</td>
<td className="cell-green">1500000</td>
<td className="cell-green">1600000</td>
<td className="cell-green">1500000</td>
<td className="cell-green">1600000</td>
        </tr>
       
        <tr>
            <td colSpan={13} className="fw-bold titleorange">Population Dynamics</td>
          
        </tr>
        <tr>
            <td colSpan={13} class="fw-bold fs-14px">RRF 12 - Number of national and subnational plans, policies and programmes that cite UNFPA-supported research, analytics and evidence for integration of population dynamics and megatrends.</td>
          
        </tr>
       
        <tr className="fs-13px">
            <td>Number of Thematic reports (Ageing and Youth) developed and disseminated</td>
            <td className="cell-green">1</td>
            <td className="cell-green">2</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
        <tr className="fs-13px">
            <td>Number of research studies conducted on emerging population issues (Implications of very low fertility and social norms)</td>
            <td className="cell-yellow">1</td>
            <td className="cell-yellow">0</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td colSpan={13} class="fw-bold fs-14px">RRF 13: Number of training institutions at the national and State levels that integrate demographic intelligence and emerging population issues into their training programmes for government officials.</td>
          
        </tr>
        <tr className="fs-13px">
            <td>Number of government officials at state and district level trained on use of data for planning and monitoring of development plans at local levels</td>
            <td className="cell-yellow">30</td>
            <td className="cell-yellow">29</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
        <tr className="fs-13px">
            <td>Technical support provided to, at least one state level institute, for undertaking state specific research</td>
            <td className="cell-yellow">Yes</td>
            <td className="cell-yellow">No</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
      
      
        <tr>
            <td colSpan={13} class="fw-bold fs-14px">RRF 14 : Number of partnerships established between States in India and with other countries through mutually beneficial South-South cooperation initiatives to implement the ICPD Programme of Action.</td>
           
        </tr>
        <tr className="fs-13px">
            <td>Technical support provided to the MOHFW for completing 2022 Voluntary national survey for seventh asia and pacific conference (APPC) and ICPD+30 processes</td>
            <td className="cell-green">Yes</td>
            <td className="cell-green">Yes</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
       
        <tr>
            <td colSpan={13} class="fw-bold fs-14px">RRF 15 : Number of national and state-level strategies developed and implemented on the demographic dividend, with UNFPA support.</td>
           
        </tr>
        <tr className="fs-13px">
            <td>Sectoral paper to reap benefits of demographic dividend developed and shared with MP State Policy and Planning Commission (MPPC)</td>
            <td className="cell-green">1</td>
            <td className="cell-green">2</td>
        </tr>
    </tbody>
</table>
                                   </div>
                                </TabPanel>
                                <TabPanel value={"Office indicators"} className="thematictabbody">
                                <div className="heatmaptableholder">
                                <table>
    <thead>
        <tr>
            <th></th>
            <th>Target</th>
            <th>Achieved </th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td colSpan={3} className="fw-bold titleorange">Media and Communications</td>
           
        </tr>
        <tr className="fs-13px">
            <td>Number of evidence- based communications collaterals (posters, ppt, speeches, remarks press quotes, press releases, manuals, brochures, reports, films and social media creatives) developed to advocate for SRH/Gender/Youth/Popul ation and Development</td>
            <td className="cell-green">11</td>
            <td className="cell-green">12</td>
        </tr>
        <tr className="fs-13px">
            <td>Followers/subscribers on social media</td>
            <td className="cell-yellow">40000</td>
            <td></td>
        </tr>
        <tr className="fs-13px">
            <td>Number of stories (including web stories, articles and op-eds) published and/or supported by the Communications and Media Unit on SRH/Gender/Youth/ Population and Development</td>
            <td className="cell-green">9</td>
            <td className="cell-green">10</td>
        </tr>
        <tr className="fs-13px">
            <td>Number of media related advocacy interventions ( field visits, workshops, capacity building sessions, meetings with Editors, Government Public relation department at the national and state level in collaboration with thematic units and state offices</td>
            <td className="cell-green">1</td>
            <td className="cell-green">2</td>
        </tr>
       
        <tr>
            <td colSpan={3} className="fw-bold titleorange">Innovations</td>
           
        </tr>
        <tr className="fs-13px">
            <td>Number of training simulation labs established for Midwives for training using cutting edge technology on alternate birthing, AMTSL and PPH management</td>
            <td className="cell-yellow">2</td>
            <td></td>
        </tr>
        <tr className="fs-13px">
            <td>Design and implementation of digital engagement platform for young couples and adults for increasing awareness on social issues and access to SRH services completed</td>
            <td className="cell-green">Yes</td>
            <td className="cell-green">Yes</td>
        </tr>
      
        <tr>
            <td colSpan={3} className="fw-bold titleorange">Results Based Management</td>
           
        </tr>
        <tr className="fs-13px">
            <td>Reporting of monitoring indicators / milestones in GPS and SIS completed on time</td>
            <td className="cell-yellow">Yes</td>
            <td className="cell-yellow">No</td>
        </tr>
        <tr className="fs-13px">
            <td>Donor reports uploaded into DARTs on time for all non core funded projects</td>
            <td className="cell-yellow">Yes</td>
            <td className="cell-yellow">No</td>
        </tr>
        <tr className="fs-13px">
            <td>A comprehensive monitor system developed for better tracking of program results, indicators including recommendations from field visits.</td>
            <td className="cell-green">Yes</td>
            <td className="cell-green">Yes</td>
        </tr>
       
        <tr>
            <td colSpan={3} className="fw-bold titleorange">Post Nairobi Followup</td>
            
        </tr>
        <tr className="fs-13px">
            <td>Voluntary national survey for the 7th APPC completed on time with UNFPA support</td>
            <td className="cell-yellow">Yes</td>
            <td className="cell-yellow">No</td>
        </tr>
       
        <tr>
            <td colSpan={3} className="fw-bold titleorange">Strengthening the Structure and Capacity of UNFPA staff</td>
          
        </tr>
        <tr className="fs-13px">
            <td>Mandatory e-training courses recommended by the HQ completed by all staff</td>
            <td className="cell-green">Yes</td>
            <td className="cell-green">Yes</td>
        </tr>
        <tr className="fs-13px">
            <td>Checklist based induction plan developed and implemented for all new staff</td>
            <td className="cell-yellow">Yes</td>
            <td className="cell-yellow">No</td>
        </tr>
        <tr className="fs-13px">
            <td>Staff development and learning plan developed and implemented</td>
            <td className="cell-green">Yes</td>
            <td className="cell-green">Yes</td>
        </tr>
       
        <tr>
            <td colSpan={3} className="fw-bold titleorange">Actions implemented to prevent and respond to sexual, exploitation, abuse and harassment</td>
           
        </tr>
        <tr className="fs-13px">
            <td>A PSEA focal point designated in line with UNFPA’s terms of reference for Focal Points</td>
            <td className="cell-green">Yes</td>
            <td className="cell-green">Yes</td>
        </tr>
        <tr className="fs-13px">
            <td>Mandatory regular training on sexual exploitation and abuse and sexual harassment</td>
            <td className="cell-yellow">Yes</td>
            <td className="cell-yellow">No</td>
        </tr>
       
        <tr>
            <td colSpan={3} className="fw-bold titleorange">UN Coordination</td>
            
        </tr>
        <tr className="fs-13px">
            <td>Participation in relevant UNSDF support groups set up by UNCT in India (e.g. M&amp;E, Data for Development, Communications, Finance, OMT etc.)</td>
            <td className="cell-yellow">Yes</td>
            <td className="cell-yellow">No</td>
        </tr>
        <tr className="fs-13px">
            <td>Participated and contributed towards relevant results group of UNSDF (Health and Well being; Quality Education; Economic growth and decent work; Environment, climate, WASH and resilience, Empowering people, communities and institutions)</td>
            <td className="cell-green">Yes</td>
            <td className="cell-green">Yes</td>
        </tr>
        <tr className="fs-13px">
            <td>Co-Chaired Outcome 1 on Health and Well being and Outcome 6 group on Empowering people, communities and institutions and contributed towards joint planning and reporting</td>
            <td className="cell-yellow">Yes</td>
            <td className="cell-yellow">No</td>
        </tr>
       
      
       
        <tr>
            <td colSpan={3} className="fw-bold titleorange">Partnership and alliances built for advancing ICPD mandate</td>
           
        </tr>
        <tr className="fs-13px">
            <td>New partnerships/alliances with youth-led, women-led civil society movements, FBOs and organizations working for and with persons with disabilities and other vulnerable groups.</td>
            <td className="cell-green">2</td>
            <td className="cell-green">3</td>
        </tr>
        <tr className="fs-13px">
            <td>New partnerships developed and formalized through MOUs/ co- financing to support India Country Programme</td>
            <td className="cell-green">2</td>
            <td className="cell-green">3</td>
        </tr>
      
        <tr>
            <td colSpan={3} className="fw-bold titleorange">Office effectiveness and efficiency</td>
           
        </tr>
        <tr className="fs-13px">
            <td>Number of SOPs developed to streamline critical functions in CO.</td>
            <td className="cell-yellow">8</td>
            <td></td>
        </tr>
        <tr className="fs-13px">
            <td>Quarterly review of SIS dashboard indicators</td>
            <td className="cell-green">Yes</td>
            <td className="cell-green">Yes</td>
        </tr>
      
        <tr>
            <td colSpan={3} className="fw-bold titleorange">Minimum preparedness</td>
           
        </tr>
        <tr className="fs-13px">
            <td>MPA6: Strengthen humanitarian partnerships</td>
            <td className="cell-yellow">Yes</td>
            <td className="cell-yellow">No</td>
        </tr>
       
        <tr>
            <td colSpan={3} className="fw-bold titleorange">Planned core and co-financing resources mobilized</td>
           
        </tr>
        <tr className="fs-13px">
            <td>Number of proposal / concept note submitted for resource mobilization)</td>
            <td className="cell-yellow">4</td>
            <td></td>
        </tr>
        <tr className="fs-13px">
            <td>Number of proposals successful in mobilizing resources</td>
            <td className="cell-yellow">2</td>
            <td></td>
        </tr>
       
        <tr>
            <td colSpan={3} className="fw-bold titleorange">Sustainable management practices and reduction of GHG emissions</td>
           
        </tr>
        <tr className="fs-13px">
            <td>Submitting data for the Greenhouse Gas Inventory by Q2 of current year</td>
            <td className="cell-yellow">Yes</td>
            <td className="cell-yellow">No</td>
        </tr>
       
        <tr>
            <td colSpan={3} className="fw-bold titleorange">Ensure safety and security of UNFPA personnel and operations</td>
          
        </tr>
        <tr className="fs-13px">
            <td>Review and provide comments on security policy documents prior to approval by the Security Management Team (SMT), seeking technical advice from the Regional Security Adviser (RSA): a. Security Risk Management Measures (SRMM)/MOSS; b. Locally Cost Shared Security Budgets (LCSSB); c. Residential Security Measures (RSM), and d. Security portion of common premises budgets</td>
            <td className="cell-yellow">Yes</td>
            <td className="cell-yellow">No</td>
        </tr>
        <tr className="fs-13px">
            <td>Organize a learning session to review individuals&#39; roles and responsibilities in relation to the Business Continuity Policy</td>
            <td className="cell-green">Yes</td>
            <td className="cell-green">Yes</td>
        </tr>
        <tr className="fs-13px">
            <td>Personal profiles in the Global Directory are complete and verified by all office personnel</td>
            <td className="cell-yellow">Yes</td>
            <td className="cell-yellow">No</td>
        </tr>
    </tbody>
</table>
                                </div>
                                   </TabPanel>
                </TabContext>
                
            </div>
            
            <Footer />
        </>
    );
}

export default ProgressOverview;
