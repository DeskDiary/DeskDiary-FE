import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControlLabel,
  TextField,
  Typography
} from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

type LoginProps = {};

const Login: React.FC<LoginProps> = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // 이벤트의 기본 동작 ( 리렌더링 ) 차단
    const data = new FormData(event.currentTarget); // form 내의 데이터를 읽어온다. name 속성을 키로 그 값들을 가지고 있다.
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <div>
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
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
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
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <div className="flex flex-row items-center justify-between text-xs">
              <div>
                <Link to={'/'} className='text-gray-500'>Forgot password?</Link>
              </div>
              <div>
                <Link to={'/signup'} className='text-gray-500'>{"Don't have an account? Sign Up"}</Link>
              </div>
            </div>
          </Box>
        </Box>
      </Container>
    </div>
  );
};
export default Login;
