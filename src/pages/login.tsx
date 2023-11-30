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
                .then((res) => {
                    UserApiServiceInstance.getUserData().then((userData) => {
                        console.log(userData);
                        rootStore.setUser(userData);
                        navigate("/map");
                        return;
                    });
                })
                .catch((err) => {
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
                            <h4>Название проекта </h4>
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
                    <h1>Название проекта</h1>
                    <p>Какая информация у нас есть</p>
                </Col>
            </Row>
        </Content>
    );
});

export default LoginPage;
//    <div className="bg-background">
//        {/* login container  */}
//        <div className="min-w-min grid px-5 gap-4 mt-5 bg-white h-min">
//            <div className=" flex justify-start items-center space-x-10">
//                <img src={logo} />
//                <h4>Название проекта </h4>
//            </div>

//                <button onClick={toggleShowPassword}>
//                    {/* {showPassword ? (
//                         <ActionHidePassword />
//                     ) : (
//                         <ActionDisplayPassword />
//                     )} */}
//                </button>
//            </div>

//            <div className="flex items-center">
//                <hr className="w-full border-gray-300 border-1" />
//                <span className="px-1 text-gray-500">Или с помощью</span>
//                <hr className="w-full border-gray-300 border-1" />
//            </div>
//            <button className="border-2 border-accent rounded h-12 flex items-center justify-center">
//                <img src={vk} className="h-[40px] w-[40px] mt-5" />
//            </button>
//        </div>
//        {/* info container */}
//        <div className="grid px-5 gap-4 mt-5 bg-black h-min">
//            <h2>Привет</h2>
//        </div>
//    </div>;
