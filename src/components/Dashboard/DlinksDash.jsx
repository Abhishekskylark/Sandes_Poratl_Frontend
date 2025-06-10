import React from 'react'
import { Button,Typography, Box ,Toolbar } from "@mui/material";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGooglePlay, faApple, faAndroid } from '@fortawesome/free-brands-svg-icons';
import { faMobile, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import "./Dashboard.css";
import { DiAndroid } from "react-icons/di";

function DlinksDash({ drawerWidth, collapsedDrawerWidth, desktopOpen }) {
  return (
    <Box
                  component="main"
                  sx={{
                    flexGrow: 1,
                    p: 3,
                    transition: "margin 0.3s, width 0.3s",
                    width: {
                      xs: "100%",
                      md: desktopOpen
                        ? `calc(100% - ${drawerWidth}px)`
                        : `calc(100% - ${collapsedDrawerWidth}px)`,
                    },
                    bgcolor: "background.default",
                  }}
                >
                  <Toolbar />
      <div className="section">
        <div className="row m-3">
          <Typography className='mt-5' variant="h5" fontWeight="bold" gutterBottom>
            Download Center
          </Typography>
          <div className="row">
            <div className="col-md-4 mt-3">
              <div class="card bgc-1" style={{ width: "100%", height: "280px" }}>
                <div class="card-body" style={{ alignItems: "center", textAlign: "center" }}>
                  <p className='card-text d-flex mb-3' style={{ alignItems: "center", justifyContent: "center" }}> <DiAndroid fontSize="40px" className='mr-2' />Android</p>

                  <Button
                    variant="contained"
                    className='mb-3 btn-bg-1'
                    startIcon={<FontAwesomeIcon icon={faGooglePlay} style={{ fontSize: "50px" }} />}
                    sx={{  textTransform: "none", alignItems: "flex-start", borderRadius: "10px", maxWidth: "200px" }}
                  >
                    <Box display="flex" flexDirection="column" alignItems="flex-start">
                      <span>GET IT ON</span>
                      <strong style={{ fontSize: "18px" }}>Google Play</strong>
                    </Box>
                  </Button>
                  <p class="card-text mb-3">Compatible on Android Version 5.0 or above.</p>
                  <Button className='btn-bg-1' variant="contained" style={{ marginRight: "10px"}} >QRG [PDF]</Button>

                </div>
              </div>
            </div>
            <div className="col-md-4 mt-3">
              <div class="card bgc-1" style={{ width: "100%", height: "280px" }}>
                <div class="card-body" style={{ alignItems: "center", textAlign: "center" }}>
                  <p className='card-text mb-3'>   <FontAwesomeIcon icon={faApple} fontSize="40px" className='mr-2' /> iOS</p>
                  <Button
                    variant="contained"
                    className='mb-3 btn-bg-1'
                    startIcon={<FontAwesomeIcon icon={faApple} style={{ fontSize: "50px" }} />}
                    sx={{  textTransform: "none", alignItems: "flex-start", borderRadius: "10px", maxWidth: "200px" }}
                  >
                    <Box display="flex" flexDirection="column" alignItems="flex-start">
                      <span>GET IT ON</span>
                      <strong style={{ fontSize: "18px" }}>App Store</strong>
                    </Box>
                  </Button>
                  <p class="card-text mb-3">Compatible on iOS Version 11 or above.</p>
                  <Button className='btn-bg-1' variant="contained" style={{ marginRight: "10px" }} >QRG [PDF]</Button>
                </div>
              </div>
            </div>
            <div className="col-md-4 mt-3">
              <div class="card bgc-1" style={{ width: "100%", height: "280px" }}>
                <div class="card-body" style={{ textAlign: "center", marginTop: "7%" }}>
                  <div className="logo" style={{textAlign: "-webkit-center"}} >
                  <img src="assets/images/sandes_logo.png" alt="logo" loading="lazy" width="65px" />
                  </div>
                  <p class="card-text mb-3">Sandes Web</p>
                  <Button href='/LoginWeb' className='Dashbtn mb-3 btn-bg-1' variant="contained" style={{ marginRight: "10px" }} >LAUNCH SANDES WEB</Button>
                  <Button variant="contained" className='mb-3 btn-bg-1' style={{ marginRight: "10px" }} >HELP [PDF]</Button>

                </div>
              </div>
            </div>

          </div>
        </div>
        <div className="row m-3">
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Support
          </Typography>
          <div className="row">
            <div className="col-md-3 mt-3">
              <div class="card bgc-1" style={{ width: "100%" }}>
                <img src="assets/images/FAQ.png" class="card-img-top" alt="..." style={{ height: "210px" }} />
                <div class="card-body">
                  <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                  <Button variant="contained" href='assets/images/faq.pdf' className='mt-3 Dashbtn btn-bg-1' style={{ marginRight: "10px" }} >FAQ [PDF]</Button>
                </div>
              </div>
            </div>
            <div className="col-md-3 mt-3">
              <div class="card bgc-1" style={{ width: "100%" }}>
                <img src="assets/images/User-menual.jpg" class="card-img-top" alt="..." style={{ height: "210px" }} />
                <div class="card-body">
                  <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                  <Button variant="contained" href='assets/images/portal-um.pdf' className='mt-3 Dashbtn btn-bg-1' style={{ marginRight: "10px" }} >SANDES PORTAL [PDF]</Button>
                </div>
              </div>
            </div>
            <div className="col-md-3 mt-3">
              <div class="card bgc-1" style={{ width: "100%" }}>
                <img src="assets/images/screencast.jpg" class="card-img-top" alt="..." style={{ height: "210px" }} />
                <div class="card-body">
                  <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                  <Button variant="contained" className='mt-3 Dashbtn btn-bg-1' style={{ marginRight: "10px" }} >SCREEN CASTS </Button>
                </div>
              </div>
            </div>
            <div className="col-md-3 mt-3">
              <div class="card bgc-1" style={{ width: "100%" }}>
                <img src="assets/images/release-notes.avif" class="card-img-top" alt="..." style={{ height: "210px" }} />
                <div class="card-body">
                  <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                  <Button variant="contained" href='assets/images/faq.pdf' className='mt-3 Dashbtn btn-bg-1' style={{ marginRight: "10px" }} >RELEASE NOTES</Button>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div className="row m-3">
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Support Network
          </Typography>
          <div className="row">
            <div className="col-md-6 mt-3">
              <div class="card bgc-1" style={{ width: "100%" }}>
                <div class="card-body m-3">
                  <p class="card-text mt-2">Sandes Team NIC Kerala</p>
                  <p class="card-text mt-2">IP Phone: 33049</p>

                </div>
              </div>
            </div>
            <div className="col-md-6 mt-3">
              <div class="card bgc-1" style={{ width: "100%" }}>
                <div class="card-body m-3">
                  <p class="card-text mt-2">Sandes Team NIC HQ</p>
                  <p class="card-text mt-2">IP Phone: 5951</p>

                </div>
              </div>
            </div>

          </div>
        </div>

        <div className="row m-3">
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Administrators
          </Typography>
          <div className="row">
            <div className="col-md-4 mt-3 ">
              <div class="card bgc-1" style={{ width: "100%" }}>
                <div class="card-body  m-3">
                  <p class="card-text mt-2">Abhishek</p>
                  <p class="card-text mt-2"><FontAwesomeIcon icon={faEnvelope} /> abhishek02official@gmail.com</p>
                  <p class="card-text mt-2"><FontAwesomeIcon icon={faMobile} /> +91-9984261451</p>

                </div>
              </div>
            </div>
            <div className="col-md-4 mt-3">
              <div class="card bgc-1" style={{ width: "100%" }}>
                <div class="card-body  m-3">
                  <p class="card-text mt-2">Vishal Singh</p>
                  <p class="card-text mt-2"> <FontAwesomeIcon icon={faEnvelope} /> Vishalsingh@gmail.com</p>
                  <p class="card-text mt-2"><FontAwesomeIcon icon={faMobile} /> +91-8368105795</p>

                </div>
              </div>
            </div>
            <div className="col-md-4 mt-3">
              <div class="card bgc-1" style={{ width: "100%" }}>
                <div class="card-body m-3">
                  <p class="card-text mt-2">Ms.Komala C.N</p>
                  <p class="card-text mt-2"><FontAwesomeIcon icon={faEnvelope} /> cn.komala@stpi.in</p>
                  <p class="card-text mt-2"> <FontAwesomeIcon icon={faMobile} /> +91-9900144862</p>

                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
</Box>
  )
}

export default DlinksDash