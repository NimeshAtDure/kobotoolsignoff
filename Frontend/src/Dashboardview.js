import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TableContainer from '@mui/material/TableContainer';
import { Navigate, useNavigate } from "react-router-dom";
import { embedDashboard } from "@superset-ui/embedded-sdk"
import Appnavbar from "./Appnavbar";
import './App.css';
import Footer from "./Footer";

function Dashboardview() {

  const navigate = useNavigate();
  const [authToken, setAuthToken] = useState(undefined);
  const [userAuthToken, setUserAuthToken] = useState(undefined);
  const [value,setValue] = useState('sis')

  useEffect(() => {
    fetchUserAuthToken()
    //fetchGuestAuthToken()
  }, [value])

  useEffect(() => {
    authToken && embedDashboard({
      id: value=='sis'?"29dd17cf-0317-42bc-a242-d78d7150d7a1":value=='cpap'?"80a70b83-3c5c-4e69-9eb3-7df1d0e93b84":"3f042b6f-39e9-42ca-9608-370aff8ea110",  // given by the Superset embedding UI
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
  }, [authToken,value]);



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
      ).catch((err) => { console.log(err) });
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
            "id": value=='sis'?"38":value=='cpap'?"40":"42"
          }
        ],
        "rls": []
      }
    })
      .then(
        response => {
          setAuthToken(response.data.token)
          // console.log(response.data.token)
        }
      ).catch((err) => { console.log(err) });
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
      ).catch((err) => { console.log(err) });
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
    
  };

  return (
    <div className="AppDashb">
      <Appnavbar navItems={{ "forms": true, "supchck": true, "dashboard": true, "progoverview": true }} />
      <Box sx={{ width: '100%' }} className="dashboardNav">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="label tabs example"
        >
          <Tab
            value="sis"
            label="SIS"
          />
          <Tab value="cpap" label="CPAP" />
          <Tab value="rrf" label="RRF" />
        </Tabs>
      </Box>
      <div id="superset-container"></div>
      <Footer />
    </div>
  );
}

export default Dashboardview;
