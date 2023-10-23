import { Navigate } from "react-router-dom";

import { useEffect, useState } from "react";

import NavBar from "./NavBar";

export default function RequireAuth() {
    // get current path from router
    const [localToken, setLocalToken] = useState<string | null>(
        localStorage.getItem("token"),
    );

    useEffect(() => {
        setLocalToken(localStorage.getItem("token"));
        // console.log(location.pathname);
        // console.log(`token from local storage: ${localToken}`);
    }, []);

    return localToken != null ? <NavBar /> : <Navigate to="/" />;
}
