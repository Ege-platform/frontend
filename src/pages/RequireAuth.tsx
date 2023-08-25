import { useLocation, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../feature/user/authSlice";
import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { useDispatch } from "react-redux";
import { setCredentials } from "../feature/user/authSlice";

export default function RequireAuth() {
    // get current path from router
    const location = useLocation();
    const currentToken = useSelector(selectCurrentToken);
    const dispatch = useDispatch();
    const [localToken, setLocalToken] = useState<string | null>(
        localStorage.getItem("token"),
    );

    useEffect(() => {
        // try to get token from local storage
        console.log(location.pathname);
        console.log(`token from local storage: ${localToken}`);
        console.log(`token from redux: ${currentToken}`);
        if (localToken != null) {
            dispatch(setCredentials({ accessToken: localToken, user: null }));
        }
    }, [currentToken]);

    return localToken != null ? (
        <NavBar />
    ) : (
        // <Navigate to={location.pathname} />
        <Navigate to="/auth" />
    );
}
