import axios from "axios";
import { API_URL } from "../config";
import { ILoginData, IAccessToken, ISignUpData } from "./models";

class AuthApiService {
    public async getAccessToken(
        data: ILoginData,
    ): Promise<IAccessToken | null> {
        const response = await axios.post<IAccessToken>(
            API_URL + "/auth/login",
            data,
        );

        if (response.status == 200) {
            localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
    }
    public async createUser(data: ISignUpData): Promise<IAccessToken> {
        const response = await axios.post<IAccessToken>(
            API_URL + "/auth/signup",
            data,
        );

        return response.data;
    }
    public async getVkLink(): Promise<string> {
        const response = await axios.post<string>(API_URL + "/auth/vk");
        return response.data;
    }
    // public async authVkHandle(code: string): Promise
}

export const AuthApiServiceInstance = new AuthApiService();
