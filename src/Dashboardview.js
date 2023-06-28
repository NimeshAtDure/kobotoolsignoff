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
        id: "631bd270-0ed5-4c44-9d5b-5d243944b46f",  // given by the Superset embedding UI
        supersetDomain: "https://data.rbmgateway.org",
        mountPoint: document.getElementById("superset-container"), // html element in which iframe render
        fetchGuestToken: () => authToken,
        dashboardUiConfig: { 
          hideTitle: true,
          filters: {
              expanded: false,
          }
        }
        });
    }, [authToken]);
    


    const fetchGuestAuthToken1 = async () => {
      axios({
        method: 'post',
        url: 'https://dashboard.rbmgateway.org:8088/api/v1/security/guest_token/',
        headers: {},
        data: {
          "user": {
            "username": "guestuser",
            "first_name": "guestuser",
            "last_name": "guestuser"
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
            console.log(response.data.token)
            setAuthToken(response.data.token)
            
          }
      ).catch((err) => {console.log(err)});
  }

    const fetchGuestAuthToken = async (token) => {
        axios({
          method: 'post',
          url: 'https://data.rbmgateway.org/api/v1/security/guest_token/',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          data: {
            "user": {
              "username": "embed_dashboard",
              "first_name": "embed",
              "last_name": "dashboard"
            },
            "resources": [
              {
                "type": "dashboard",
                "id": "23"
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
        url: 'https://data.rbmgateway.org/api/v1/security/login',
        headers: {},
        data: {
          "username": "admin",
          "password": "c41z$#D$^GFMO]E)", 
          "provider": "db",
          "refresh": true,
        }
      })
      .then(
          response => {
            setUserAuthToken(response.data.access_token)
            //console.log(response)
            fetchGuestAuthToken(response.data.access_token)
          }
      ).catch((err) => {console.log(err)});
  }

    return (
        <div className="App">
            <Appnavbar navItems={{"forms":true,"supchck":true,"dashboard":true}} />
            <div id="superset-container"></div>
        </div>
    );
}

export default Dashboardview;
