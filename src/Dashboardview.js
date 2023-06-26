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
    const [userAuthToken, setUserAuthToken] = useState(undefined);

    useEffect(()=> {
        fetchUserAuthToken()
        //fetchGuestAuthToken()
    },[])

    useEffect(() => {
        authToken && embedDashboard({
        id: "292f1292-faae-428a-a202-db1612d513e7",  // given by the Superset embedding UI
        supersetDomain: "http://dashboard.rbmgateway.org:8088",
        mountPoint: document.getElementById("superset-container"), // html element in which iframe render
        fetchGuestToken: () => authToken,
        dashboardUiConfig: { hideTitle: true }
        });
    }, [authToken]);
    
    const fetchGuestAuthToken = async (token) => {
        axios({
          method: 'post',
          url: 'http://dashboard.rbmgateway.org:8088/api/v1/security/guest_token/',
          headers: {
            'Authorization': `Bearer ${token}`

          },
          data: {
            "user": {
              "username": "saswatidas",
              "first_name": "Saswati",
              "last_name": "Das"
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
        ).catch((err) => {console.log(err)});
    }

    const fetchUserAuthToken = async () => {
      axios({
        method: 'post',
        url: 'http://dashboard.rbmgateway.org:8088/api/v1/security/login',
        headers: {},
        data: {
          "password": "w56gT5PBblJgt5", 
          "provider": "db",
          "refresh": true,
          "username": "admin"
        }
      })
      .then(
          response => {
            setUserAuthToken(response.data.access_token)
            console.log(response)
            fetchGuestAuthToken(response.data.access_token)
          }
      ).catch((err) => {console.log(err)});
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
