import { useEffect } from 'react';
import { Box, Button, Container } from '@mui/material'
import GoogleIcon from '@mui/icons-material/Google';
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../../constants.ts';
import Axios from 'axios';
import * as AuthAPI from '../../api/AuthAPI'

export default function Login() {

  const navigate = useNavigate();

  const signInHandler = () => {
    window.open(`${BASE_URL}/auth/google`, '_self', 'toolbar=no, scrollbars=yes, resizable=no, width=1000, height=auto');
  }

  useEffect(() => {
    AuthAPI.success()
    .then((res) => {
      if (res.status == 200) {
        navigate('/');
      } else {
        console.log("No status");
      }
    })
    .catch((err) => console.log(err));
  }, []);

  return (
    <Container>
      {/* Login form container */}
      <Box
        sx={{
          display:'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap:'1rem',
          height: '90vh'
        }}
      >
        <h4>Sign in with Google to Continue</h4>
        <Button
          variant='outlined'
          sx={{
            borderRadius: '3rem',
            display:'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '10px',
            padding: '1rem 2rem'
          }}
          onClick={signInHandler}
        >
          <GoogleIcon/>
          Sign in
        </Button>
      </Box>
    </Container>
  )
}
