import * as React from 'react';
import Appnavbar from './Appnavbar';
import Footer from './Footer';
import Box from '@mui/material/Box';

export default function Formdisp() {
    var link = window.location.pathname.split("/")
    console.log(link[link.length-1])
    return (
        <Box sx={{ display: 'flex' }}>
            <Appnavbar navItems={{ "forms": true, "supchck": true, "dashboard": true, "progoverview": true }} />
            <Box component="main" className='MainContainer' sx={{ p: 0, width: '100%' }}>
                {link.length>0?<iframe src={"https://ee.rbmgateway.org/x/"+link[link.length-1]} width="100%" height="100%" />:""}
                <Footer />
            </Box>
        </Box>
    )
}