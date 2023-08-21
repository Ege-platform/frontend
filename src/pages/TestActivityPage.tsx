import { useEffect } from "react";

import { Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
// @ts-ignore
import H5pPlayer from "../components/H5pPlayer";

export default function TestActivityPage() {
    const navigate = useNavigate();

    return (
        <>
            <Container component={"main"}>
                <H5pPlayer />
            </Container>
        </>
    );
}
