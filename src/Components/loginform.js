import React from 'react';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import Logo from '../assets/Logo.png'
import { styled } from '@mui/material/styles';

import { Alert } from '@mui/material';
const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '20vw',
    maxHeight: '20vh',
});

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                SeatMeNow
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

export default function SignIn(props) {
    const { onEmailSubmit, onSocialSubmit } = props;


    const loginFormSchema = yup
        .object({
            email: yup
                .string()
                .email("please enter a valid email")
                .required("please enter a email"),
            password: yup
                .string()
                .required("please enter a password")
                .min(5, "password must be 5 characters long"),
        })
        .required();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(loginFormSchema),
    });




    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                ><Img src={Logo} alt="System-Logo" />

                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form onSubmit={handleSubmit(onEmailSubmit)} sx={{ mt: 1 }}>
                        <Grid container spacing={0.5}>
                            <Grid item xs={12}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                    {...register("email")}
                                />
                                {errors?.email?.message && (
                                    <Alert severity="error">{errors.email.message}</Alert>
                                )}
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    {...register("password")}
                                />
                                {errors?.password?.message && (
                                    <Alert severity="error">{errors.password.message}</Alert>
                                )}
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox value="remember" color="primary" />}
                                    label="Remember me"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2, backgroundColor: "#CBA500" }}
                                >
                                    Continue
                                </Button>

                            </Grid>
                        </Grid>

                    </form>
                    <Typography component="h2" style={{ textAlign: "center" }}>OR</Typography>
                    <Button
                        startIcon={<FacebookIcon />}
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        color="inherit"
                        onClick={() => onSocialSubmit("facebook")}
                    >
                        Continue with Facebook
                    </Button>
                    <Button
                        startIcon={<GoogleIcon />}
                        type="submit"

                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        color="inherit"
                        onClick={() => onSocialSubmit("google")}
                    >
                        Continue with Google
                    </Button>

                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="/signup" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>

                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider >
    );
}