import { createTheme, ThemeProvider } from "@mui/material/styles";

import "./App.css";
import NotFoundPage from "./pages/NotFoundPage";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import TestActivityPage from "./pages/TestActivityPage";
import AuthPage from "./pages/AuthPage";
import { Route, Routes } from "react-router-dom";
import ProtectedRoutes from "./pages/ProtectedRoutes";
import { CssBaseline } from "@mui/material";
import "./App.css";
import RequireAuth from "./pages/RequireAuth";
import VKAuth from "./components/VkAuth";

function App() {
    const theme = createTheme({
        palette: {
            primary: {
                main: "#605DE3",
            },
            secondary: {
                main: "#605DE380",
            },
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Routes>
                {/* public routes */}
                <Route index element={<AuthPage />} />
                <Route path="/auth/vk" element={<VKAuth />} />

                {/* protected routes */}
                <Route element={<RequireAuth />}>
                    <Route path="/home" element={<HomePage />} />
                    <Route
                        path="/task"
                        element={
                            <>
                                <h1>Hello</h1>
                            </>
                        }
                    />
                    <Route path="activity" element={<TestActivityPage />} />
                </Route>
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </ThemeProvider>
    );
}

export default App;
