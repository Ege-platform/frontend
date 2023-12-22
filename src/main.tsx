import { ConfigProvider } from "antd";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, RouterProvider } from "react-router-dom";

// import LoginPage from "./pages/login";
// import RegisterPage from "./pages/register";
// import TestNav from "./components/NavBar";
// import Map from "./pages/mapPage";
// import Test from "./pages/norm";

import "./index.css";
// import TaskPage from "./pages/taskPage";
import { router } from "./routes";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: "#605DE3",
                    colorPrimaryActive: "#605DE399",
                    colorPrimaryBorder: "#9747FF",
                    colorPrimaryHover: "#605DE310",
                },
                components: {
                    Layout: {
                        headerBg: "#FFF",
                    },
                    Progress: {
                        circleTextColor: "#fff",
                        defaultColor: "#fff",
                    },
                    Typography: {
                        titleMarginTop: 0,
                        titleMarginBottom: 0,
                    },
                },
            }}
        >
            <RouterProvider router={router} />
        </ConfigProvider>
        ,
    </React.StrictMode>,
);
