import { makeAutoObservable, observable } from "mobx";
import { IUser } from "../api/models/IUser";
import { IActivitiesProgress } from "../api/models/IActivitiesProgress";
import { IActivity } from "../api/models/IActivity";
import { IEgeTaskCreate } from "../api/models/IEgeTaskCreate";

export class RootStore {
    // тут логин хранить?? или только токен???
    public user: IUser | null = null;
    public mapData: IActivitiesProgress[] | null = null;
    public worldData: IActivity[] | null = null;
    public egeCreateRequest: IEgeTaskCreate[] = [];

    constructor() {
        makeAutoObservable(this, {
            user: observable,
            egeCreateRequest: observable,
        });
    }

    public setUser(user: IUser) {
        this.user = user;
    }

    public setMapData(data: IActivitiesProgress[]) {
        this.mapData = data;
    }

    public setWorldData(data: IActivity[]) {
        this.worldData = data;
    }

    public addEgeTask(data: IEgeTaskCreate) {
        // check if egeCreateRequest contains IEgeTaskModel with same id
        // if yes - replace it
        // if no - add new
        const index = this.egeCreateRequest?.findIndex(
            (item) => item.egeId === data.egeId,
        );
        if (index !== undefined && index !== -1) {
            this.egeCreateRequest?.splice(index, 1, data);
        } else {
            this.egeCreateRequest?.push(data);
        }
    }

    public clearEgeTask() {
        this.egeCreateRequest = [];
    }
}

export const rootStore = new RootStore();
