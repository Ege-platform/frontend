import AuthPage from "./pages/auth.tsx";
import ThemeTaskPage from "./pages/themeTasksPage.tsx";
import TaskPage from "./pages/taskPage.tsx";
import RequireAuth from "./components/RequireAuth.tsx";
import { Route, Routes } from "react-router-dom";
import VideoPage from "./pages/videoPage.tsx";

function App() {
    // http://larek.itatmisis.ru:9999/static/h5p/russian-20-4/h5p.json

    // http://larek.itatmisis.ru:9999/static/h5p/russian-18-3/h5p.json

    const tasks = [
        {
            number: 1,
            id: "russian-20-4",
        },
        {
            number: 2,
            id: "russian-18-3",
        },
    ];

    return (
        <Routes>
            <Route path="/" element={<AuthPage />} />

            {/* protected routes  */}
            <Route element={<RequireAuth />}>
                <Route path="/home" element={<ThemeTaskPage tasks={tasks} />} />
                <Route path="/task" element={<TaskPage />} />
                <Route path="/video/:videoId" element={<VideoPage />} />
            </Route>
        </Routes>
    );
}

export default App;
