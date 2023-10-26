import axios from "axios";
import { API_URL } from "../config";
import { IUser } from "./models/IUser";
import authHeader from "../utils/authHeaders";

class UserApiService {
    public async getUserData(): Promise<IUser> {
        const response = await axios.get<IUser>(API_URL + "/api/v1/users/me", {
            headers: authHeader(),
        });

        return response.data;
    }
}

export const UserApiServiceInstance = new UserApiService();
