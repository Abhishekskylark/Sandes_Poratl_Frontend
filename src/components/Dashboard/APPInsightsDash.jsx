import React from 'react'
import { Typography, Box ,Toolbar} from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faApple } from '@fortawesome/free-brands-svg-icons';
import { DiAndroid } from "react-icons/di";
import "./Dashboard.css";

function APPInsightsDash({ drawerWidth, collapsedDrawerWidth, desktopOpen }) {

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
        <Box sx={{ padding: "2%"  }}>

          <Typography variant="h5" fontWeight="700" gutterBottom color='#003566'>
            APP Insights <span style={{ color: "red" }}>** Beta</span>
          </Typography>
          <Typography variant="h5" fontWeight="bold" color='#003566' gutterBottom sx={{ textAlign: "center" }}>Ministry for POC Organization for POC</Typography>
          <hr className='mt-3 mb-3' />
          <Typography variant="h5" fontWeight="bold" gutterBottom color='#003566'>iOS</Typography>
          <div className="row col-md-12">
            <div className="col-md-3 mt-3" >
              <div className="card bgc-1" style={{ width: "100%" }} >
                <div class="card-body d-flex">
                  <FontAwesomeIcon icon={faApple} fontSize="65" className='card-text' /> <p class="card-text ml-4">
                    Total Users <br /><strong style={{ fontSize: "20px" }}>5</strong></p>
                </div>
              </div>
            </div>
            <div className="col-md-3 mt-3">
              <div class="card bgc-1" style={{ width: "100%" }}>
                <div class="card-body d-flex">
                  <FontAwesomeIcon icon={faApple} fontSize="65" className='card-text' /> <p class="card-text ml-4">Current Version <br /><strong style={{ fontSize: "20px" }}>2.4.01</strong></p>
                </div>
              </div>
            </div>
            <div className="col-md-3 mt-3">
              <div class="card bgc-1" style={{ width: "100%" }}>
                <div class="card-body d-flex">
                  <FontAwesomeIcon icon={faApple} fontSize="65" className='card-text' /> <p class="card-text ml-4">Current Version Updated <br /><strong style={{ fontSize: "20px" }}>1</strong></p>
                </div>
              </div>
            </div>
            <div className="col-md-3 mt-3">
              <div class="card bgc-1" style={{ width: "100%" }}>
                <div class="card-body d-flex">
                  <FontAwesomeIcon icon={faApple} fontSize="65" className='card-text' /> <p class="card-text ml-4">Current Version Not updated <br /><strong style={{ fontSize: "20px" }}>4</strong></p>
                </div>
              </div>
            </div>
          </div>
          <Typography variant="h5" mt={5} fontWeight="bold" gutterBottom color='#003566'>ANDROID</Typography>
          <div className="row col-md-12">
            <div className="col-md-3 mt-3">
              <div class="card bgc-1" style={{ width: "100%" }}>
                <div class="card-body d-flex">
                  <DiAndroid fontSize="65" className='card-text' /> <p class="card-text ml-4">
                    Total Users <br /><strong style={{ fontSize: "20px" }}>20</strong></p>
                </div>
              </div>
            </div>
            <div className="col-md-3 mt-3">
              <div class="card bgc-1" style={{ width: "100%" }}>
                <div class="card-body d-flex">
                  <DiAndroid fontSize="65" className='card-text' /> <p class="card-text ml-4">Current Version <br /><strong style={{ fontSize: "20px" }}>2.2.55</strong></p>
                </div>
              </div>
            </div>
            <div className="col-md-3 mt-3">
              <div class="card bgc-1" style={{ width: "100%" }}>
                <div class="card-body d-flex">
                  <DiAndroid fontSize="65" className='card-text' /> <p class="card-text ml-4">Current Version Updated <br /><strong style={{ fontSize: "20px" }}>3</strong></p>
                </div>
              </div>
            </div>
            <div className="col-md-3 mt-3">
              <div class="card bgc-1" style={{ width: "100%" }}>
                <div class="card-body d-flex">
                  <DiAndroid fontSize="65" className='card-text' /> <p class="card-text ml-4">Current Version Not updated <br /><strong style={{ fontSize: "20px" }}>17</strong></p>
                </div>
              </div>
            </div>


          </div>
          <hr className='mt-5' style={{ height: "2px" }} />
          <div className="row col-md-12 mt-5" >

            <div className="col-md-6">
              <Typography variant="h5" fontWeight="bold" gutterBottom color='#003566'>OS</Typography>
              <table class="table table-striped table-hover bgc-1" >
                <table class="table">
                  <thead className='table_head'>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">OS</th>
                      <th scope="col">Count</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">1</th>
                      <td>	ANDROID - 34</td>
                      <td>11</td>

                    </tr>
                    <tr>
                      <th scope="row">2</th>
                      <td>ANDROID - 31	</td>
                      <td>12</td>

                    </tr>
                    <tr>
                      <th scope="row">3</th>
                      <td>	IOS - 16.0	</td>
                      <td>8</td>
                    </tr>
                  </tbody>
                </table>
              </table>
            </div>
            <div className="col-md-6">
              <Typography variant="h5" fontWeight="bold" gutterBottom color='#003566'>App Version</Typography>
              <table class="table table-striped table-hover bgc-1" >
                <table class="table">
                  <thead className='table_head'>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">OS</th>
                      <th scope="col">App Version	</th>
                      <th scope="col">Count</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">1</th>
                      <td>ANDROID</td>
                      <td>	2.2.59</td>
                      <td>15</td>
                    </tr>
                    <tr>
                      <th scope="row">2</th>
                      <td>ANDROID</td>
                      <td>2.2.55	</td>
                      <td>22</td>
                    </tr>
                    <tr>
                      <th scope="row">2</th>
                      <td>IOS</td>
                      <td>2.3.15</td>
                      <td>7</td>
                    </tr>
                  </tbody>
                </table>
              </table>
            </div>
            <div className="col-md-6">
              <Typography variant="h5" fontWeight="bold" gutterBottom color='#003566'>Device Brand</Typography>
              <table class="table table-striped table-hover bgc-1" >
                <table class="table">
                  <thead className='table_head'>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Device Brand	</th>
                      <th scope="col">Count</th>

                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">1</th>
                      <td>ONEPLUS</td>
                      <td>7</td>

                    </tr>
                    <tr>
                      <th scope="row">2</th>
                      <td>APPLE</td>
                      <td>6</td>
                    </tr>
                    <tr>
                      <th scope="row">3</th>
                      <td>REDMI</td>
                      <td>2</td>
                    </tr>
                  </tbody>
                </table>
              </table>
            </div>
          </div>

        </Box>
      </Box>

  )
}

export default APPInsightsDash