import {
    Stack,
    Button,
    Container,
    CssBaseline,
    Box,
    Grid,
    TextField,
    CircularProgress,
} from "@mui/material";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import {
    useLoginMutation,
    useGetCurrentUserMutation,
} from "../feature/user/authApiSlice";
import { setCredentials, setUser } from "../feature/user/authSlice";

export default function SignInForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [login, { isLoading }] = useLoginMutation();
    const [getCurrentUser] = useGetCurrentUserMutation();

    const [error, setError] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleLogin(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            const data = await login({
                username: email,
                password: password,
            }).unwrap();

            dispatch(
                setCredentials({ accessToken: data.accessToken, user: null }),
            );
            navigate("/home");
        } catch (err: any) {
            if (err.response) {
                setError("Network error");
            } else if (err.response.status === 400) {
                setError("Invalid credentials");
            } else if (err.response.status === 401) {
                setError("Unauthorized");
            } else {
                setError("Login error");
            }
            console.log(error);
        }
    }

    return (
        <>
            {isLoading ? (
                <CircularProgress />
            ) : (
                <Box
                    component="form"
                    onSubmit={handleLogin}
                    sx={{ ml: 2, pl: 2 }}
                >
                    <Stack direction="column">
                        <Container component="main" maxWidth="xs">
                            <CssBaseline />
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                }}
                            >
                                <Box>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <TextField
                                                required
                                                fullWidth
                                                id="email"
                                                label="Email"
                                                name="email"
                                                autoComplete=""
                                                value={email}
                                                onChange={(e) =>
                                                    setEmail(e.target.value)
                                                }
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                required
                                                fullWidth
                                                name="password"
                                                label="Пароль"
                                                type="password"
                                                id="password"
                                                autoComplete=""
                                                value={password}
                                                onChange={(e) =>
                                                    setPassword(e.target.value)
                                                }
                                            />
                                        </Grid>
                                    </Grid>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                    >
                                        Войти
                                    </Button>
                                </Box>
                            </Box>
                        </Container>
                    </Stack>
                </Box>
            )}
        </>
    );
}
