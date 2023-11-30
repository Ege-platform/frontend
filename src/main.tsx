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
                },
            }}
        >
            <RouterProvider router={router} />
            {/* <Routes>
                    <Route path="/test" element={<Test />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/" element={<TestNav />}>
                        <Route path="/" element={<Map />} />
                        <Route path="me" element={<div></div>} />

                        <Route path="task" element={<TaskPage />} />
                    </Route>
                </Routes> */}
        </ConfigProvider>
    </React.StrictMode>,
);
