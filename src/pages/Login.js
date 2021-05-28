import { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useDispatch } from 'react-redux';
import * as authAction from '../store/actions/authAction';
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography
} from '@material-ui/core';

import CircularProgress from '@material-ui/core/CircularProgress';

const Login = (props) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({ state: false, msg: '' });
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authAction.refresh());
  }, []);

  const submitSignInHandler = (e) => {
    setIsLoading(true);
    e.preventDefault();
    dispatch(authAction.signIn(email, password))
      .then((suc) => {
        setError('');
        setEmail('');
        setPassword('');
        setIsLoading(false);
        navigate('/project');
      })
      .catch((e) => {
        console.log(e);
        setError({ state: true, msg: e.response.data.msg });
        setEmail('');
        setPassword('');
        setIsLoading(false);
      });
  };
  const validate = () => {
    if (email !== '' && password !== '') {
      return false;
    } else {
      return true;
    }
  };
  return (
    <>
      <Helmet>
        <title>Login | IoTDevLab</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center'
        }}
      >
        <Container maxWidth="sm">
          <Box sx={{ mb: 3 }}>
            <Typography color="textPrimary" variant="h2">
              Sign in
            </Typography>
          </Box>
          <Box
            sx={{
              pb: 1,
              pt: 3
            }}
          ></Box>
          <TextField
            error={error.state}
            fullWidth
            helperText={error.state ? error.msg : ''}
            label="Email Address"
            margin="normal"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            value={email}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Password"
            margin="normal"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            value={password}
            variant="outlined"
          />
          <Box sx={{ py: 2 }}>
            <Button
              color="primary"
              disabled={validate()}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              onClick={submitSignInHandler}
            >
              {isLoading ? (
                <CircularProgress
                  color="secondary"
                  style={{ color: 'white', marginRight: '10px' }}
                />
              ) : (
                ' Sign in now'
              )}
            </Button>
          </Box>
          <Typography color="textSecondary" variant="body1">
            Don&apos;t have an account?{' '}
            <Link component={RouterLink} to="/register" variant="h6">
              Sign up
            </Link>
          </Typography>
        </Container>
      </Box>
    </>
  );
};

export default Login;
