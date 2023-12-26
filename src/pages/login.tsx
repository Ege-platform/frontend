import { useState } from "react";
import { Content } from "antd/es/layout/layout";
import { Alert, Button, Col, Input, Row, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { rootStore } from "../stores/RootStore";

import vk from "../assets/vk.svg";
import logo from "../assets/logo.svg";
import { AuthApiServiceInstance } from "../api/AuthApiService";
import { UserApiServiceInstance } from "../api/UserApiService";

const LoginPage = observer(() => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState<boolean>(false);
    const [err, setErr] = useState<null | string>(null);

    const login = () => {
        setLoading(true);
        const fetchToken = async () => {
            console.log({
                username: username,
                password: password,
            });
            AuthApiServiceInstance.getAccessToken({
                username: username,
                password: password,
            })
                .then(() => {
                    UserApiServiceInstance.getUserData().then((userData) => {
                        if (!userData) {
                            return;
                        }
                        rootStore.setUser(userData);
                        navigate("/map");
                        return;
                    });
                })
                .catch(() => {
                    setErr("Введён неверный логин или пароль");
                })
                .finally(() => {
                    setLoading(false);
                });
        };
        fetchToken();
    };
    return (
        <Content>
            <Row
                justify={"center"}
                className="auth-content-row"
                gutter={[40, 40]}
            >
                <Col>
                    <Space direction="vertical" size="middle">
                        <Row align={"middle"} justify={"space-between"}>
                            <img src={logo} />
                            <h4>{import.meta.env.VITE_PROJECT_NAME} </h4>
                        </Row>
                        <Input
                            style={{
                                minWidth: "300px",
                            }}
                            size="large"
                            placeholder="Почта"
                            suffix={<UserOutlined />}
                            value={username}
                            onChange={(event) => {
                                setUsername(event.target.value);
                            }}
                        />
                        <Input.Password
                            size="large"
                            placeholder="Пароль"
                            value={password}
                            onChange={(event) => {
                                setPassword(event.target.value);
                            }}
                        />

                        {/* alert */}
                        {err && <Alert type="error" message={err} banner />}
                        <Link to="#">Забыли пароль?</Link>

                        <Button
                            style={{
                                minWidth: "300px",
                            }}
                            size="large"
                            type="primary"
                            onClick={login}
                            loading={loading}
                        >
                            Войти
                        </Button>
                        <div className="separator">Или с помощью</div>
                        <Button
                            style={{
                                minWidth: "300px",
                            }}
                            size="large"
                            type="default"
                            onClick={login}
                            loading={loading}
                        >
                            <img src={vk} width={40} height={40} />
                        </Button>

                        <div className="separator" />
                        <div className="question-container">
                            <span>Нет аккаунта?</span>
                            <Link to="/register">Зарегистрироваться</Link>
                        </div>
                    </Space>                
                </Col>
                <Col>
                    <h1>{import.meta.env.VITE_PROJECT_NAME}</h1>
                    <p>Какая информация у нас есть</p>
                </Col>
            </Row>
        </Content>
    );
});

export default LoginPage;
