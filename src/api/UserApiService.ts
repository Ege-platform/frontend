import axios from "axios";
import { API_URL } from "../config";
import { IUser } from "./models/IUser";
import { IActivitiesProgress } from "./models/IActivitiesProgress";
import { IActivity } from "./models/IActivity";

import authHeader from "../utils/authHeaders";

class UserApiService {
    public async getUserData(): Promise<IUser | undefined> {
        try {
            const response = await axios.get<IUser>(
                API_URL + "/api/v1/users/me",
                {
                    headers: authHeader(),
                },
            );
            return response.data;
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                localStorage.removeItem("token");
            }
        }
    }
    //  /activities/all/{subject}/{category}
    public async getWorldData(
        subject: string = "russian",
        category: string = "text",
    ): Promise<IActivity[] | undefined> {
        try {
            const response = await axios.get<IActivity[]>(
                API_URL + `/api/v1/activities/${subject}/all/${category}`,
                {
                    headers: authHeader(),
                },
            );
            return response.data;
        } catch (error: unknown) {
            console.log(error);
        }
    }
    //
    public async getActivityData(
        subject: string = "russian",
        egeId: number,
    ): Promise<IActivity | undefined> {
        try {
            const response = await axios.get<IActivity>(
                API_URL + `/api/v1/activities/${subject}/${egeId}`,
                {
                    headers: authHeader(),
                },
            );
            return response.data;
        } catch (error: unknown) {
            console.log(error);
        }
    }

    public async getSubjectProgress(
        subject: string = "russian",
    ): Promise<IActivitiesProgress[] | undefined> {
        try {
            const response = await axios.get<IActivitiesProgress[]>(
                API_URL + `/api/v1/stats/${subject}/activities/progress`,
                {
                    headers: authHeader(),
                },
            );
            return response.data;
        } catch (error:  unknown) {
            console.log(error);
        }
    }
}

export const UserApiServiceInstance = new UserApiService();
