import { ConfigProvider } from "antd";
import React from "react";
import ReactDOM from "react-dom/client";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import Login from "./pages/login";
import Register from "./pages/register";
import TestNav from "./components/NavBar";
import Map from "./pages/mapPage";
import Test from "./pages/test";

import "./index.css";
import TaskPage from "./pages/taskPage";

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
                },
            }}
        >
            <BrowserRouter>
                <Routes>
                    <Route path="/test" element={<Test />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/" element={<TestNav />}>
                        <Route path="/" element={<Map />} />
                        <Route path="me" element={<div></div>} />

                        <Route path="task" element={<TaskPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </ConfigProvider>
    </React.StrictMode>,
);
