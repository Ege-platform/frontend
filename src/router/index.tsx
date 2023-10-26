import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/login";
import Register from "../pages/register";
import NavBar from "../pages/navBar";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <div>Hello world</div>,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    },
    {
        path: "/home",
        element: <NavBar />,
    },
    {
        path: "/home/me",
        element: <div>Profile</div>,
    },
]);
