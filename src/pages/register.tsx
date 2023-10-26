import { useEffect, useState } from "react";
import { Content } from "antd/es/layout/layout";
import { Alert, Button, Col, Input, Row, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "react-phone-number-input/style.css";
import PhoneInput from "antd-phone-input";

import vk from "../assets/vk.svg";
import logo from "../assets/logo.svg";
import { AuthApiServiceInstance } from "../api/AuthApiService";

export default function Register() {
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState();

    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState<boolean>(false);
    const [err, setErr] = useState<null | string>(null);
    const [registerDisabled, setRegisterDisabled] = useState<boolean>(true);

    useEffect(() => {
        if (email && firstName && lastName && phone && password) {
            setRegisterDisabled(false);
        } else {
            setRegisterDisabled(true);
        }
    }, [email, firstName, lastName, phone, password]);

    const register = () => {
        console.log(phone);
        setLoading(true);
        // const fetchToken = async () => {
        //     console.log({
        //         username: username,
        //         password: password,
        //     });
        //     AuthApiServiceInstance.getAccessToken({
        //         username: username,
        //         password: password,
        //     })
        //         .catch((err) => {
        //             setErr("Введён неверный логин или пароль");
        //         })
        //         .finally(() => setLoading(false));
        // };
        // fetchToken();
        setLoading(false);
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
                            <h4>Регистрация в Название проекта </h4>
                        </Row>
                        <Input
                            style={{
                                maxWidth: "300px",
                            }}
                            size="large"
                            placeholder="Имя"
                            value={firstName}
                            onChange={(event) => {
                                setFirstName(event.target.value);
                            }}
                        />
                        <Input
                            style={{
                                maxWidth: "300px",
                            }}
                            size="large"
                            placeholder="Фамилия"
                            value={lastName}
                            onChange={(event) => {
                                setLastName(event.target.value);
                            }}
                        />
                        <Input
                            style={{
                                maxWidth: "300px",
                            }}
                            size="large"
                            placeholder="Почта"
                            value={email}
                            onChange={(event) => {
                                setEmail(event.target.value);
                            }}
                        />
                        <PhoneInput
                            onlyCountries={["ru"]}
                            value={phone}
                            onChange={setPhone}
                            style={{
                                maxWidth: "300px",
                            }}
                        />
                        <Input.Password
                            style={{
                                maxWidth: "300px",
                            }}
                            size="large"
                            placeholder="Пароль (не менее 6 символов)"
                            value={password}
                            onChange={(event) => {
                                setPassword(event.target.value);
                            }}
                        />

                        {/* alert */}
                        {err && <Alert type="error" message={err} banner />}

                        <Button
                            style={{
                                minWidth: "300px",
                            }}
                            size="large"
                            type="primary"
                            onClick={register}
                            loading={loading}
                            disabled={registerDisabled}
                        >
                            Зарегистрироваться
                        </Button>
                        <div className="separator">Или с помощью</div>
                        <Button
                            style={{
                                minWidth: "300px",
                            }}
                            size="large"
                            type="default"
                            onClick={register}
                            loading={loading}
                        >
                            <img src={vk} width={40} height={40} />
                        </Button>

                        <div className="separator" />
                        <div className="question-container">
                            <span>Уже есть аккаунт?</span>
                            <Link to="/login">Войти</Link>
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
}
