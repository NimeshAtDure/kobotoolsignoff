import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Grid } from '@mui/material';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import CardContent from '@mui/material/CardContent';
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import Appnavbar from './Appnavbar';
import { useSelector, useDispatch } from 'react-redux'
import { settoken } from './Reducers/appReducer';

export default function Loginpg(props) {
    const { window } = props;
    const [name, setname] = React.useState('');
    const [pass, setpass] = React.useState('')
    const [errortxt,seterrortxt] = React.useState('')
    const count = useSelector((state) => state.token.value)
    const dispatch = useDispatch()

    const navigate = useNavigate();

    function Login(){
        if(name.length>0 && pass.length>0){
            axios({
                method: "get",
                url: "https://kf.rbmgateway.org/token/?format=json",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": 'Basic ' + btoa(name + ':' + pass)
                }
            })
                .then((response) => {
                    seterrortxt("")
                    sessionStorage.setItem('token',response.data.token)
                    dispatch(settoken(response.data.token))
                    navigate('/home')
                })
                .catch((error) => {
                    console.log("getRequest err>>", error);
                    seterrortxt("Please enter valid credentials")
                });
        }else{
            seterrortxt("Please enter complete credentials")
        }
        }


    return (
        <Box sx={{ display: 'flex' }}>
            <Appnavbar/>
            <Box component="main" className='MainContainer' sx={{ p: 0, width: '100%' }}>
                <Toolbar />
                <Grid container spacing={2} className='loginpagemaindiv'>
                    {/* <Grid item xs={3} className='Logocontainer'>
                        <div className='Logodiv'></div>
                    </Grid> */}
                    <Grid item xs={12}>
                        <Card sx={{ maxWidth:"50%", margin:"0 auto", marginTop:"0px" }}>
                        <p className='formtitle '>Login</p>
                            <CardContent>
                           
                            <p className='formsubtitle text-left'>Fill your details to log in</p>
                    <p className='loginfielddiv'> 
                            <TextField id="outlined-basic" label="Username" variant="outlined" type='text' value={name} onChange={e=>setname(e.target.value)}/>
                    </p>
                    <p className='loginfielddiv'>
                            <TextField id="outlined-basic" label="Password" variant="outlined" type='password' value={pass}onChange={e=>setpass(e.target.value)}  helperText={errortxt}
/>
                            </p>
                            <p>
                            <Button variant="outlined" className='viewbtn mt-10px' onClick={Login}>Submit</Button>
                            </p>
                            </CardContent>
                           
                        </Card>
                    </Grid>
                </Grid>
            </Box>

        </Box>
    );
}