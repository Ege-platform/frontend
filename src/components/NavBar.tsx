import { MenuOutlined, UserOutlined } from "@ant-design/icons";
import { observer } from "mobx-react-lite";
import {
    Drawer,
    Layout,
    Menu,
    Space,
    Avatar,
    Dropdown,
    Typography,
    Row,
    Col,
    Grid,
    Progress,
    theme,
} from "antd";

import logo from "../assets/logo.svg";
import coinIcon from "../assets/coinIcon.svg";
import { useEffect, useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { rootStore } from "../stores/RootStore";

const { useBreakpoint } = Grid;

const { Header, Footer, Content } = Layout;

const headerStyle: React.CSSProperties = {
    textAlign: "center",
    width: "100%",
    padding: 0,

    lineHeight: "64px",
};

const contentStyle: React.CSSProperties = {
    minHeight: "100%",
    overflowX: "hidden",
    // marginLeft: "16px",
    // marginRight: "16px",
};

const profileDropDownItems = [
    {
        key: "1",
        label: "Профиль",
    },
    {
        key: "2",
        label: "Выйти",
    },
];

const navItems = [
    {
        key: "map",
        label: (
            <Link to="/map" style={{ color: "#10062B" }}>
                Вселенная
            </Link>
        ),
        path: "/map",
    },
    {
        key: "task",
        label: (
            <Link to="/task" style={{ color: "#10062B" }}>
                Задачи
            </Link>
        ),
        path: "/task",
    },
    {
        key: "library",
        label: (
            <Link to="/lib" style={{ color: "#10062B" }}>
                Шпаргалки
            </Link>
        ),
        path: "/lib",
    },
];

type AppMenuProps = {
    isInline?: boolean;
    pathName?: string;
    closeMenu: () => void;
};

function AppMenu({ isInline = false, pathName = "", closeMenu }: AppMenuProps) {
    return (
        <Menu
            style={{ border: "none" }}
            items={navItems}
            selectedKeys={[pathName]}
            mode={isInline ? "inline" : "horizontal"}
            onClick={() => {
                closeMenu();
            }}
        />
    );
}

const TestNav = observer(() => {
    const screens = useBreakpoint();
    const location = useLocation();
    const [openMenu, setOpenMenu] = useState(false);
    const [coins, setCoins] = useState<number>(0);
    const [username, setUsername] = useState<string>("");
    // const path = location.pathname;
    const [path, setPath] = useState("map");

    useEffect(() => {
        if (rootStore.user) {
            setUsername(rootStore.user.username);
            setCoins(rootStore.user?.coins);
        } else {
            setUsername("Ник");
            setCoins(0);
        }

        setPath(location.pathname);
    }, [location]);

    console.log(screens);
    return (
        <Layout
            style={{
                width: "100%",
                height: "100%",
                minHeight: "100vh",
            }}
        >
            <Header style={headerStyle}>
                {!screens.lg && (
                    <div>
                        <div className="buttonBar">
                            <Row align={"middle"}>
                                <Col
                                    span={6}
                                    style={{
                                        display: "flex",
                                        alignContent: "start",
                                        padding: "16px",
                                    }}
                                >
                                    <MenuOutlined
                                        onClick={() => {
                                            setOpenMenu(true);
                                        }}
                                    />
                                </Col>
                                <Col span={12}>
                                    <Row justify={"center"} align={"middle"}>
                                        <Col>
                                            <Typography style={{ margin: 0 }}>
                                                {username}
                                            </Typography>
                                        </Col>
                                        <Col>
                                            <div
                                                style={{
                                                    border: "2px solid #605DE3",
                                                    borderRadius: "16px",
                                                    maxHeight: "36px",
                                                    maxWidth: "80px",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    fontSize: "16px",
                                                    fontWeight: "bold",
                                                }}
                                            >
                                                <img
                                                    src={coinIcon}
                                                    style={{
                                                        minHeight: "36px",
                                                    }}
                                                />
                                                <p>{coins}</p>
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col
                                    span={6}
                                    style={{
                                        display: "flex",
                                        justifyContent: "flex-end",
                                        padding: "10px",
                                    }}
                                >
                                    <Dropdown
                                        menu={{
                                            items: profileDropDownItems,
                                        }}
                                    >
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "center",
                                            }}
                                        >
                                            <img src={logo} />
                                        </div>
                                    </Dropdown>
                                </Col>
                            </Row>
                        </div>
                    </div>
                )}
                {screens.lg && (
                    <Row justify={"space-between"}>
                        <Col
                            lg={16}
                            xl={18}
                            xxl={20}
                            style={{
                                padding: "10px",
                            }}
                        >
                            <Row justify={"start"} align={"middle"}>
                                <img src={logo} style={{ height: "38px" }} />
                                {navItems.map((item) => (
                                    <Col
                                        key={item.key}
                                        style={{
                                            marginLeft: "20px",
                                            marginRight: "20px",
                                        }}
                                    >
                                        <Typography.Title
                                            level={5}
                                            style={{
                                                margin: 0,

                                                fontWeight:
                                                    useLocation().pathname.includes(
                                                        item.path,
                                                    )
                                                        ? "bold"
                                                        : "normal",
                                            }}
                                        >
                                            {item.label}
                                        </Typography.Title>
                                    </Col>
                                ))}
                            </Row>
                        </Col>

                        {/* AvatarLogo, coins, level */}
                        <Col lg={8} xl={6} xxl={4}>
                            <Row justify={"space-between"} align={"middle"}>
                                <Col>
                                    <Avatar
                                        shape="square"
                                        size={40}
                                        icon={<UserOutlined />}
                                    />
                                </Col>
                                <Col>
                                    <Typography
                                        style={{
                                            marginTop: 0,
                                            fontSize: "16px",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        {username}
                                    </Typography>
                                    <Typography
                                        style={{
                                            fontWeight: "bold",
                                            color: "#1E1E1E66",
                                        }}
                                    >
                                        Статус
                                    </Typography>
                                </Col>
                                <Col>
                                    <div
                                        style={{
                                            border: "2px solid #605DE3",
                                            borderRadius: "16px",
                                            maxHeight: "36px",
                                            maxWidth: "80px",
                                            display: "flex",
                                            alignItems: "center",
                                            fontSize: "16px",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        <img
                                            src={coinIcon}
                                            style={{
                                                minHeight: "36px",
                                            }}
                                        />
                                        <p>{coins}</p>
                                    </div>
                                </Col>
                                <Col>
                                    <Progress
                                        type="circle"
                                        size="small"
                                        trailColor="#605DE333"
                                        percent={72}
                                        strokeWidth={10}
                                        strokeColor="#605DE3"
                                        showInfo
                                        format={(percent) => (
                                            <span style={{ color: "#10062B" }}>
                                                {percent}%
                                            </span>
                                        )}
                                    />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                )}

                <Drawer
                    placement="left"
                    open={openMenu}
                    onClose={() => {
                        setOpenMenu(false);
                    }}
                    closable={true}
                    drawerStyle={{
                        border: "none",
                    }}
                >
                    <AppMenu
                        isInline
                        pathName={path}
                        closeMenu={() => {
                            setOpenMenu(false);
                        }}
                    />
                </Drawer>
            </Header>
            <Content style={contentStyle}>
                <Outlet />
            </Content>
        </Layout>
    );
});

export default TestNav;
