import { createBrowserRouter } from "react-router-dom";

import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";

import Map from "./pages/mapPage";
import World from "./pages/world";
import ProtectedRoute from "./router/ProtectedRoute";
import EgePage from "./pages/egeTask/index";
import TaskPage from "./pages/taskPage";

export const router = createBrowserRouter([
    {
        path: "/",
        children: [
            {
                path: "",
                element: <LoginPage />,
            },
            {
                path: "login",
                element: <LoginPage />,
            },
            {
                path: "register",
                element: <RegisterPage />,
            },
        ],
    },
    {
        path: "/",
        element: <ProtectedRoute />,
        children: [
            {
                path: "/map",
                element: <Map />,
            },
            {
                path: "/world/:worldName",
                element: <World />,
            },
            {
                path: "/task",
                element: <EgePage />,
            },
            {
                path: "/world/:worldName/:egeId",
                element: <TaskPage />,
            },
        ],
    },
]);
