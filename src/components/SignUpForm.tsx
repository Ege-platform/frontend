import {
    Stack,
    Button,
    Container,
    CssBaseline,
    Box,
    Grid,
    TextField,
} from "@mui/material";
import { FormEvent, useState } from "react";

import CopyrightComponent from "../Copyright";

import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setCredentials } from "../feature/user/authSlice";
import { useRegisterMutation } from "../feature/user/authApiSlice";

export default function SignUpForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [register /*{ isLoading }*/] = useRegisterMutation();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleSignUp(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            const data = await register({
                username: username,
                email: email,
                password: password,
            }).unwrap();

            dispatch(
                setCredentials({ accessToken: data.accessToken, user: null }),
            );

            navigate("/");
        } catch (err: any) {
            if (err.response) {
                console.log(err.response);
            } else if (err.response.status === 400) {
                console.log(err.response);
            } else if (err.response.status === 401) {
                console.log(err.response);
            } else {
                console.log(err.response);
            }
            console.log(err);
        }
    }

    return (
        <Box component="form" onSubmit={handleSignUp} sx={{ ml: 2, pl: 2 }}>
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
                                        id="username"
                                        label="Никнейм"
                                        name="username"
                                        autoComplete=""
                                        value={username}
                                        onChange={(e) =>
                                            setUsername(e.target.value)
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email"
                                        name="email"
                                        autoComplete="email"
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
                                        autoComplete="new-password"
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
                                Регистрация
                            </Button>
                        </Box>
                    </Box>
                    <CopyrightComponent sx={{ mt: 5 }} />
                </Container>
            </Stack>
        </Box>
    );
}
