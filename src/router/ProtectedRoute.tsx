import { rootStore } from "../stores/RootStore";
import { observer } from "mobx-react-lite";
import { Navigate } from "react-router-dom";
import TestNav from "../components/NavBar";
import { UserApiServiceInstance } from "../api/UserApiService";
import { useEffect, useState } from "react";

const ProtectedRoute = observer(() => {
    const [component, setComponent] = useState<JSX.Element | null>(null);

    useEffect(() => {
        UserApiServiceInstance.getUserData()
            .then((userData) => {
                if (!userData) {
                    throw new Error("User not found");
                }
                rootStore.setUser(userData);
                setComponent(<TestNav />);
            })
            .catch(() => {
                setComponent(<Navigate to="/login" replace />);
            });
    }, []);

    return component;
});

export default ProtectedRoute;
