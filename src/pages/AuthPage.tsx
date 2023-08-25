import { Box, Stack, Card, Typography, IconButton } from "@mui/material";
import SignUpForm from "../components/SignUpForm";
import SignInForm from "../components/SignInForm";
import AuthVideo from "../components/landingPage";
import SignInUpSwitch from "../components/signInUpSwitch";
import { useState, useEffect } from "react";
// @ts-ignore
import TelegramLoginButton from "react-telegram-login";
import VkIcon from "../icons/vk";
import TelegramIcon from "../icons/telegram";
import { useTheme } from "@mui/material/styles";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
import {
    // useGetCurrentUserMutation,
    useLoginVkMutation,
} from "../feature/user/authApiSlice";
// import { setCredentials } from "../feature/user/authSlice";

export default function AuthPage() {
    const theme = useTheme();
    // const navigate = useNavigate();
    // const dispatch = useDispatch();
    // const [getCurrentUser] = useGetCurrentUserMutation();
    const [loginVk] = useLoginVkMutation();

    useEffect(() => {
        // try to get token from local storage
        const token: string | null = localStorage.getItem("token");
        console.log(`token from local storage: ${token}`);
        // if (token != null) {
        //     dispatch(setCredentials({ accessToken: token, user: null }));
        //     navigate("/");
        // }
    }, []);

    const [isSignIn, setIsSignIn] = useState<boolean>(true);

    const handleSignUpButton = () => {
        setIsSignIn(false);
    };

    const handleSignInButton = () => {
        setIsSignIn(true);
    };

    const handleVkAuth = async () => {
        try {
            const redirect_url = await loginVk({}).unwrap();
            console.log(`data: ${redirect_url}`);
            window.open(redirect_url, "_self");
        } catch (e) {
            console.log("error", e);
        }
    };

    return (
        <>
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    translate: "-50% -50%",
                }}
            >
                <Card sx={{ width: 1148, height: 551 }}>
                    <Stack direction="row" spacing={3}>
                        <Stack
                            direction="column"
                            alignContent={"center"}
                            justifyItems={"center"}
                        >
                            <Typography variant="h1"> Лого</Typography>
                            <SignInUpSwitch
                                isSignIn={isSignIn}
                                handleSignInButton={handleSignInButton}
                                handleSignUpButton={handleSignUpButton}
                            />
                            {isSignIn ? <SignInForm /> : <SignUpForm />}
                            <Stack
                                direction="row"
                                spacing={1}
                                justifyItems={"center"}
                            >
                                <Typography variant="body1">
                                    Или войдите через
                                </Typography>
                                <IconButton onClick={handleVkAuth}>
                                    <VkIcon
                                        height={40}
                                        width={40}
                                        fill={theme.palette.primary.main}
                                    />
                                </IconButton>
                                <IconButton
                                    onClick={() => {
                                        console.log("google login");
                                    }}
                                >
                                    <TelegramIcon
                                        height={40}
                                        width={40}
                                        fill={theme.palette.primary.main}
                                    />
                                </IconButton>
                            </Stack>
                            <TelegramLoginButton
                                dataOnauth={() => {
                                    console.log("telegram login");
                                }}
                                botName="dorogoy_dnevnik_bot"
                            />
                        </Stack>
                        <AuthVideo />
                    </Stack>
                </Card>
            </Box>
        </>
    );
}
