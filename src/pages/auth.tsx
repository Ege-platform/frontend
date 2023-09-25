import { useState } from "react";
import vkLogo from "../assets/vk-logo.svg";
import telegramLogo from "../assets/telegram-logo.svg";
import googleLogo from "../assets/google-logo.svg";
import warningLogo from "../assets/warning-icon.svg";
import { api_host } from "../api";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AuthPage() {
    async function login() {
        axios
            .post(api_host + "/auth/login", {
                username: email,
                password: password,
            })
            .then(function (response) {
                console.log(response);
                if (response.data.accessToken) {
                    localStorage.setItem("token", response.data.accessToken);
                }
                setError(false);
            })
            .catch(function (error) {
                console.log(error);
                setError(true);
            })
            .finally(function () {
                console.log("finally");
                if (localStorage.getItem("token")) {
                    navigate("/home");
                }
            });
    }

    async function register() {
        axios
            .post(api_host + "/auth/signup", {
                username: nickName,
                email: email,
                password: password,
            })
            .then(function (response) {
                console.log(response);
                if (response.data.accessToken) {
                    localStorage.setItem("token", response.data.accessToken);
                }
            })
            .catch(function (error) {
                setError(true);
                console.log(error);
            })
            .finally(function () {
                console.log("finally");
                if (localStorage.getItem("token")) {
                    navigate("/home");
                }
            });
    }

    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [error, setError] = useState(false);
    const [email, setEmail] = useState("");
    const [nickName, setNickName] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div>
            <section className="bg-gray-100 min-h-screen flex justify-center items-center">
                {/* align auth container in center of a screen */}

                {/* auth container */}
                <div className="bg-white p-4 rounded-lg min-w-min">
                    <h1 className="text-3xl">Лого</h1>
                    <div className="flex flex-wrap">
                        <div className="m-4 min-h-[400px] flex-col justify-between">
                            {/* switch */}
                            <div className="flex flex-row min-w-full justify-evenly mb-4 w-96">
                                <button
                                    className={
                                        "w-40 border-b-2 " +
                                        (!isLogin
                                            ? "border-transparent"
                                            : "border-indigo-400")
                                    }
                                    onClick={() => setIsLogin(true)}
                                >
                                    Вход
                                </button>
                                <button
                                    className={
                                        "w-40 border-b-2 " +
                                        (isLogin
                                            ? "border-transparent"
                                            : "border-indigo-400")
                                    }
                                    onClick={() => setIsLogin(false)}
                                >
                                    Регистрация
                                </button>
                            </div>

                            {/* login container */}
                            <div className="flex flex-col items-center">
                                {/* if !islogin show nickname field*/}
                                {!isLogin && (
                                    <input
                                        type="text"
                                        placeholder="Ник"
                                        className="rounded border-2 border-gray-300 mb-2 min-w-full py-4 px-2"
                                        value={nickName}
                                        onChange={(e) =>
                                            setNickName(e.target.value)
                                        }
                                    />
                                )}
                                <input
                                    type="text"
                                    placeholder="email"
                                    className="rounded border-2 border-gray-300 mb-2 min-w-full py-4 px-2"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <input
                                    type="password"
                                    placeholder="password"
                                    className="rounded border-2 border-gray-300 mb-2 min-w-full py-4 px-2"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />

                                {/* error box */}
                                {/* if error is true show error box */}
                                {error && (
                                    <div className="flex flex-row flex-nowrap justify-start rounded border-gray-100 p-2 bg-red-100 min-w-full text-red-950">
                                        {/* display error message */}
                                        {/* make items in error box inline */}
                                        <img
                                            src={warningLogo}
                                            className="w-4 h-4 mr-2"
                                        />
                                        <p>Введен неверный логин или пароль</p>
                                    </div>
                                )}

                                {/* Action button login / register */}
                                <button
                                    className="bg-indigo-600 text-white rounded w-full p-4"
                                    onClick={async () => {
                                        if (isLogin) {
                                            await login();
                                        } else {
                                            await register();
                                        }
                                    }}
                                >
                                    {isLogin ? "Войти" : "Зарегистрироваться"}
                                </button>
                                {/* Forgot password */}
                                {isLogin && (
                                    <div className="border-2 border-transparent text-blue-600 text-center w-full py-4 underline">
                                        <a>Забыли пароль?</a>
                                    </div>
                                )}
                            </div>
                            {/* Social login */}
                            <div className="flex flex-row flex-nowrap justify-center mt-4">
                                <p className="h-10 relative p-1 m-0 text-center mt-1">
                                    Или войдите через
                                </p>
                                <button className="border-2 rounded-lg border-gray-300 w-10 h-10 p-1 mx-2">
                                    <img src={vkLogo} />
                                </button>
                                <button className="border-2 rounded-lg border-gray-300 w-10 h-10 p-2 mx-2">
                                    <img src={googleLogo} />
                                </button>
                                <button className="border-2 rounded-lg border-gray-300 w-10 h-10 p-2 ">
                                    <img src={telegramLogo} />
                                </button>
                            </div>
                        </div>
                        <div
                            className="bg-indigo-600 rounded-lg min-w-min m-2"
                            style={{ width: "640px", height: "370px" }}
                        />
                    </div>
                </div>
            </section>
        </div>
    );
}

export default AuthPage;
