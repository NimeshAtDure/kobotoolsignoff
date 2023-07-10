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
        id: "5ee5fc80-6b83-46df-9947-2fd23ee76f92",  // given by the Superset embedding UI
        supersetDomain: "http://52.167.160.109:8088",
        mountPoint: document.getElementById("superset-container"), // html element in which iframe render
        fetchGuestToken: () => authToken,
        dashboardUiConfig: { hideTitle: true }
        });
    }, [authToken]);
    
    const fetchGuestAuthToken = async () => {
        axios({
          method: 'post',
          url: 'http://52.167.160.109:8088/api/v1/security/guest_token/',
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
                "id": "24"
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

    return (
        <div className="App">
            <Appnavbar navItems={{"forms":true,"supchck":true,"dashboard":false}} />
            <div id="superset-container"></div>
        </div>
    );
}

export default Dashboardview;
