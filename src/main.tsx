import { ConfigProvider } from "antd";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, Routes, Route, BrowserRouter } from "react-router-dom";
import { router } from "./router";
import Login from "./pages/login";
import Register from "./pages/register";
import "./index.css";
import NavBar from "./pages/navBar";

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
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/" element={<NavBar />}>
                        <Route path="me" element={<div>Profile</div>} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </ConfigProvider>
    </React.StrictMode>,
);
