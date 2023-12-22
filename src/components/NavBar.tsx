import { MenuOutlined } from "@ant-design/icons";
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
} from "antd";

import logo from "../assets/logo.svg";
import coinIcon from "../assets/coinIcon.svg";
import { useEffect, useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { rootStore } from "../stores/RootStore";

const { Header, Footer, Content } = Layout;

const headerStyle: React.CSSProperties = {
    textAlign: "center",
    width: "100%",
    padding: 0,

    lineHeight: "64px",
};

const contentStyle: React.CSSProperties = {
    minHeight: "100%",
    // marginLeft: "16px",
    // marginRight: "16px",
};

const footerStyle: React.CSSProperties = {
    textAlign: "center",
    color: "#fff",
    backgroundColor: "#10062B",
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
        label: <Link to="/map">Вселенная</Link>,
    },
    {
        key: "task",
        label: <Link to="/task">Задачи</Link>,
    },
    {
        key: "library",
        label: <Link to="/lib">Шпаргалки</Link>,
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
            onClick={(e) => {
                closeMenu();
            }}
        />
    );
}

const TestNav = observer(() => {
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

    return (
        <Layout
            style={{
                width: "100%",
                height: "100%",
                minHeight: "100vh",
            }}
        >
            <Header style={headerStyle}>
                <div>
                    <div className="buttonBar">
                        <Row align={"middle"}>
                            <Col span={6}>
                                <MenuOutlined
                                    onClick={() => {
                                        setOpenMenu(true);
                                    }}
                                />
                            </Col>
                            <Col span={12}>
                                <Row justify={"center"} align={"middle"}>
                                    <Col>
                                        <Typography.Title
                                            level={5}
                                            style={{ margin: 0 }}
                                        >
                                            {username}
                                        </Typography.Title>
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
                                                style={{ minHeight: "36px" }}
                                            />
                                            <p>{coins}</p>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={6}>
                                <Dropdown
                                    menu={{ items: profileDropDownItems }}
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
                <div className="navBar">
                    <AppMenu
                        pathName={path}
                        closeMenu={() => {
                            setOpenMenu(false);
                        }}
                    />
                    <div className="buttonBar">
                        <Space size={"middle"}>
                            <Dropdown menu={{ items: profileDropDownItems }}>
                                <Avatar />
                            </Dropdown>
                        </Space>
                    </div>
                </div>

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

            {/* <Footer style={footerStyle}>Footer</Footer> */}
        </Layout>
    );
});

export default TestNav;
