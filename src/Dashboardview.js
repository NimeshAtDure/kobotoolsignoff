import axios from "axios";
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import { Navigate, useNavigate } from "react-router-dom";
import Appnavbar from "./Appnavbar";
import './App.css';
import { useEffect, useState } from "react";


function Dashboardview() {

    
    const navigate = useNavigate();

    

    const navItems = (
        <List>
            <Button variant="outlined" className='viewbtn mt-0 dbbutton' onClick={()=>navigate("/home")}>Home</Button>
        </List>
    );

    return (
        <div className="App">
            <Appnavbar navItems={navItems} />
        </div>
    );
}

export default Dashboardview;
