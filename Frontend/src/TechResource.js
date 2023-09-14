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
              href="https://docs.google.com/document/d/1Raabf93YGaMnoOoHkM87alXoYzBWcWuq/edit?usp=drive_link"
              target="_blank"
            >
              <img
                src={imgurl.UNSDCF_doc1}
                alt=""
                width={"200px"}
                height={"200px"}
              />
            </a>
            <p>Test1</p>
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
            <p>Test1</p>
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
            <p>Test1</p>
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
            <p>Test1</p>
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
            <h3>Management Response to CPE</h3>
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
            <p>Test1</p>
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
            <p>Test1</p>
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
          className="contentsection mt-0"
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
            <p>Test1</p>
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
            <p>Test1</p>
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
            <p>Test1</p>
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
            <p>Test1</p>
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
            <p>Test1</p>
          </Grid>

          <div className="card-sis mt-10px">
            <Card className="card-subsection">
              <CardHeader className="card-head" title="SIS Guidance Document" />
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
                    <p>Test1</p>
                  </Grid>
                  <Grid item spacing={3}>
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
                    <p>Test1</p>
                  </Grid>
                  <Grid item spacing={3}>
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
                    <p>Test1</p>
                  </Grid>
                  <Grid item spacing={3}>
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
                    <p>Test1</p>
                  </Grid>
                  <Grid item spacing={3}>
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
                    <p>Test1</p>
                  </Grid>
                  <Grid item spacing={3}>
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
                    <p>Test1</p>
                  </Grid>
                  <Grid item spacing={3}>
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
                    <p>Test1</p>
                  </Grid>
                  <Grid item spacing={3}>
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
                    <p>Test1</p>
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
            <Grid item spacing xs={4}>
              <div className="mt-10px">
                <Card className="card-subsection">
                  <CardHeader
                    className="card-head"
                    title="SIS Guidance Document"
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
                        <p>Test1</p>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </div>
            </Grid>
            <Grid item spacing xs={8}>
              <div className="mt-10px">
                <Card className="card-subsection">
                  <CardHeader
                    className="card-head"
                    title="SIS Guidance Document"
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
                        <p>Test1</p>
                      </Grid>
                      <Grid item spacing={6}>
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
                        <p>Test1</p>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </div>
            </Grid>
          </Grid>

          <div className="mt-30px mb-50px w-75">
            <Card className="card-subsection">
              <CardHeader className="card-head" title="SIS Guidance Document" />
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
                    <p>Test1</p>
                  </Grid>
                  <Grid item spacing={3}>
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
                    <p>Test1</p>
                  </Grid>
                  <Grid item spacing={3}>
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
                    <p>Test1</p>
                  </Grid>
                  <Grid item spacing={3}>
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
                    <p>Test1</p>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </div>
        </Grid>
      </div>
      <Footer />
    </div>
  );
}

export default TechResource;
