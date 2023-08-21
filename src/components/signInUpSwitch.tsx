import { Button, Stack, Box } from "@mui/material";

interface SwitchProps {
    isSignIn: boolean;
    handleSignInButton: () => void;
    handleSignUpButton: () => void;
}

export default function SignInUpSwitch(props: SwitchProps) {
    let { isSignIn, handleSignInButton, handleSignUpButton } = props;

    return (
        <Box
            sx={{
                marginTop: 8,
                marginBottom: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <Stack
                direction="row"
                spacing={2}
                justifyContent="center"
                alignItems="center"
            >
                <Button
                    variant="text"
                    size="small"
                    style={{
                        borderBottom: isSignIn
                            ? "4px solid #605DE3"
                            : "4px solid #fff",
                        borderRadius: 0,
                        width: 140,
                    }}
                    onClick={handleSignInButton}
                >
                    Войти
                </Button>
                <Button
                    variant="text"
                    size="small"
                    style={{
                        borderBottom: isSignIn
                            ? "4px solid #fff"
                            : "4px solid #605DE3",
                        borderRadius: 0,
                        width: 140,
                    }}
                    onClick={handleSignUpButton}
                >
                    Регистрация
                </Button>
            </Stack>
        </Box>
    );
}
