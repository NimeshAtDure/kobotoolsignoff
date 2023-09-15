import React from "react";
import Footer from "./Footer";
import Appnavbar from "./Appnavbar";
import { Card, Grid } from "@mui/material";
import imgurl from "./Assets/imgurl";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";

function TechResource() {
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
                    <Grid item xs={12}>
                        <a
                            href="https://sites.google.com/unfpa.org/india-mymne/home"
                            target="_blank"
                        >
                            Gateway of monitoring and evaluation of UNFPA interventions of its
                            Ninth Country programme (2018-22) in India
                        </a>
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
                        <h3>Country Prgramme 10</h3>
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

                    {/* <div className="card-sis mt-10px">
            <Card className="card-subsection">
              <CardHeader className="card-head" title="CP9 Evaluation" />
              <CardContent>
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
              </CardContent>
            </Card>
          </div> */}

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
                                    {/* <Grid item xs={12}>SIS Guidance Document</Grid> */}
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
                        {/* <Grid item spacing xs={4}>
              <div className="mt-10px">
                <Card className="card-subsection">
                  <CardHeader
                    className="card-head"
                    title="Country Programme Action Plan"
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
                  </CardContent>
                </Card>
              </div>
            </Grid> */}
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

                {/* <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          className="contentsection mt-0"
        >
          <Grid item xs={12}>
            <h3>Management Response to CPE</h3>
          </Grid>
        </Grid> */}
                {/* <Grid
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
        </Grid> */}

            </div>
            <Footer />
        </div>
    );
}

export default TechResource;
