import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import { Navigate, useNavigate } from "react-router-dom";
import { embedDashboard } from "@superset-ui/embedded-sdk"
import Appnavbar from "./Appnavbar";
import './App.css';

function Dashboardview() {

    const navigate = useNavigate();
    const [authToken, setAuthToken] = useState(undefined);

    useEffect(()=> {
        fetchGuestAuthToken()
    },[])

    useEffect(() => {
        authToken && embedDashboard({
        id: "c37c7eee-c816-47ac-8cc2-40ecd3f2cb18",  // given by the Superset embedding UI
        supersetDomain: "http://dashboard.rbmgateway.org:8088",
        mountPoint: document.getElementById("superset-container"), // html element in which iframe render
        fetchGuestToken: () => authToken,
        dashboardUiConfig: { hideTitle: true }
        });
    }, [authToken]);
    
    const fetchGuestAuthToken = async () => {
        axios({
          method: 'post',
          url: 'http://dashboard.rbmgateway.org:8088/api/v1/security/guest_token/',
          headers: {},
          data: {
            "user": {
              "username": "RBM_User",
              "first_name": "Superset",
              "last_name": "Admin"
            },
            "resources": [
              {
                "type": "dashboard",
                "id": "11"
              }
            ],
            "rls": []
          }
        })
        .then(
            response => {
              setAuthToken(response.data.token)
              console.log(response.data.token)
            }
        )
    }

    const navItems = (
        <List>
            <Button variant="outlined" className='viewbtn mt-0 dbbutton'><a href={"https://ee.rbmgateway.org/x/QCgXLb2v"} target="_blank">Supervision Checklist</a></Button>
            <Button variant="outlined" className='viewbtn mt-0 dbbutton' onClick={()=>navigate("/home")}>View Forms</Button>
        </List>
    );

    return (
        <div className="App">
            <Appnavbar navItems={navItems} />
            <div id="superset-container"></div>
        </div>
    );
}

export default Dashboardview;
