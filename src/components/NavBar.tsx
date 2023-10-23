import Logo from "../assets/logo.svg";
import Avatar from "../assets/avatar.svg";
import Coin from "../assets/coin.svg";
import { User } from "../types";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { api_host } from "../api";
import { Outlet } from "react-router-dom";

const pages = [
    {
        title: "Вселенная",
        pages: ["/home"],
    },
    {
        title: "Генератор заданий",
        pages: ["/task"],
    },
    {
        title: "Поединок",
        pages: ["/battle"],
    },
    {
        title: "Магазин",
        pages: ["/shop"],
    },
    {
        title: "Теория",
        pages: ["/lib"],
    },
    {
        title: "Форум",
        pages: ["/forum"],
    },
    {
        title: "Помощь",
        pages: ["/help"],
    },
];

export default function NavBar() {
    const [user, setUser] = useState<User | null>(null);

    const location = useLocation();
    useEffect(() => {
        async function fetch() {
            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            };
            axios
                .get(api_host + "/api/v1/users/me", config)
                .then((response) => {
                    // set affected fields to loading state
                    const data = response.data;
                    setUser(data);
                })
                .catch((error) => {
                    console.log("error", error);
                })
                .finally(() => {
                    // console.log(user);
                });
        }
        fetch();
    }, []);

    return (
        <>
            <header className="border-b-4 border-blue-100 drop-shadow-lg min-w-full py-3 px-8 rounded-b-lg">
                <div className="flex flex-row justify-between">
                    <div className="flex flex-row">
                        <img src={Logo} className="h-10 w-10" />

                        {pages.map((item) => {
                            var linkClass = "mx-8 font-3xl my-2";
                            if (!item.pages.includes(location.pathname)) {
                                linkClass += " text-gray-400";
                            }
                            return (
                                <a
                                    key={item.title}
                                    href={item.pages[0]}
                                    className={linkClass}
                                >
                                    {item.title}
                                </a>
                            );
                        })}
                    </div>
                    <div className="flex flex-row justify-center">
                        <img
                            src={Avatar}
                            className="h-10 w-10 bg-gray-400 rounded-lg mr-3"
                        />
                        <div className="flex flex-col mx-3">
                            <p
                                className={
                                    !user ? "text-xs animate-pulse" : "text-xs"
                                }
                            >
                                {user ? user.username : "Ник"}
                            </p>
                            <p className="text-xs text-gray-400">Статус</p>
                        </div>
                        <div className="h-10 w-10 mx-3 border-2  border-indigo-500 rounded-lg flex flex-row min-w-max">
                            <img
                                className=" rounded-lg bg-indigo-200"
                                src={Coin}
                            />
                            <p className="py-1 mx-1">
                                {user ? user.coins : "0"}
                            </p>
                        </div>
                    </div>
                </div>
            </header>
            <Outlet />
        </>
    );
}
