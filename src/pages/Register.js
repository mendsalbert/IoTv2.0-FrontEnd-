import { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
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
import FacebookIcon from 'src/icons/Facebook';
import GoogleIcon from 'src/icons/Google';
import CircularProgress from '@material-ui/core/CircularProgress';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState({ state: false, msg: '' });
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const submitSignUpHandler = (e) => {
    setIsLoading(true);
    e.preventDefault();
    dispatch(authAction.signUp(username, email, password))
      .then(() => {
        setUsername('');
        setEmail('');
        setPassword('');
        setIsLoading(false);
        setError('');
        navigate('/project');
      })
      .catch((e) => {
        setError({ state: true, msg: e.response.data.msg });
        setEmail('');
        setPassword('');
        setIsLoading(false);
      });
  };

  const validate = () => {
    if (email !== '' && password !== ' ' && username !== '') {
      return false;
    } else {
      return true;
    }
  };

  return (
    <>
      <Helmet>
        <title>Register | IoTDevLab</title>
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
              Create new account
            </Typography>
          </Box>
          <Box
            sx={{
              pb: 1,
              pt: 3
            }}
          ></Box>
          <TextField
            fullWidth
            label="username"
            margin="normal"
            name="User name"
            onChange={(e) => setUsername(e.target.value)}
            type="username"
            value={username}
            variant="outlined"
          />
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
              onClick={submitSignUpHandler}
            >
              {isLoading ? (
                <CircularProgress
                  color="secondary"
                  style={{ color: 'white', marginRight: '10px' }}
                />
              ) : (
                ' Sign up now'
              )}
            </Button>
          </Box>
          <Typography color="textSecondary" variant="body1">
            Have an account?{' '}
            <Link component={RouterLink} to="/login" variant="h6">
              Sign in
            </Link>
          </Typography>
        </Container>
      </Box>
    </>
  );
};

export default Login;
