import { createTheme, ThemeProvider } from "@mui/material/styles";

import "./App.css";
import NotFoundPage from "./pages/NotFoundPage";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import TestActivityPage from "./pages/TestActivityPage";
import NewMapPage from "./pages/NewMapPage";
import AuthPage from "./pages/AuthPage";
import { Route, Routes } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import "./App.css";
import RequireAuth from "./pages/RequireAuth";
import VKAuth from "./components/VkAuth";
import { theme } from "./theme";

function App() {
    // create 4 colors for task selector

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Routes>
                {/* public routes */}
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/auth/vk" element={<VKAuth />} />

                {/* protected routes */}
                <Route element={<RequireAuth />}>
                    <Route index element={<HomePage />} />
                    <Route path="/task" element={<NewMapPage />} />
                    <Route path="/activity" element={<TestActivityPage />} />
                </Route>

                {/* 404 */}
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </ThemeProvider>
    );
}

export default App;
