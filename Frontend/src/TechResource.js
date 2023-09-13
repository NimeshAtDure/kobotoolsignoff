import React from "react";
import Footer from "./Footer";
import Appnavbar from "./Appnavbar";
import { Grid } from '@mui/material';
import imgurl from "./Assets/imgurl";

function TechResource(){

    return(
        
        <div className="App ">
            <Appnavbar navItems={{ "forms": true, "supchck": true, "dashboard": true, "progoverview": true }} />
            <div className="techrespage">
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                className="contentgrid"
                >
                    <Grid item xs={12}><a href="https://sites.google.com/unfpa.org/india-mymne/home" target="_blank">Gateway of monitoring and evaluation of UNFPA interventions of its Ninth Country programme (2018-22) in India</a></Grid>
                    
                </Grid>
                <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                className="contentgrid"
                >
                    <Grid item xs={12}>UNSDCF</Grid>
                    <Grid item xs={3}>
                    <a href="https://docs.google.com/document/d/1Raabf93YGaMnoOoHkM87alXoYzBWcWuq/edit?usp=drive_link" target="_blank"><img src={imgurl.UNSDCF_doc1} alt="" width={"200px"} height={"200px"}/></a>
                    </Grid>
                    <Grid item xs={3}>
                    <a href="https://drive.google.com/file/d/1RgKQdBQxgEgLmZhnpdCvlMgbVcSEC4uN/view?usp=drive_link" target="_blank"><img src={imgurl.UNSDCF_pdf1} alt="" width={"200px"} height={"200px"}/></a>
                    </Grid>
                    <Grid item xs={3}>
                    <a href="https://drive.google.com/file/d/1R_T7k8tX2udVoDkxt6Lv9UcOQ9eLPD3H/view?usp=drive_link" target="_blank"><img src={imgurl.UNSDCF_pdf2} alt="" width={"200px"} height={"200px"}/></a>
                    </Grid>
                    <Grid item xs={3}>
                    <a href="https://docs.google.com/presentation/d/1TAEuux81hos4dx_-cqYhXDcsbKds-N-Z/edit?usp=drive_link&ouid=103835026252578494410&rtpof=true&sd=true" target="_blank"><img src={imgurl.UNSDCF_ppt1} alt="" width={"200px"} height={"200px"}/></a>
                    </Grid>
                </Grid>
                <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                className="contentgrid"
                >
                    <Grid item xs={12}>Management Response to CPE</Grid>
                    <Grid item xs={6}>
                    <a href="https://docs.google.com/spreadsheets/d/1SRrBmXcYjXqYk2lbSrOaj2hwiB7mqTXZ/edit?usp=drive_link&ouid=103835026252578494410&rtpof=true&sd=true" target="_blank"><img src={imgurl.Management_Response_to_CPE_xls1} alt="" width={"200px"} height={"200px"}/></a>
                    </Grid>
                    <Grid item xs={6}>
                    <a href="https://docs.google.com/spreadsheets/d/1SACWPRI93Bg4LtIqGrHZlyBHBgRML0hs/edit?usp=drive_link&ouid=103835026252578494410&rtpof=true&sd=true" target="_blank"><img src={imgurl.Management_Response_to_CPE_xls2} alt="" width={"200px"} height={"200px"}/></a>
                    </Grid>
                    
                </Grid>
                
                <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                className="contentgrid"
                >
                    <Grid item xs={12}>SIS Guidance Document</Grid>
                    <Grid item xs={4}>
                    <a href="https://docs.google.com/document/d/1SA226hPB9yZ03deZ-7Hqo31NIwgMJlh2/edit?usp=drive_link&ouid=103835026252578494410&rtpof=true&sd=true" target="_blank"><img src={imgurl.sis_guidance_doc1} alt="" width={"200px"} height={"200px"}/></a>
                    </Grid>
                    <Grid item xs={4}>
                    <a href="https://docs.google.com/document/d/1S7yWqWUppWxmbizHQD-lcl2QO3sdAJCe/edit?usp=drive_link&ouid=103835026252578494410&rtpof=true&sd=true" target="_blank"><img src={imgurl.sis_guidance_doc2} alt="" width={"200px"} height={"200px"}/></a>
                    </Grid>
                    <Grid item xs={4}>
                    <a href="https://docs.google.com/document/d/1S6083_v6zwt2fDHJOOzRzQLjTAMRnQue/edit?usp=drive_link&ouid=103835026252578494410&rtpof=true&sd=true" target="_blank"><img src={imgurl.sis_guidance_doc3} alt="" width={"200px"} height={"200px"}/></a>
                    </Grid>
                    <Grid item xs={6}>
                    <a href="https://drive.google.com/file/d/1S2FSYiqzFOcmOECqm_zNFaz54ia1e3Xq/view?usp=drive_link" target="_blank"><img src={imgurl.sis_guidance_pdf1} alt="" width={"200px"} height={"200px"}/></a>
                    </Grid>
                    <Grid item xs={6}>
                    <a href="https://drive.google.com/file/d/1RnlnyIltPG7-_D3TddTs-ehWtRWk01ku/view?usp=drive_link" target="_blank"><img src={imgurl.sis_guidance_pdf2} alt="" width={"200px"} height={"200px"}/></a>
                    </Grid>
                    
                    <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                className="contentgrid"
                >
                    <Grid item xs={12}>SIS Guidance Document</Grid>
                    <Grid item xs={3}>
                    <a href="https://docs.google.com/document/d/1SA226hPB9yZ03deZ-7Hqo31NIwgMJlh2/edit?usp=drive_link&ouid=103835026252578494410&rtpof=true&sd=true" target="_blank"><img src={imgurl.sis_guidance_doc1} alt="" width={"200px"} height={"200px"}/></a>
                    </Grid>
                    <Grid item xs={3}>
                    <a href="https://docs.google.com/document/d/1S7yWqWUppWxmbizHQD-lcl2QO3sdAJCe/edit?usp=drive_link&ouid=103835026252578494410&rtpof=true&sd=true" target="_blank"><img src={imgurl.sis_guidance_doc2} alt="" width={"200px"} height={"200px"}/></a>
                    </Grid>
                    <Grid item xs={3}>
                    <a href="https://docs.google.com/document/d/1S6083_v6zwt2fDHJOOzRzQLjTAMRnQue/edit?usp=drive_link&ouid=103835026252578494410&rtpof=true&sd=true" target="_blank"><img src={imgurl.sis_guidance_doc3} alt="" width={"200px"} height={"200px"}/></a>
                    </Grid>
                    <Grid item xs={3}>
                    <a href="https://drive.google.com/file/d/1S2FSYiqzFOcmOECqm_zNFaz54ia1e3Xq/view?usp=drive_link" target="_blank"><img src={imgurl.sis_guidance_pdf1} alt="" width={"200px"} height={"200px"}/></a>
                    </Grid>
                    <Grid item xs={3}>
                    <a href="https://drive.google.com/file/d/1RnlnyIltPG7-_D3TddTs-ehWtRWk01ku/view?usp=drive_link" target="_blank"><img src={imgurl.sis_guidance_pdf2} alt="" width={"200px"} height={"200px"}/></a>
                    </Grid>
                    <Grid item xs={3}>
                    <a href="https://drive.google.com/file/d/1RnlnyIltPG7-_D3TddTs-ehWtRWk01ku/view?usp=drive_link" target="_blank"><img src={imgurl.sis_guidance_pdf2} alt="" width={"200px"} height={"200px"}/></a>
                    </Grid>
                    <Grid item xs={3}>
                    <a href="https://drive.google.com/file/d/1RnlnyIltPG7-_D3TddTs-ehWtRWk01ku/view?usp=drive_link" target="_blank"><img src={imgurl.sis_guidance_pdf2} alt="" width={"200px"} height={"200px"}/></a>
                    </Grid>
                    <Grid item xs={3}>
                    <a href="https://drive.google.com/file/d/1RnlnyIltPG7-_D3TddTs-ehWtRWk01ku/view?usp=drive_link" target="_blank"><img src={imgurl.sis_guidance_pdf2} alt="" width={"200px"} height={"200px"}/></a>
                    </Grid>
                    
                </Grid>

                <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                className="contentgrid"
                >
                    <Grid item xs={12}>SIS Guidance Document</Grid>
                    
                    <Grid item xs={12}>
                    <a href="https://drive.google.com/file/d/1RnlnyIltPG7-_D3TddTs-ehWtRWk01ku/view?usp=drive_link" target="_blank"><img src={imgurl.sis_guidance_pdf2} alt="" width={"200px"} height={"200px"}/></a>
                    </Grid>
                    
                </Grid>

                <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                className="contentgrid"
                >
                    <Grid item xs={12}>SIS Guidance Document</Grid>
                    
                    <Grid item xs={6}>
                    <a href="https://drive.google.com/file/d/1S2FSYiqzFOcmOECqm_zNFaz54ia1e3Xq/view?usp=drive_link" target="_blank"><img src={imgurl.sis_guidance_pdf1} alt="" width={"200px"} height={"200px"}/></a>
                    </Grid>
                    <Grid item xs={6}>
                    <a href="https://drive.google.com/file/d/1RnlnyIltPG7-_D3TddTs-ehWtRWk01ku/view?usp=drive_link" target="_blank"><img src={imgurl.sis_guidance_pdf2} alt="" width={"200px"} height={"200px"}/></a>
                    </Grid>
                    
                </Grid>

                <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                className="contentgrid"
                >
                    <Grid item xs={12}>SIS Guidance Document</Grid>
                    <Grid item xs={3}>
                    <a href="https://docs.google.com/document/d/1SA226hPB9yZ03deZ-7Hqo31NIwgMJlh2/edit?usp=drive_link&ouid=103835026252578494410&rtpof=true&sd=true" target="_blank"><img src={imgurl.sis_guidance_doc1} alt="" width={"200px"} height={"200px"}/></a>
                    </Grid>
                    <Grid item xs={3}>
                    <a href="https://docs.google.com/document/d/1S7yWqWUppWxmbizHQD-lcl2QO3sdAJCe/edit?usp=drive_link&ouid=103835026252578494410&rtpof=true&sd=true" target="_blank"><img src={imgurl.sis_guidance_doc2} alt="" width={"200px"} height={"200px"}/></a>
                    </Grid>
                    <Grid item xs={3}>
                    <a href="https://docs.google.com/document/d/1S6083_v6zwt2fDHJOOzRzQLjTAMRnQue/edit?usp=drive_link&ouid=103835026252578494410&rtpof=true&sd=true" target="_blank"><img src={imgurl.sis_guidance_doc3} alt="" width={"200px"} height={"200px"}/></a>
                    </Grid>
                    <Grid item xs={3}>
                    <a href="https://docs.google.com/document/d/1S6083_v6zwt2fDHJOOzRzQLjTAMRnQue/edit?usp=drive_link&ouid=103835026252578494410&rtpof=true&sd=true" target="_blank"><img src={imgurl.sis_guidance_doc3} alt="" width={"200px"} height={"200px"}/></a>
                    </Grid>
                    
                    
                </Grid>

                </Grid>
            </div>
            <Footer />
          </div>
    )

}

export default TechResource