import { ThemeProvider } from "@mui/material/styles";

import "./App.css";
import NotFoundPage from "./pages/NotFoundPage";

import HomePage from "./pages/HomePage";
import TestActivityPage from "./pages/TestActivityPage";
import TaskGenerator from "./pages/TaskGenerator";
import AuthPage from "./pages/AuthPage";
import { Route, Routes } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import "./App.css";
import RequireAuth from "./pages/RequireAuth";
import VKAuth from "./components/VkAuth";
import { theme } from "./theme";
import ExamPage from "./pages/ExamPage";

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
                    <Route path="/" element={<HomePage />} />

                    <Route path="/exam" element={<TaskGenerator />} />
                    <Route path="/exam/tasks" element={<ExamPage />} />
                    <Route path="/activity" element={<TestActivityPage />} />
                </Route>

                {/* 404 */}
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </ThemeProvider>
    );
}

export default App;
