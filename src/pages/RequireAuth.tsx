import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../feature/user/authSlice";
import { useEffect } from "react";
import NavBar from "../components/NavBar";
import { useDispatch } from "react-redux";
import { setCredentials } from "../feature/user/authSlice";

export default function RequireAuth() {
    const dispatch = useDispatch();
    const location = useLocation();
    const token = useSelector(selectCurrentToken);

    useEffect(() => {
        console.log(`RequireAuth token: `, token);
        if (token == null) {
            // try to get token from local storage
            const token = localStorage.getItem("token");
            console.log(`token from local storage: ${token}`);
            if (token != null) {
                dispatch(setCredentials({ accessToken: token, user: null }));
            } else {
                console.log(`RequireAuth: token is null`);
            }
        }
    }, [token]);

    return token ? <NavBar /> : <Navigate to="/" state={{ from: location }} />;
}
