import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../feature/user/authSlice";
import { useLoginVkMutation } from "../feature/user/authApiSlice";
import { get } from "video.js/dist/types/tech/middleware";

function VKAuth(props: any) {
    const [code, setCode] = useState<string | null>(null);
    const [loginVkToken] = useLoginVkMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const code = queryParams.get("code");
        setCode(code);
        async function getAccess() {
            const accessToken = await loginVkToken({ code: code! });
            dispatch(setCredentials({ accessToken: accessToken, user: null }));
            navigate("/home");
            console.log(`accessToken: ${accessToken}`);
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
