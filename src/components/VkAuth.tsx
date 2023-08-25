import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../feature/user/authSlice";
import { useLoginVkTokenMutation } from "../feature/user/authApiSlice";

function VKAuth() {
    const [code, setCode] = useState<string | null>(null);
    const [loginVkToken] = useLoginVkTokenMutation();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const code = queryParams.get("code");

        setCode(code);

        async function getAccess() {
            console.log(code);
            const data: any = await loginVkToken({ code: code! });
            // if data doesn't contain accessToken, then redirect to auth page
            if (!data.data.accessToken) {
                navigate("/auth");
                return;
            }
            dispatch(
                setCredentials({
                    accessToken: data.data.accessToken,
                    user: null,
                }),
            );
            navigate("/");
        }
        getAccess();
    }, []);

    return (
        <div>
            <p>Query Parameter 'code': {code}</p>
            {/* Render your component content */}
        </div>
    );
}

export default VKAuth;
