import {
    MenuOutlined,
    BellOutlined,
    ShoppingCartOutlined,
} from "@ant-design/icons";
import { Drawer, Layout, Menu, Space, Avatar, Dropdown } from "antd";
import { MenuItemType } from "antd/es/menu/hooks/useItems";
import { useEffect, useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";

const { Header, Footer, Sider, Content } = Layout;

const headerStyle: React.CSSProperties = {
    textAlign: "center",
    width: "100%",
    padding: 0,

    lineHeight: "64px",
};

const contentStyle: React.CSSProperties = {
    minHeight: "100%",
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

export default function TestNav() {
    const location = useLocation();
    const [openMenu, setOpenMenu] = useState(false);
    // const path = location.pathname;
    const [path, setPath] = useState("map");

    useEffect(() => {
        setPath(location.pathname);
    }, [location]);

    return (
        <Layout style={{ width: "100%", height: "100%" }}>
            <Header style={headerStyle}>
                <div className="navBarMobile">
                    <MenuOutlined
                        onClick={() => {
                            setOpenMenu(true);
                        }}
                    />

                    <div className="buttonBar">
                        <Space size={"middle"}>
                            <BellOutlined
                                style={{
                                    fontSize: "20px",
                                    color: "#7e7c89",
                                }}
                            />
                            <ShoppingCartOutlined
                                style={{
                                    fontSize: "20px",
                                    color: "#7e7c89",
                                }}
                            />
                            <Dropdown menu={{ items: profileDropDownItems }}>
                                <Avatar />
                            </Dropdown>
                        </Space>
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
                            <BellOutlined
                                style={{
                                    fontSize: "20px",
                                    color: "#7e7c89",
                                }}
                            />
                            <ShoppingCartOutlined
                                style={{
                                    fontSize: "20px",
                                    color: "#7e7c89",
                                }}
                            />
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

            <Footer style={footerStyle}>Footer</Footer>
        </Layout>
    );
}
