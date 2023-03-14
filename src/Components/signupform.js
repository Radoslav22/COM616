import PropTypes from "prop-types";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import GoogleIcon from '@mui/icons-material/Google'
import FacebookIcon from '@mui/icons-material/Facebook'
import { Alert } from "@mui/material";


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

function LoginForm(props) {
    const { onEmailSubmit, onSocialSubmit } = props;

    const theme = createTheme();

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
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>

                    <form onSubmit={handleSubmit(onEmailSubmit)} style={{ marginTop: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstname"

                                    fullWidth
                                    id="firstname"
                                    label="First Name"
                                    autoFocus

                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField

                                    fullWidth
                                    id="lastname"
                                    label="Last Name"
                                    name="lastname"
                                    autoComplete="family-name"

                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    type="text"
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"

                                    {...register("email")}
                                />
                                {errors?.email?.message && (
                                    <Alert severity="error">{errors.email.message}</Alert>
                                )}

                            </Grid>





                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    {...register("password")}

                                />

                                {errors?.password?.message && (
                                    <Alert severity="error">{errors.password.message}</Alert>
                                )}

                            </Grid>


                        </Grid>
                        <Button

                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                    </form>
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


                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link href="/login" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
                <Copyright sx={{ mt: 5 }} />
            </Container>
        </ThemeProvider >
    );
}

LoginForm.propTypes = {
    buttonText: PropTypes.string,
};

LoginForm.defaultProps = {
    buttonText: "JOIN",
};

export default LoginForm;