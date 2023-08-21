import { Route, Routes } from "react-router-dom";
import TestActivityPage from "./TestActivityPage";
import HomePage from "./HomePage";
import NotFoundPage from "./NotFoundPage";
import NavBar from "../components/NavBar";

export default function ProtectedRoutes() {
    return (
        <>
            <NavBar />
            <Routes>
                <Route index element={<HomePage />} />
                <Route
                    path="/task"
                    element={
                        <>
                            <h1>Hello</h1>
                        </>
                    }
                />
                <Route path="/activity" element={<TestActivityPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </>
    );
}
