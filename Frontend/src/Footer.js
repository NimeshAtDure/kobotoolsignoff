import { Grid } from '@mui/material';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';

export default function Footer(){
    return (
        <Grid container spacing={2} className='footerbg'>
                {/* <Grid item xs={6} md={3} sm={3}>
                    <div className='footerlogo'></div>
                   
                </Grid>
                <Grid item xs={12} md={3} sm={3}>
                <Grid container spacing={2} className=''>
                <Grid item xs={4}> <p className='copyright pt-0px'> Follow us</p></Grid>
                <Grid item xs={8} className='sociallogoholder'>
                <a href='https://twitter.com/UNFPAIndia' target='_blank'><TwitterIcon></TwitterIcon></a>
                    <a href="https://www.facebook.com/unfpaindia"  target='_blank'><FacebookIcon></FacebookIcon></a>
                    <a href="https://www.youtube.com/channel/UCaktHdd02Iyl1nfePglvAuw" target='_blank'><YouTubeIcon></YouTubeIcon></a>
                    <a href="https://www.instagram.com/unfpaindia/" target='_blank'><InstagramIcon></InstagramIcon></a>
                </Grid>
                </Grid>
                   
               
                </Grid>
                <Grid item xs={12} md={3} sm={3}>
                    <a href='https://www.unfpa.org/donate#india' target='_blank' className='donatelink'><span className='donatelogo'></span>
                    <span className='donatetext'>Donate</span>
                    </a>
                </Grid> */}
                
                <Grid item xs={12} md={3} sm={3} className="pt-0px">
                <p className='copyright pt-0px'> © All rights reserved. 2023</p>
                </Grid>
                </Grid>
    )
}