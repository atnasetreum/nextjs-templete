import { FormEvent, useState, useEffect, useContext } from 'react';

import { NextPage } from 'next';
import { useRouter } from 'next/router';

import {
  Avatar,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container,
} from '@mui/material';
import {
  LockOutlined as LockOutlinedIcon,
  Send as SendIcon,
} from '@mui/icons-material';
import LoadingButton from '@mui/lab/LoadingButton';

import { useNotify } from '@hooks';
import { isValidEmail } from '@utils';
import { users } from '@database/seeds/user.seed';
import { environments } from '@enums';
import { routesConstants } from '@constants';
import { AuthContext } from '@contexts/auth';

const isDev = process.env.NODE_ENV === environments.dev;

function Copyright() {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      sx={{ mt: 8, mb: 4 }}
    >
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const LoginPage: NextPage = () => {
  const { loading, loginUser } = useContext(AuthContext);
  const { notify } = useNotify();
  const router = useRouter();
  const [remember, setRemember] = useState(false);
  const [emailInput, setEmailInput] = useState(isDev ? users[0].email : '');
  const [passwordInput, setPasswordInput] = useState(
    isDev ? users[0].password : '',
  );

  useEffect(() => {
    const emailCache = localStorage.getItem('email') || '';
    if (emailCache.trim()) {
      setEmailInput(emailCache);
      setRemember(true);
    }
  }, []);

  useEffect(() => {
    if (remember && emailInput.trim()) {
      localStorage.setItem('email', emailInput);
    } else if (!remember) {
      localStorage.setItem('email', '');
    }
  }, [remember, emailInput]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email = emailInput.trim();
    const password = passwordInput.trim();

    if (!email) return notify('Add your email');

    if (!isValidEmail(email)) return notify('Invalid email format');

    if (!password) return notify('Add your password');

    const isValidLogin = await loginUser(email, password);

    if (!isValidLogin) {
      return notify('Invalid credentials');
    }

    router.replace(routesConstants.root);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={emailInput}
            onChange={({ target: { value } }) => setEmailInput(value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={passwordInput}
            onChange={({ target: { value } }) => setPasswordInput(value)}
          />
          <FormControlLabel
            control={
              <Checkbox
                value={remember}
                color="primary"
                onChange={({ target: { checked } }) => setRemember(checked)}
              />
            }
            label="Remember me"
          />
          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            loading={loading}
            loadingPosition="start"
            startIcon={<SendIcon />}
          >
            Sign In
          </LoadingButton>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright />
    </Container>
  );
};

export default LoginPage;
