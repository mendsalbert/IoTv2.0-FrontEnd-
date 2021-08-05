import { Helmet } from 'react-helmet';
import react, { useState, useEffect } from 'react';
import { Box, Container, Button, TextField, Grid } from '@material-ui/core';
import CustomerListResults from 'src/components/customer/CustomerListResults';
import CustomerListToolbar from 'src/components/customer/CustomerListToolbar';
import customers from 'src/__mocks__/customers';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { useSelector, useDispatch } from 'react-redux';
import { Link as RouterLink, useNavigate, Navigate } from 'react-router-dom';
import * as authAction from '../store/actions/authAction';

const CustomerList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authAction.refresh());
  }, []);

  var token = localStorage.getItem('UserToken');
  useEffect(() => {
    var projectId = localStorage.getItem('project_id');
    if (token) {
      navigate(`/app/customers?project_id=${projectId}`);
    } else {
      navigate('/login');
    }
  }, []);

  // var projectId;
  const getParams = (url) => {
    var params = {};
    var parser = document.createElement('a');
    parser.href = url;
    var query = parser.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=');
      params[pair[0]] = decodeURIComponent(pair[1]);
    }
    // setProjectId(params.project_id);
    var projectId = params.project_id;
    localStorage.setItem('project_id', projectId);
    return params;
  };
  getParams(window.location.href);

  // console.log(projectId);
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [devices, setDevices] = useState({
    deviceData: []
  });
  const [success, setSuccess] = useState(false);
  const [deviceName, setDeviceName] = useState('');
  const [devicePurpose, setDevicePurpose] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const validate = () => {
    if (deviceName !== '' && devicePurpose !== '') {
      return false;
    } else {
      return true;
    }
  };
  const handleDeviceHandler = () => {
    var token = localStorage.getItem('UserToken');
    var projectId = localStorage.getItem('project_id');
    axios
      .post(
        // 'http://localhost:5000/api/iot/v2.0/device/add-device',
        'http://10.10.64.11:5000/api/iot/v2.0/device/add-device',
        {
          name: deviceName,
          purpose: devicePurpose,
          projectId: projectId
        },
        {
          headers: {
            'x-auth-token': token,
            'Content-Type': 'application/json'
          }
        }
      )
      .then((suc) => {
        setSuccess(true);
        setDeviceName('');
        setDevicePurpose('');
        handleClose();
      })
      .catch((e) => {
        // console.log(e.response);
        setError({ state: true, msg: e.response.data.msg });
      });
  };

  //?Rendering all devices
  useEffect(() => {
    var token = localStorage.getItem('UserToken');
    var projectId = localStorage.getItem('project_id');
    axios
      .get(
        `http://10.10.64.11:5000/api/iot/v2.0/device/get-devices/?project_id=${projectId}`,
        // `http://localhost:5000/api/iot/v2.0/device/get-devices/?project_id=${projectId}`,
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
  }, [success]);

  return (
    <>
      <Helmet>
        <title>Customers | Material Kit</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            {/* <DialogTitle id="alert-dialog-title">
              {"Use Google's location service?"}
            </DialogTitle> */}
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                <TextField
                  fullWidth
                  label="Device Name"
                  margin="normal"
                  name="name"
                  onChange={(e) => setDeviceName(e.target.value)}
                  value={deviceName}
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  label="Device Purpose"
                  margin="normal"
                  name="purpose"
                  onChange={(e) => setDevicePurpose(e.target.value)}
                  value={devicePurpose}
                  variant="outlined"
                  // error={error.state}
                  // helperText={error.state ? error.msg : ''}
                />
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handleDeviceHandler}
                color="primary"
                disabled={validate()}
              >
                Submit
              </Button>
              <Button onClick={handleClose} color="primary" autoFocus>
                Close
              </Button>
            </DialogActions>
          </Dialog>
          <Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end'
              }}
            >
              <Button
                color="primary"
                variant="contained"
                onClick={handleClickOpen}
              >
                Add Device
              </Button>
            </Box>
          </Box>
          <Box sx={{ pt: 3 }}>
            <CustomerListResults customers={devices.deviceData} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default CustomerList;
