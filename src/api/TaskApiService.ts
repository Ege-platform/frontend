import axios from "axios";
import { API_URL } from "../config";

import authHeader from "../utils/authHeaders";
import { IEgeTask } from "./models/IEgeTask";
import { IEgeTaskModel } from "./models/IEgeTaskModel";
import { IEgeTaskCreate } from "./models/IEgeTaskCreate";

interface createEgeResponse {
    createdAt: string;
    tasks: IEgeTaskModel[];
}

class TaskApiService {
    public async getExamStructure(): Promise<IEgeTask[]> {
        const response = await axios.get(
            API_URL + "/api/v1/tasks/russian/structure",
            {
                headers: authHeader(),
            },
        );

        return response.data;
    }
    public async createEgeExample(
        data: IEgeTaskCreate[],
    ): Promise<createEgeResponse> {
        const response = await axios.post(
            API_URL + "/api/v1/tasks/generate",
            data,
            {
                headers: authHeader(),
            },
        );
        return response.data;
    }

    public async getEgeVariant(variantId: number): Promise<createEgeResponse> {
        const response = await axios.get(
            API_URL + `/api/v1/variants/${variantId}`,
            {
                headers: authHeader(),
            },
        );
        return response.data;
    }
}

export const TaskApiServiceInstance = new TaskApiService();
