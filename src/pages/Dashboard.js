import { Helmet } from 'react-helmet';
import { Box, Container, Grid } from '@material-ui/core';
import Budget from 'src/components/dashboard//Budget';
import Sales from 'src/components/dashboard//Sales';
import TrafficByDevice from 'src/components/dashboard//TrafficByDevice';
import axios from 'axios';
import { useEffect, useState } from 'react';
import openSocket from 'socket.io-client';
const Dashboard = (props) => {
  console.log('component(Dashboard) Refresh ==============================');
  const [isLoading, setIsLoading] = useState(true);
  const [all, setAll] = useState([0, 0]);
  const [devices, setDevices] = useState({
    deviceData: []
  });

  // useEffect(() => {
  //   console.log('Websocket Refresh ==============================');
  //   var token = localStorage.getItem('UserToken');
  //   axios
  //     .get('http://localhost:5000/api/iot/v2.0/detail/get-details', {
  //       headers: {
  //         'x-auth-token': token
  //       }
  //     })
  //     .then((dev) => {})
  //     .catch((e) => console.log(e));

  //   const socket = openSocket('http://localhost:5000');
  //   var top = localStorage.getItem('topic');
  //   socket.on(top, (data) => {
  //     // console.log(data.message);
  //     setAll(data.message);
  //   });
  // }, []);

  useEffect(() => {
    let projectId = localStorage.getItem('project_id');
    var token = localStorage.getItem('UserToken');
    console.log('Devices Refresh ==============================');
    axios
      .get(
        `http://localhost:5000/api/iot/v2.0/device/get-devices/?project_id=${projectId}`,
        {
          headers: {
            'x-auth-token': token
          }
        }
      )
      .then((devices) => {
        setIsLoading(false);
        setDevices({ ...devices, deviceData: devices.data.devices });
      })
      .catch((e) => console.log(e));
  }, []);

  // console.log(devices.deviceData);
  return (
    <>
      <Helmet>
        <title>Dashboard | Material Kit</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <Grid container spacing={3}>
            {devices.deviceData.map((dev, i) => (
              <Grid item lg={3} sm={6} xl={3} xs={12}>
                <Budget devices={dev} ind={i} />
              </Grid>
            ))}
            <Grid item lg={8} md={12} xl={9} xs={12}>
              <Sales devices={devices.deviceData} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Dashboard;
