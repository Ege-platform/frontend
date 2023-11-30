export default function authHeader() {
    if (localStorage.getItem("token") == null) {
        return {};
    }
    const token: string = JSON.parse(localStorage.getItem("token") as string);
    console.log("token", token);
    if (token) {
        return { Authorization: "Bearer " + token };
    }

    return {};
}
