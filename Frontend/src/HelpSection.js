import React from "react";
import Footer from "./Footer";
import Appnavbar from "./Appnavbar";
import { Card, Grid } from "@mui/material";
import imgurl from "./Assets/imgurl";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";

function HelpSection() {
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
                        <h3>Documentation</h3>
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
                            href="https://docs.google.com/presentation/d/1shVlbSFllcmFuGzkvjpO33y6jHqNv9XA/edit?usp=drive_link&ouid=103835026252578494410&rtpof=true&sd=true"
                            target="_blank"
                        >
                            <img
                                src={imgurl.help_section}
                                alt=""
                                width={"200px"}
                                height={"200px"}
                            />
                        </a>
                        <p>Dashboard Manual</p>
                    </Grid>
                    <Grid item spacing={3}>
                        <a
                            href="https://docs.google.com/presentation/d/1_vWncaEYSQhZOhL-0yrg91wYWiUIYkHB/edit?usp=drive_link&ouid=103835026252578494410&rtpof=true&sd=true"
                            target="_blank"
                        >
                            <img
                                src={imgurl.help_section}
                                alt=""
                                width={"200px"}
                                height={"200px"}
                            />
                        </a>
                        <p>Supervisory Checklist</p>
                    </Grid>
                    <Grid item spacing={3}>
                        <a
                            href="https://docs.google.com/presentation/d/1oS3DKlt4DsVJ0de8pug-_9cxKzYG39EI/edit?usp=drive_link&ouid=103835026252578494410&rtpof=true&sd=true"
                            target="_blank"
                        >
                            <img
                                src={imgurl.help_section}
                                alt=""
                                width={"200px"}
                                height={"200px"}
                            />
                        </a>
                        <p>Supervisory ChecklistWeb</p>
                    </Grid>
                    <Grid item spacing={3}>
                        <a
                            href="https://docs.google.com/presentation/d/1a-EvGu0fCtEizVL4qtv0wQQ3xF0dWUof/edit?usp=drive_link&ouid=103835026252578494410&rtpof=true&sd=true"
                            target="_blank"
                        >
                            <img
                                src={imgurl.help_section}
                                alt=""
                                width={"200px"}
                                height={"200px"}
                            />
                        </a>
                        <p>State Staff</p>
                    </Grid>
                    <Grid item spacing={3}>
                        <a
                            href="https://docs.google.com/presentation/d/1J-xmpKe4jc7Qh7sVJHeBEmYA8ojN2u3g/edit?usp=drive_link&ouid=103835026252578494410&rtpof=true&sd=true"
                            target="_blank"
                        >
                            <img
                                src={imgurl.help_section}
                                alt=""
                                width={"200px"}
                                height={"200px"}
                            />
                        </a>
                        <p>State Head</p>
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
                            href="https://docs.google.com/presentation/d/1EvcjleeOpvns38i6YWM1TxxqsCmMpKmK/edit?usp=drive_link&ouid=103835026252578494410&rtpof=true&sd=true"
                            target="_blank"
                        >
                            <img
                                src={imgurl.help_section}
                                alt=""
                                width={"200px"}
                                height={"200px"}
                            />
                        </a>
                        <p>Responsible person user</p>
                    </Grid>
                    <Grid item spacing={2}>
                        <a
                            href="https://docs.google.com/presentation/d/1ipaJkrei_kZIgZhdvhuL7TrnQKMf16Ui/edit?usp=drive_link&ouid=103835026252578494410&rtpof=true&sd=true"
                            target="_blank"
                        >
                            <img
                                src={imgurl.help_section}
                                alt=""
                                width={"200px"}
                                height={"200px"}
                            />
                        </a>
                        <p>Theamatic Head</p>
                    </Grid>
                    <Grid item spacing={2}>
                        <a
                            href="https://docs.google.com/presentation/d/1q3CgRGnTdrpXArDDvixuJY_tN-VVIvS2/edit?usp=drive_link&ouid=103835026252578494410&rtpof=true&sd=true"
                            target="_blank"
                        >
                            <img
                                src={imgurl.help_section}
                                alt=""
                                width={"200px"}
                                height={"200px"}
                            />
                        </a>
                        <p>M&E Head</p>
                    </Grid>
                    <Grid item spacing={2}>
                        <a
                            href="https://docs.google.com/presentation/d/1n73JkeioDdAcuA5lG5ps3h80n0bfcnWt/edit?usp=drive_link&ouid=103835026252578494410&rtpof=true&sd=true"
                            target="_blank"
                        >
                            <img
                                src={imgurl.help_section}
                                alt=""
                                width={"200px"}
                                height={"200px"}
                            />
                        </a>
                        <p>CMT User</p>
                    </Grid>
                    

                </Grid>

            </div>
            <Footer />
        </div>
    );
}

export default HelpSection;
