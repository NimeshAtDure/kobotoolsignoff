import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Grid } from '@mui/material';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import CardContent from '@mui/material/CardContent';
import axios from "axios";
import Appnavbar from './Appnavbar';
import Footer from './Footer';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


export default function Passreset(props) {
    const { window } = props;
    const [prevpass, setprevpass] = React.useState(null);
    const [newpass, setnewpass] = React.useState(null)
    const [confpass, setconfpass] = React.useState(null)
    const [errortxt, seterrortxt] = React.useState('')
    const [open,setopen] = React.useState(false)

    function Reset() {
        if (prevpass && newpass && confpass && (newpass == confpass)) {
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: 'https://kf.rbmgateway.org/me/?current_password=' + prevpass  + '&new_password=' + newpass ,
                headers: {
                    'Authorization': 'Token' + sessionStorage.getItem("token")
                }
            };

            axios.request(config)
                .then((response) => {
                    console.log(JSON.stringify(response.data));
                    setopen(true)
                })
                .catch((error) => {
                    console.log("getRequest err>>", error);
                    seterrortxt("Please enter valid password")
                });
        } else {
            seterrortxt("Please enter valid password")
        }
    }

    const handleClose = () => setopen(false);

    return (
        <Box sx={{ display: 'flex' }}>
            <Appnavbar navItems={{ "form": false, "supchck": false, "dashboard": false,"progoverview":true }} />
            <Box component="main" className='MainContainer ' sx={{ p: 0, width: '100%' }}>
                <Toolbar />
                <Grid container spacing={2} className='resetpassmaindiv'>
                    {/* <Grid item xs={3} className='Logocontainer'>
                        <div className='Logodiv'></div>
                    </Grid> */}

                    <Grid item xs={12}>
                        <p className='applicationtitle'></p>
                        <Card sx={{ maxWidth: "50%", margin: "0 auto", marginTop: "0px" }}>
                            <p className='formtitle '>Reset Password</p>
                            <CardContent>

                                {/* <p className='formsubtitle text-left'>Fill your details to log in</p> */}
                                <p className='loginfielddiv'>
                                    <p className='formsubtitle text-left'>Current Password</p>
                                    <TextField id="outlined-basic" variant="outlined" type='password' value={prevpass} onChange={e => setprevpass(e.target.value)} />
                                </p>
                                <p className='loginfielddiv'>
                                    <p className='formsubtitle text-left'>New Password</p>
                                    <TextField id="outlined-basic" variant="outlined" type='password' value={newpass} onChange={e => setnewpass(e.target.value)} helperText={errortxt} />
                                </p>
                                <p className='loginfielddiv'>
                                    <p className='formsubtitle text-left'>Verify Password</p>
                                    <TextField id="outlined-basic" variant="outlined" type='password' value={confpass} onChange={e => setconfpass(e.target.value)} helperText={errortxt} />
                                </p>
                                <p>
                                    <Button variant="outlined" className='submitbtn mt-10px' onClick={Reset}>Save Password</Button>
                                </p>
                            </CardContent>

                        </Card>
                    </Grid>
                </Grid>
                <Footer />
            </Box>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Password reset successful !!!
                    </Typography>
                </Box>
            </Modal>
        </Box>
    );
}