import AuthPage from "./pages/auth.tsx";
import HomePage from "./pages/homePage.tsx";
import TaskPage from "./pages/taskPage.tsx";
import RequireAuth from "./components/RequireAuth.tsx";
import { Route, Routes } from "react-router-dom";
import VideoPage from "./pages/videoPage.tsx";

function App() {
    return (
        <Routes>
            <Route path="/auth" element={<AuthPage />} />

            {/* protected routes  */}
            <Route element={<RequireAuth />}>
                <Route path="/home" element={<HomePage />} />
                <Route path="/task" element={<TaskPage />} />
                <Route path="/video/" element={<VideoPage />} />
            </Route>
        </Routes>
    );
}

export default App;
