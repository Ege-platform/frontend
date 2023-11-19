import {
    MenuOutlined,
    BellOutlined,
    ShoppingCartOutlined,
} from "@ant-design/icons";
import { Drawer, Layout, Menu, Space, Avatar, Dropdown } from "antd";
import { MenuItemType } from "antd/es/menu/hooks/useItems";
import { useState } from "react";
import { Outlet, Link } from "react-router-dom";

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
        key: "home",
        label: <Link to="/">Вселенная</Link>,
    },
    {
        key: "task",
        label: <Link to="/task">Задачи</Link>,
    },
    {
        key: "library",
        label: <Link to="/lib">Задачи</Link>,
    },
];

function AppMenu({ isInline = false }) {
    return (
        <>
            <Menu
                style={{ border: "none" }}
                items={navItems}
                mode={isInline ? "inline" : "horizontal"}
            />
        </>
    );
}

export default function TestNav() {
    const [openMenu, setOpenMenu] = useState(false);

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
                    <AppMenu />
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
                    <AppMenu isInline />
                </Drawer>
            </Header>
            <Content style={contentStyle}>
                <Outlet />
            </Content>

            <Footer style={footerStyle}>Footer</Footer>
        </Layout>
    );
}
