import { Helmet } from 'react-helmet';
import axios from 'axios';
import react, { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate, Navigate } from 'react-router-dom';
import {
  Box,
  Grid,
  Button,
  Link,
  TextField,
  Typography,
  Container
} from '@material-ui/core';
import ProductCard from 'src/components/product//ProductCard';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import CircularProgress from '@material-ui/core/CircularProgress';
import isAuth from '../hoc/IsAuth';
import { useSelector, useDispatch } from 'react-redux';

import * as authAction from '../store/actions/authAction';

const ProductList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authAction.refresh());
  }, []);

  var token = localStorage.getItem('UserToken');
  useEffect(() => {
    if (token) {
      navigate('/project');
    } else {
      navigate('/login');
    }
  }, []);

  const [projects, setProjects] = useState({
    projectData: []
  });
  const [open, setOpen] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [projectTopic, setProjectTopic] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [error, setError] = useState({ state: false, msg: '' });
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const validate = () => {
    if (
      projectName !== '' &&
      projectTopic !== '' &&
      projectDescription !== ''
    ) {
      return false;
    } else {
      return true;
    }
  };
  const handleProjectSubmit = () => {
    var token = localStorage.getItem('UserToken');

    axios
      .post(
        // 'http://localhost:5000/api/iot/v2.0/project/add-project',
        'http://10.10.64.11:5000/api/iot/v2.0/project/add-project',
        {
          pname: projectName,
          topic: projectTopic,
          description: projectDescription
        },
        {
          headers: {
            'x-auth-token': token,
            'Content-Type': 'application/json'
          }
        }
      )
      .then((suc) => {
        // console.log(suc);
        setSuccess(true);
        setProjectName('');
        setProjectTopic('');
        setProjectDescription('');
        handleClose();
      })
      .catch((e) => {
        // console.log(e.response);
        setError({ state: true, msg: e.response.data.msg });
      });
  };
  //?Rendering all projects
  useEffect(() => {
    var token = localStorage.getItem('UserToken');
    axios
      .get('http://10.10.64.11:5000/api/iot/v2.0/project/get-projects', {
        // .get('http://localhost:5000/api/iot/v2.0/project/get-projects', {
        headers: {
          'x-auth-token': token
        }
      })
      .then((projects) => {
        setIsLoading(false);
        setProjects({ ...projects, projectData: projects.data.projects });
      })
      .catch((e) => console.log(e));
  }, [success]);

  return (
    <>
      <Helmet>
        <title>Project | IoTDevLab</title>
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
                  label="Project Name"
                  margin="normal"
                  name="name"
                  onChange={(e) => setProjectName(e.target.value)}
                  value={projectName}
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  label="Project Description"
                  margin="normal"
                  name="description"
                  onChange={(e) => setProjectDescription(e.target.value)}
                  value={projectDescription}
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  label="Project Topic"
                  margin="normal"
                  name="topic"
                  onChange={(e) => setProjectTopic(e.target.value)}
                  value={projectTopic}
                  variant="outlined"
                  error={error.state}
                  helperText={error.state ? error.msg : ''}
                />
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handleProjectSubmit}
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
                Add product
              </Button>
            </Box>
          </Box>
          <Box sx={{ pt: 3 }}>
            {isLoading ? (
              <CircularProgress
                color="primary"
                style={{ marginLeft: '50%', marginTop: '15%' }}
              />
            ) : (
              <Grid container spacing={3}>
                {projects.projectData.map((product) => (
                  <Grid item key={product._id} lg={4} md={6} xs={12}>
                    <ProductCard product={product} />
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default ProductList;
