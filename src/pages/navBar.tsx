import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import {
    UserOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    BookOutlined,
    BellOutlined,
    ShoppingCartOutlined,
    ArrowLeftOutlined,
} from "@ant-design/icons";
import { Dropdown, Button, Layout, Menu, MenuProps, Avatar, Space } from "antd";
import logo from "../assets/logo.svg";

const { Header, Content, Sider } = Layout;

const navItems = [
    {
        key: "Вселенная",
        icon: <UserOutlined />,
        label: "Вселенная",
    },
    {
        key: "Задания",
        icon: <BookOutlined />,
        label: "Задания",
    },
    {
        key: "Теория",
        icon: <BookOutlined />,
        label: "Теория",
    },
];

const profileDropDownItems: MenuProps["items"] = [
    {
        key: "1",
        label: <Link to="/me">Профиль</Link>,
        icon: <UserOutlined />,
    },
    {
        key: "2",
        label: <Link to="/logout">Выйти</Link>,
        icon: <ArrowLeftOutlined />,
    },
];

export default function NavBar() {
    const [collapsed, setCollapsed] = useState<boolean>(true);

    return (
        <Layout>
            <Sider
                trigger={null}
                breakpoint="md"
                collapsedWidth="0"
                collapsed={collapsed}
                onBreakpoint={(broken) => {
                    setCollapsed(broken);
                    console.log(broken);
                }}
                onCollapse={(collapsed, type) => {
                    console.log(collapsed, type);
                }}
            >
                <Menu
                    mode="inline"
                    defaultSelectedKeys={["1"]}
                    defaultOpenKeys={["sub1"]}
                    style={{ height: "100%", borderRight: 0 }}
                    items={navItems}
                />
            </Sider>
            <Header
                className="navbar"
                style={{
                    minWidth: collapsed ? "100%" : "80%",
                }}
            >
                <div className="logo">
                    <Button
                        type="text"
                        icon={
                            collapsed ? (
                                <MenuUnfoldOutlined />
                            ) : (
                                <MenuFoldOutlined />
                            )
                        }
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: "16px",
                            width: 32,
                            height: 32,
                        }}
                    />

                    <img
                        style={{ paddingTop: "10px" }}
                        src={logo}
                        width={32}
                        height={32}
                    />
                </div>
                <div className="buttonBar">
                    <Space direction="horizontal" size={"middle"}>
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
            </Header>
            <Content >
                <Outlet />
            </Content>
        </Layout>
    );
}
