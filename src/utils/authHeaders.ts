import { IAccessToken } from "../api/models";

export default function authHeader() {
    if (localStorage.getItem("user") == null) {
        return {};
    }
    const user: IAccessToken = JSON.parse(
        localStorage.getItem("user") as string,
    );

    if (user && user.accessToken) {
        return { Authorization: "Bearer " + user.accessToken };
    }

    return {};
}
