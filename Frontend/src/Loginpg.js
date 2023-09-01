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
import { settoken, setdata } from './Reducers/appReducer';
import Footer from './Footer';

export default function Loginpg(props) {
    const { window } = props;
    const [name, setname] = React.useState('');
    const [pass, setpass] = React.useState('')
    const [userotp,setuserotp] = React.useState('')
    const [otpvis,setotpvis] = React.useState(false)
    const [usertoken,setusertoken] = React.useState('')
    const [userdata,setuserdata] = React.useState({})
    const [errortxt, seterrortxt] = React.useState('')
    const [otperrtxt,setotperrtxt] = React.useState('')
    const dispatch = useDispatch()

    const navigate = useNavigate();

    function Login() {
        if (name.length > 0 && pass.length > 0) {
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
                    
                    setusertoken(response.data.token)
                    let config = {
                        method: 'get',
                        maxBodyLength: Infinity,
                        url: 'https://kf.rbmgateway.org/me/',
                        headers: {
                            'Authorization': 'Token ' + response.data.token
                        }
                    };

                    axios.request(config)
                        .then((response) => {
                            // console.log("me",response.data)
                            // sessionStorage.setItem("user",JSON.stringify(response.data))
                            // dispatch(setdata(JSON.stringify(response.data)))
                            //     navigate('/dashboard')
                            setuserdata(response.data)
                            sendOTP(response.data)
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                })
                .catch((error) => {
                    seterrortxt("Please enter valid credentials")
                });
        } else {
            seterrortxt("Please enter valid credentials")
        }
    }

    function sendOTP(responsedata){
            axios({
                method: 'post',
                // url: 'http://localhost:8080/generateotp',
                url: 'https://service.rbmgateway.org/generateotp',
                headers: {},
                data: {
                  "email": responsedata.email,
                }
              })
              .then(
                  response => {
                    if(response.status==200){
                        setotpvis(true)
                    }else{
                        seterrortxt("Please enter valid credentials") 
                    }
                    // console.log(response)
                    
                  }
              ).catch((err) => {console.log(err)
                                seterrortxt(err.response.data.message)
                                });
    }

    function validateOTP(){
        
        axios({
            method: 'post',
            // url: 'http://localhost:8080/login',
            url: 'https://service.rbmgateway.org/login',
            headers: {},
            data: {
              "email": userdata.email,
              "OTP":userotp
            }
          })
          .then(
              response => {
                if(response.data.message=="User logged in successfully"){
                    // console.log("resp",response.data)
                    localStorage.setItem('token', usertoken)
                    dispatch(settoken(usertoken))
                    localStorage.setItem("user", JSON.stringify(userdata))
                    dispatch(setdata(JSON.stringify(userdata)))
                    navigate('/dashboard')                
                }else{
                    setotperrtxt("Please enter valid OTP")
                    // setotpvis(false) 
                }
                
              }
          ).catch((err) => {console.log(err)
            setotperrtxt(err.response.data.message)
            // setotpvis(false)
                            });

            
    }


    return (
        <Box sx={{ display: 'flex' }}>
            <Appnavbar navItems={{ "form": false, "supchck": false, "dashboard": false }} />
            <Box component="main" className='MainContainer loginpage' sx={{ p: 0, width: '100%' }}>
                <Toolbar />
                <Grid container spacing={2} className='loginpagemaindiv'>
                    {/* <Grid item xs={3} className='Logocontainer'>
                        <div className='Logodiv'></div>
                    </Grid> */}

                    <Grid item xs={12}>
                        <p className='applicationtitle'>Welcome to the RBM Gateway of UNFPA's India Country Office</p>
                        <Card sx={{ maxWidth: "50%", margin: "0 auto", marginTop: "0px" }}>
                            {/* <p className='formtitle '>Login</p> */}
                            <CardContent>

                                {/* <p className='formsubtitle text-left'>Fill your details to log in</p> */}
                                <p className='loginfielddiv'>
                                    <p className='formsubtitle text-left'>Username</p>
                                    <TextField id="outlined-basic" variant="outlined" type='text' value={name} disabled={otpvis} onChange={e => setname(e.target.value)} />
                                </p>
                                <p className='loginfielddiv'>
                                    <p className='formsubtitle text-left'>Password</p>
                                    <TextField id="outlined-basic" variant="outlined" type='password' value={pass} disabled={otpvis} onChange={e => setpass(e.target.value)} helperText={errortxt}
                                    />
                                </p>
                                <p className={otpvis?'loginfielddiv':'hidden'}>
                                    <p className='formsubtitle text-left'>Please enter OTP</p>
                                    <TextField id="outlined-basic" variant="outlined" type='text' value={userotp} onChange={e => setuserotp(e.target.value)} helperText={otperrtxt}
                                    />
                                </p>
                                <p>
                                    <Button variant="outlined" className='submitbtn mt-10px' onClick={!otpvis?Login:validateOTP}>Submit</Button>
                                </p>
                            </CardContent>

                        </Card>
                    </Grid>
                </Grid>
                <Footer />
            </Box>

        </Box>
    );
}
