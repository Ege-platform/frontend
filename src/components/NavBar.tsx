import { useState, useEffect } from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import CircularProgressWithLabel from "./CircularProgressWithLabel";
import { Stack } from "@mui/material";
import AdbIcon from "@mui/icons-material/Adb";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
    selectCurrentUser,
    setCredentials,
    selectCurrentToken,
    logoutUser,
} from "../feature/user/authSlice";
import { useSelector } from "react-redux";
import { useGetCurrentUserMutation } from "../feature/user/authApiSlice";
import { useDispatch } from "react-redux";

export default function NavBar() {
    const navigate = useNavigate();
    const currentUser = useSelector(selectCurrentUser);
    const currentToken = useSelector(selectCurrentToken);
    const [getCurrentUser] = useGetCurrentUserMutation();

    const dispatch = useDispatch();

    const navLinks = [
        ["Вселенная", "/"],
        ["Генератор заданий", "/task"],
        ["Активность", "/activity"],
    ];

    const [userExperience, setUserExperience] = useState(0);
    const [userCoins, setUserCoins] = useState(0);

    useEffect(() => {
        let user = currentUser;
        async function fetchUser() {
            try {
                const data = await getCurrentUser({}).unwrap();
                console.log(`data:`, data);
                setUserCoins(data.coins);
                setUserExperience(data.experience);
                if (currentToken == null || currentToken == undefined) {
                    console.log(`currentToken is null`);
                    return;
                }
                dispatch(
                    setCredentials({
                        accessToken: currentToken,
                        user: data,
                    }),
                );
            } catch (e) {
                console.log("error", e);
            }
        }
        if (user != null) {
            setUserExperience(user.experience);
            setUserCoins(user.coins);
        } else {
            fetchUser();
            // console.log new store
            user = currentUser;
            console.log("fetch user", user);
            if (user == null) {
                console.log("user is null");
                return;
            }
            setUserExperience(user.experience);
            setUserCoins(user.coins);
        }
    }, []);

    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        // make AppBar fixed and add some styles such as background color white
        <>
            <AppBar position="static" color="inherit">
                <Container maxWidth="xl" sx={{}}>
                    <Toolbar disableGutters>
                        <AdbIcon
                            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
                        />
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                mr: 2,
                                display: { xs: "none", md: "flex" },
                                fontFamily: "monospace",
                                fontWeight: 700,
                                letterSpacing: ".3rem",
                                color: "inherit",
                                textDecoration: "none",
                            }}
                        >
                            LOGO
                        </Typography>

                        <Box
                            sx={{
                                flexGrow: 1,
                                display: { xs: "flex", md: "none" },
                            }}
                        >
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "left",
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "left",
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: "block", md: "none" },
                                }}
                            ></Menu>
                        </Box>
                        <AdbIcon
                            sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
                        />
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href=""
                            sx={{
                                mr: 2,
                                display: { xs: "flex", md: "none" },
                                flexGrow: 1,
                                fontFamily: "monospace",
                                fontWeight: 700,
                                letterSpacing: ".3rem",
                                color: "inherit",
                                textDecoration: "none",
                            }}
                        >
                            LOGO
                        </Typography>
                        <Box
                            sx={{
                                flexGrow: 1,
                                display: { xs: "none", md: "flex" },
                            }}
                        >
                            <Stack direction={"row"}>
                                {navLinks.map(([name, link]) => {
                                    return (
                                        <NavLink
                                            to={link}
                                            key={name}
                                            style={({ isActive }) => {
                                                return isActive
                                                    ? { color: "black" }
                                                    : { color: "gray" };
                                            }}
                                        >
                                            <Button
                                                sx={{
                                                    color: "inherit",
                                                    textDecoration: "none",
                                                }}
                                                onClick={() =>
                                                    navigate(link[1])
                                                }
                                            >
                                                {name}
                                            </Button>
                                        </NavLink>
                                    );
                                })}
                            </Stack>
                        </Box>
                        <Box sx={{ flexGrow: 1 }}>
                            {/* logout button */}
                            <Button
                                variant="outlined"
                                sx={{
                                    color: "inherit",
                                    borderColor: "inherit",
                                    textDecoration: "none",
                                }}
                                onClick={() => {
                                    dispatch(logoutUser());
                                    navigate("/");
                                }}
                            >
                                Выйти
                            </Button>
                        </Box>

                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <Avatar
                                    alt="Remy Sharp"
                                    src="/static/images/avatar/2.jpg"
                                />
                            </Tooltip>
                        </Box>
                        <Box sx={{ flexGrow: 0 }}>
                            <Typography> {userCoins}</Typography>
                        </Box>
                        <Box sx={{ flexGrow: 0 }}>
                            <CircularProgressWithLabel value={userExperience} />
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            <Outlet />
        </>
    );
}
