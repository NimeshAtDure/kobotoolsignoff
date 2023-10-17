import React, { useEffect } from "react";
import Footer from "./Footer";
import Appnavbar from "./Appnavbar";
import { Button, Card, Grid } from "@mui/material";
import imgurl from "./Assets/imgurl";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import axios from "axios";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function TechResource() {

    const [open,setopen] = React.useState(false)
    const [fname,setfname] = React.useState('')
    const [dname,setdname] = React.useState('')
    const [sdname,setsdname] = React.useState('')
    const [file,setfile] = React.useState({})
    const [tbnail,settbnail] = React.useState({})
    const [fdata,setfdata] = React.useState({})
    const [alerttxt, setalerttxt] = React.useState('')
    const [user, setuser] = React.useState(JSON.parse(localStorage.getItem("user")))

    useEffect(()=>{
        getFiles()
    },[])

    function getFiles(){
        axios({
            method: 'get',
            url: 'http://localhost:8080/getfile',
            // url: 'https://uatservice.rbmgateway.org/getfile',
            headers: {}
          })
          .then(
              response => {
                  let filesdata={}
                  response.data.data?.map((f)=>{
                        if(!filesdata.hasOwnProperty(f.dir)){
                            filesdata[f.dir]={files:[],"child":{}}
                        }
                        if(f.sdir.length==0){
                            filesdata[f.dir].files.push(f)
                        }else{
                            if(!filesdata[f.dir]["child"].hasOwnProperty(f.sdir)){
                                filesdata[f.dir]["child"][f.sdir]=[f]
                            }else{
                                filesdata[f.dir]["child"][f.sdir].push(f)
                            }
                        }
                    })
                    console.log(filesdata,Object.entries(filesdata));
                    Object.entries(filesdata)?.map((fd)=>{
                        Object.entries(fd[1])?.map((f)=>{
                            console.log(f);
                            if(f[0]=="files"){
                                f[1]?.map(fls=>{
                                    console.log("files",fls);
                                })
                            }else{

                                console.log("child",Object.entries(f[1]));
                            }
                        })
                    })
                    setfdata(filesdata)
              }
          ).catch((error) => {
            console.log(error);
            });
    }

    function uploadForm(){       
        console.log(fname,dname,sdname,file,tbnail,file.name,tbnail.name);
        if( file.name && tbnail.name){

            const formData = new FormData();
            formData.append("file",file);
            formData.append("tbnail",tbnail)
            formData.append("fname", fname)
            formData.append("dname", dname)
            formData.append("sdname", sdname)
            axios({
                method: 'post',
                url: 'http://localhost:8080/uploadfile',
                // url: 'https://uatservice.rbmgateway.org/uploadfile',
                headers: {'Content-Type': 'multipart/form-data'},
                data: formData
              })
              .then(
                  response => {
                    console.log(response);
                    setopen(false)
                    setalerttxt("success")
                    setfname("")
                    setdname("")
                    setsdname("")
                    setfile("")
                    settbnail("")
                    getFiles()
                  }
              ).catch((error) => {
                console.log(error);
                setopen(false)
                setalerttxt("success")
                });
        }else{
            setalerttxt("Document and Thumbnail are mandatory")
        }
    }

    const handleClose = () => {
            setalerttxt("")
    }

    const handleCloseDialog = () =>{
        setopen(false)
    }

    return (
        <div className="App ">
            <Appnavbar
                navItems={{
                    forms: true,
                    supchck: true,
                    dashboard: true,
                    progoverview: true,
                }}
            />
            <div className="techrespage">
                
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    className="contentgrid"
                >
                    <Grid item xs={2}></Grid>
                    <Grid item xs={8}>
                        <a
                            href="https://sites.google.com/unfpa.org/india-mymne/home"
                            target="_blank"
                        >
                            MyMne – Gateway to monitoring and evaluation of UNFPA interventions to the Ninth Country programme (2018-22)
                        </a>

                    </Grid>
                    <Grid item xs={2}>
                        {(user.username.includes("kaushik") ||user.username.includes("admin")) && <Button variant="outlined" className='viewbtn mt-0' onClick={()=>setopen(true)}>Upload Document</Button>}
                    </Grid>
                </Grid>
                {
                    Object.entries(fdata)?.map(fd=>{
                        return <>
                        
                        <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    className="contentsection mt-0 "
                    >
                    <Grid item xs={12}>
                        <h3>{fd[0]}</h3>
                    </Grid>
                    </Grid>


                    
                    {
                        Object.entries(fd[1])?.map(f=>{
                            return f[0]=="files"?
                            <Grid
                    container
                    spacing={5}
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    className="contentsection mt-0 mb-50px"
                    >
                            {f[1]?.map(fls=>{
                                return <Grid item spacing={2}>
                                <a
                                    href={fls.file}
                                    target="_blank"
                                >
                                    <img
                                        src={fls.tbnail}
                                        alt=""
                                        width={"200px"}
                                        height={"200px"}
                                    />
                                </a>
                                <p>{fls.name}</p>
                                </Grid>
                            })}
                            </Grid>
                            :<>
                            {Object.entries(f[1])?.map(fls=>{
                                return <Grid
                                container
                                spacing={5}
                                direction="row"
                                justifyContent="center"
                                alignItems="center"
                                className="contentsection mt-0 mb-50px"
                                >
                                    <div className="mt-30px mb-50px w-75">
                                <Card className="card-subsection">
                                    <CardHeader className="card-head" title={fls[0]} />
                                    <CardContent>
                                        <Grid
                                            container
                                            spacing={6}
                                            direction="row"
                                            justifyContent="center"
                                            alignItems="center"
                                            className="contentsection mt-0 mb-50px"
                                        >
                                            {fls[1]?.map(fl=>{
                                                return <Grid item spacing={3}>
                                                <a
                                                    href={fl.file}
                                                    target="_blank"
                                                >
                                                    <img
                                                        src={fl.tbnail}
                                                        alt=""
                                                        width={"200px"}
                                                        height={"200px"}
                                                    />
                                                </a>
                                                <p>{fl.name}</p>
                                            </Grid>
                                            })}
                                            
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </div>
                            </Grid>
                            })}
                            </>
                        })
                    }
                    
                        </>
                    })
                }
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    className="contentsection mt-0"
                >
                    <Grid item xs={12}>
                        <h3>Country Programme 10</h3>
                    </Grid>
                </Grid>

                <Grid
                    container
                    spacing={5}
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    className="contentsection mt-0"
                >
                    <Grid item spacing={2}>
                        <a
                            href="https://docs.google.com/document/d/1SdHbKTylas-QHs6tbBOtR4RUZKzg1den/edit?usp=drive_link&ouid=103835026252578494410&rtpof=true&sd=true"
                            target="_blank"
                        >
                            <img
                                src={imgurl.country_prog_doc1}
                                alt=""
                                width={"200px"}
                                height={"200px"}
                            />
                        </a>
                        <p>India CP9 Performance Summary - 14 March_2022</p>
                    </Grid>
                    <Grid item spacing={2}>
                        <a
                            href="https://docs.google.com/document/d/1SsMJlTaUupkTWEAh60Z72xiO5vtlbSyL/edit?usp=drive_link&ouid=103835026252578494410&rtpof=true&sd=true"
                            target="_blank"
                        >
                            <img
                                src={imgurl.country_prog_doc2}
                                alt=""
                                width={"200px"}
                                height={"200px"}
                            />
                        </a>
                        <p>India CP10 Costed Evaluation Plan_14 March_2022</p>
                    </Grid>
                    <Grid item spacing={2}>
                        <a
                            href="https://docs.google.com/document/d/1SkYdf0S0P_NkPJnd7ogdjHoxCFq1aBsb/edit?usp=drive_link&ouid=103835026252578494410&rtpof=true&sd=true"
                            target="_blank"
                        >
                            <img
                                src={imgurl.country_prog_doc3}
                                alt=""
                                width={"200px"}
                                height={"200px"}
                            />
                        </a>
                        <p>India CP10 Indicator Metadata</p>
                    </Grid>
                    <Grid item spacing={2}>
                        <a
                            href="https://docs.google.com/document/d/1Sh6av18GgolJfHpK2QbihphTEu46_uMl/edit?usp=drive_link&ouid=103835026252578494410&rtpof=true&sd=true"
                            target="_blank"
                        >
                            <img
                                src={imgurl.country_prog_doc4}
                                alt=""
                                width={"200px"}
                                height={"200px"}
                            />
                        </a>
                        <p>India CP10_Integrated RM _ Partnerships Plan</p>
                    </Grid>
                    <Grid item spacing={2}>
                        <a
                            href="https://drive.google.com/file/d/1St54GVKRvM6ePJNH2XGoo-vYiAJDZEzx/view?usp=drive_link"
                            target="_blank"
                        >
                            <img
                                src={imgurl.country_prog_pdf1}
                                alt=""
                                width={"200px"}
                                height={"200px"}
                            />
                        </a>
                        <p>India CP10 - Final</p>
                    </Grid>

                    

                    <div className="mt-30px mb-50px w-75">
                        <Card className="card-subsection">
                            <CardHeader className="card-head" title="Theory of Change" />
                            <CardContent>
                                <Grid
                                    container
                                    spacing={6}
                                    direction="row"
                                    justifyContent="center"
                                    alignItems="center"
                                    className="contentsection mt-0"
                                >
                                    <Grid item xs={12}>SIS Guidance Document</Grid>
                                    <Grid item spacing={3}>
                                        <a
                                            href="https://docs.google.com/presentation/d/1UU-1iJnveWhtiZyX0GWzyoRBTHbt4_In/edit?usp=drive_link&ouid=103835026252578494410&rtpof=true&sd=true"
                                            target="_blank"
                                        >
                                            <img
                                                src={imgurl.countryprog_toc1}
                                                alt=""
                                                width={"200px"}
                                                height={"200px"}
                                            />
                                        </a>
                                        <p>India Gender TOC_Final_15 Mar_2022</p>
                                    </Grid>
                                    <Grid item spacing={3}>
                                        <a
                                            href="https://docs.google.com/presentation/d/1UQOUrPaJWnbmjMcBiwumo41DERptH22p/edit?usp=drive_link&ouid=103835026252578494410&rtpof=true&sd=true"
                                            target="_blank"
                                        >
                                            <img
                                                src={imgurl.countryprog_toc2}
                                                alt=""
                                                width={"200px"}
                                                height={"200px"}
                                            />
                                        </a>
                                        <p>India Policy and PD TOC Final_15_Mar_2022</p>
                                    </Grid>
                                    <Grid item spacing={3}>
                                        <a
                                            href="https://docs.google.com/presentation/d/1UI2jhjxLrxuhM2tVgNPnAgKjr87j3Z2n/edit?usp=drive_link&ouid=103835026252578494410&rtpof=true&sd=true"
                                            target="_blank"
                                        >
                                            <img
                                                src={imgurl.countryprog_toc3}
                                                alt=""
                                                width={"200px"}
                                                height={"200px"}
                                            />
                                        </a>
                                        <p>India SRHR TOC_Final_15 Mar_2022</p>
                                    </Grid>
                                    <Grid item spacing={3}>
                                        <a
                                            href="https://docs.google.com/presentation/d/1UFmgo5Wk2S9NmoUs7JG-FemVB73PrQif/edit?usp=drive_link&ouid=103835026252578494410&rtpof=true&sd=true"
                                            target="_blank"
                                        >
                                            <img
                                                src={imgurl.countryprog_toc4}
                                                alt=""
                                                width={"200px"}
                                                height={"200px"}
                                            />
                                        </a>
                                        <p>India YOUTH TOC_Final_15 Mar_2022</p>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </div>

                    <Grid
                        container
                        spacing={1}
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        className="contentsection mt-30px w-75 mb-20px"
                    >
                        
                        <Grid item spacing xs={12}>
                            <div className="mt-10px">
                                <Card className="card-subsection">
                                    <CardHeader
                                        className="card-head"
                                        title="HR Plan"
                                    />
                                    <CardContent>
                                        <Grid
                                            container
                                            spacing={5}
                                            direction="row"
                                            justifyContent="center"
                                            alignItems="center"
                                            className="contentsection mt-0"
                                        >
                                            <Grid item spacing={6}>
                                                <a
                                                    href="https://docs.google.com/document/d/1UVVoaCodcxsCBwj_upuo16YGd8J5RceZ/edit?usp=drive_link&ouid=103835026252578494410&rtpof=true&sd=true"
                                                    target="_blank"
                                                >
                                                    <img
                                                        src={imgurl.countryprog_hr1}
                                                        alt=""
                                                        width={"200px"}
                                                        height={"200px"}
                                                    />
                                                </a>
                                                <p>2022 03 15_UNFPA Realignment Org Chart</p>
                                            </Grid>
                                            <Grid item spacing={6}>
                                                <a
                                                    href="https://docs.google.com/document/d/1UU5m9h_cq2L193GUZtUnGWYj5WsrCKuf/edit?usp=drive_link&ouid=103835026252578494410&rtpof=true&sd=true"
                                                    target="_blank"
                                                >
                                                    <img
                                                        src={imgurl.countryprog_hr2}
                                                        alt=""
                                                        width={"200px"}
                                                        height={"200px"}
                                                    />
                                                </a>
                                                <p>HR Plan for CPD_IND_15_Mar_2022</p>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </div>
                        </Grid>
                    </Grid>


                </Grid>

                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    className="contentsection mt-0"
                >
                    <Grid item xs={12}>
                        <h3>Country Programme Action Plan</h3>
                    </Grid>
                </Grid>

                <Grid
                    container
                    spacing={5}
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    className="contentsection mt-0"
                >
                    <Grid item spacing xs={12}>
                        <a
                            href="https://drive.google.com/file/d/1UVfguizUBPrfPdOkVUUq0FofqUsCtAYO/view?usp=drive_link"
                            target="_blank"
                        >
                            <img
                                src={imgurl.countryprog_cpap}
                                alt=""
                                width={"200px"}
                                height={"200px"}
                            />
                        </a>
                        <p>CPAP document - 2 June docx</p>
                    </Grid>
                </Grid>

                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    className="contentsection mt-0"
                >
                    <Grid item xs={12}>
                        <h3>CP9 Evaluation</h3>
                    </Grid>
                </Grid> 

                <Grid
                    container
                    spacing={5}
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    className="contentsection mt-0"
                >
                    <Grid item spacing={3}>
                        <a
                            href="https://docs.google.com/spreadsheets/d/1U8_iiYPLLbqlNITmCNKqzbqLfreR9W2K/edit?usp=drive_link&ouid=103835026252578494410&rtpof=true&sd=true"
                            target="_blank"
                        >
                            <img
                                src={imgurl.countryprog_cpxl1}
                                alt=""
                                width={"200px"}
                                height={"200px"}
                            />
                        </a>
                        <p>Copy of India CPE management response_CHO_GD_june 21</p>
                    </Grid>
                    <Grid item spacing={3}>
                        <a
                            href="https://docs.google.com/spreadsheets/d/1TujxKrLPb0SfIYehjaBl3CD4qg-ZLIrl/edit?usp=drive_link&ouid=103835026252578494410&rtpof=true&sd=true"
                            target="_blank"
                        >
                            <img
                                src={imgurl.countryprog_cpxl2}
                                alt=""
                                width={"200px"}
                                height={"200px"}
                            />
                        </a>
                        <p>India CPE management response_Oct 19</p>
                    </Grid>
                    <Grid item spacing={3}>
                        <a
                            href="https://docs.google.com/spreadsheets/d/1TgdIpyzWol8LD2MsurE_PA9IawsMpSza/edit?usp=drive_link&ouid=103835026252578494410&rtpof=true&sd=true"
                            target="_blank"
                        >
                            <img
                                src={imgurl.countryprog_cpxl3}
                                alt=""
                                width={"200px"}
                                height={"200px"}
                            />
                        </a>
                        <p>India CPE management response_Sept 13</p>
                    </Grid>
                    <Grid item spacing={3}>
                        <a
                            href="https://docs.google.com/spreadsheets/d/1TG1PxD0SwV6Myd9ciWzuSDtJOrhfCu9e/edit?usp=drive_link&ouid=103835026252578494410&rtpof=true&sd=true"
                            target="_blank"
                        >
                            <img
                                src={imgurl.countryprog_cpxl4}
                                alt=""
                                width={"200px"}
                                height={"200px"}
                            />
                        </a>
                        <p>Update on management responses to CPE, June 2023</p>
                    </Grid>
                    <Grid item spacing={4}>
                        <a
                            href="https://drive.google.com/file/d/1U73ssJwZPfbVxbkfShFxBz-uZ7ND_WoD/view?usp=drive_link"
                            target="_blank"
                        >
                            <img
                                src={imgurl.countryprog_cppdf1}
                                alt=""
                                width={"200px"}
                                height={"200px"}
                            />
                        </a>
                        <p>CPE9_India_Final ReportMay102022</p>
                    </Grid>
                    <Grid item spacing={4}>
                        <a
                            href="https://drive.google.com/file/d/1U13mudegLY3Ut68DdZJCQjCTaV7SMdUg/view?usp=drive_link"
                            target="_blank"
                        >
                            <img
                                src={imgurl.countryprog_cppdf2}
                                alt=""
                                width={"200px"}
                                height={"200px"}
                            />
                        </a>
                        <p>India CP9 Final Evaluation_Second Draft_07_March_2022</p>
                    </Grid>
                    <Grid item spacing={4}>
                        <a
                            href="https://drive.google.com/file/d/1TGtTDblGL-nPCn7wwy9vEKavMKUePpnq/view?usp=drive_link"
                            target="_blank"
                        >
                            <img
                                src={imgurl.countryprog_cppdf3}
                                alt=""
                                width={"200px"}
                                height={"200px"}
                            />
                        </a>
                        <p>UNFPA EQA India CPE 3-July-22</p>
                    </Grid>


                </Grid>

                <div className="card-sis mt-10px">
                    <Card className="card-subsection">
                        <CardHeader className="card-head" title="Management Response to CPE" />
                        <CardContent>
                            <Grid
                                container
                                spacing={5}
                                direction="row"
                                justifyContent="center"
                                alignItems="center"
                                className="contentsection mt-0 mb-20px"
                            >
                                <Grid item spacing={6}>
                                    <a
                                        href="https://docs.google.com/spreadsheets/d/1SRrBmXcYjXqYk2lbSrOaj2hwiB7mqTXZ/edit?usp=drive_link&ouid=103835026252578494410&rtpof=true&sd=true"
                                        target="_blank"
                                    >
                                        <img
                                            src={imgurl.Management_Response_to_CPE_xls1}
                                            alt=""
                                            width={"200px"}
                                            height={"200px"}
                                        />
                                    </a>
                                    <p>India CPE management response_Oct 19</p>
                                </Grid>
                                <Grid item spacing={6}>
                                    <a
                                        href="https://docs.google.com/spreadsheets/d/1SACWPRI93Bg4LtIqGrHZlyBHBgRML0hs/edit?usp=drive_link&ouid=103835026252578494410&rtpof=true&sd=true"
                                        target="_blank"
                                    >
                                        <img
                                            src={imgurl.Management_Response_to_CPE_xls2}
                                            alt=""
                                            width={"200px"}
                                            height={"200px"}
                                        />
                                    </a>
                                    <p>Update on management responses to CPE, June 2023</p>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </div>

                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    className="contentsection mt-0"
                >
                    <Grid item xs={12}>
                        <h3> UNSDCF</h3>
                    </Grid>
                </Grid>
                <Grid
                    container
                    spacing={5}
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    className="contentsection mt-0 mb-20px"
                >
                    <Grid item spacing={3}>
                        <a
                            href="https://docs.google.com/document/d/1Raabf93YGaMnoOoHkM87alXoYzBWcWuq/edit?usp=drive_link&ouid=103835026252578494410&rtpof=true&sd=true"
                            target="_blank"
                        >
                            <img
                                src={imgurl.UNSDCF_doc1}
                                alt=""
                                width={"200px"}
                                height={"200px"}
                            />
                        </a>
                        <p>UNFPA Information Note_UN Output Indicator Framework_PSD Final</p>
                    </Grid>
                    <Grid item spacing={3}>
                        <a
                            href="https://drive.google.com/file/d/1RgKQdBQxgEgLmZhnpdCvlMgbVcSEC4uN/view?usp=drive_link"
                            target="_blank"
                        >
                            <img
                                src={imgurl.UNSDCF_pdf1}
                                alt=""
                                width={"200px"}
                                height={"200px"}
                            />
                        </a>
                        <p>India UNDAF 2018-27 Final Evaluation Report_Oct 2022</p>
                    </Grid>
                    <Grid item spacing={3}>
                        <a
                            href="https://drive.google.com/file/d/1R_T7k8tX2udVoDkxt6Lv9UcOQ9eLPD3H/view?usp=drive_link"
                            target="_blank"
                        >
                            <img
                                src={imgurl.UNSDCF_pdf2}
                                alt=""
                                width={"200px"}
                                height={"200px"}
                            />
                        </a>
                        <p>UNSDCF 2023-2027 document</p>
                    </Grid>
                    <Grid item spacing={3}>
                        <a
                            href="https://docs.google.com/presentation/d/1TAEuux81hos4dx_-cqYhXDcsbKds-N-Z/edit?usp=drive_link&ouid=103835026252578494410&rtpof=true&sd=true"
                            target="_blank"
                        >
                            <img
                                src={imgurl.UNSDCF_ppt1}
                                alt=""
                                width={"200px"}
                                height={"200px"}
                            />
                        </a>
                        <p>UNSDCF 2023-2027 governance structure</p>
                    </Grid>
                </Grid>

                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    className="contentsection mt-0"
                >
                    <Grid item xs={12}>
                        <h3>SIS Guidance Document</h3>
                    </Grid>
                </Grid>

                <Grid
                    container
                    spacing={5}
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    className="contentsection mt-0 mb-50px"
                >
                    <Grid item spacing={2}>
                        <a
                            href="https://docs.google.com/document/d/1SA226hPB9yZ03deZ-7Hqo31NIwgMJlh2/edit?usp=drive_link&ouid=103835026252578494410&rtpof=true&sd=true"
                            target="_blank"
                        >
                            <img
                                src={imgurl.sis_guidance_doc1}
                                alt=""
                                width={"200px"}
                                height={"200px"}
                            />
                        </a>
                        <p>2023 Guidance Note on Post-Nairobi follow up actions in SISmyResults</p>
                    </Grid>
                    <Grid item spacing={2}>
                        <a
                            href="https://docs.google.com/document/d/1S7yWqWUppWxmbizHQD-lcl2QO3sdAJCe/edit?usp=drive_link&ouid=103835026252578494410&rtpof=true&sd=true"
                            target="_blank"
                        >
                            <img
                                src={imgurl.sis_guidance_doc2}
                                alt=""
                                width={"200px"}
                                height={"200px"}
                            />
                        </a>
                        <p>2023 PSEAH OEE Output SIS guidance</p>
                    </Grid>
                    <Grid item spacing={2}>
                        <a
                            href="https://docs.google.com/document/d/1S6083_v6zwt2fDHJOOzRzQLjTAMRnQue/edit?usp=drive_link&ouid=103835026252578494410&rtpof=true&sd=true"
                            target="_blank"
                        >
                            <img
                                src={imgurl.sis_guidance_doc3}
                                alt=""
                                width={"200px"}
                                height={"200px"}
                            />
                        </a>
                        <p>APRO Guidance on Strategic Information System_updated Jan 2022</p>
                    </Grid>
                    <Grid item spacing={2}>
                        <a
                            href="https://drive.google.com/file/d/1S2FSYiqzFOcmOECqm_zNFaz54ia1e3Xq/view?usp=drive_link"
                            target="_blank"
                        >
                            <img
                                src={imgurl.sis_guidance_pdf1}
                                alt=""
                                width={"200px"}
                                height={"200px"}
                            />
                        </a>
                        <p>Q&A - SIS Planning Webinar</p>
                    </Grid>
                    <Grid item spacing={2}>
                        <a
                            href="https://drive.google.com/file/d/1RnlnyIltPG7-_D3TddTs-ehWtRWk01ku/view?usp=drive_link"
                            target="_blank"
                        >
                            <img
                                src={imgurl.sis_guidance_pdf2}
                                alt=""
                                width={"200px"}
                                height={"200px"}
                            />
                        </a>
                        <p>SIS_Sustainable management practices and reduction of GHG emissions (2023)</p>
                    </Grid>

                </Grid>

                

            </div>

            <Dialog
                open={open}
                onClose={handleCloseDialog}
                className="dialog-main"
            >
                <DialogContent>
                <form id='inputform' className="uplaodform">
                <TextField
                        className="editdialogtxt"
                        autoFocus
                        margin="dense"
                        id="fname"
                        label="File Name"
                        type="text"
                        fullWidth
                        multiline
                        value={fname}
                        variant="standard"
                        onChange={e => setfname(e.target.value )}
                    />
               <TextField
                        className="editdialogtxt"
                        autoFocus
                        margin="dense"
                        id="dname"
                        label="Module Name"
                        type="text"
                        fullWidth
                        multiline
                        value={dname}
                        variant="standard"
                        onChange={e => setdname( e.target.value )}
                    />
                <TextField
                    className="editdialogtxt lasttext"
                    autoFocus
                    margin="dense"
                    id="sdname"
                    label="SubModule Name"
                    type="text"
                    fullWidth
                    multiline
                    value={sdname}
                    variant="standard"
                    onChange={e => setsdname(e.target.value )}
                    />
                    <label>Document : </label>
                <input type="file" id="file" name="file" onChange={e=>setfile(e.target.files[0])}/><br/>
                <div className="mt-10px">
                <label>Thumbnail : </label>
                <input type="file" id="tbnail" name="tbnail" onChange={e=>settbnail(e.target.files[0])}/>
                </div>
                <div className="uplbtndiv">
                <Button variant="outlined" className='viewbtn mt-0' onClick={uploadForm}>Submit</Button>
                </div>
                </form>
                </DialogContent>
            </Dialog>
            <Snackbar open={alerttxt.length > 0} autoHideDuration={6000} onClose={handleClose}>
                {alerttxt == "success" ? <Alert severity="success">Document uploaded !</Alert> : alerttxt == "error" ? <Alert severity="error">Upload failed !</Alert> : alerttxt == "Document and Thumbnail are mandatory" ? <Alert severity="error">Document and Thumbnail are mandatory !</Alert> :''
                }
            </Snackbar>
            <Footer />
        </div>
    );
}

export default TechResource;
