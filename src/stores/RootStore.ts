import { makeAutoObservable, observable } from "mobx";
import { IUser } from "../api/models/IUser";
import { IActivitiesProgress } from "../api/models/IActivitiesProgress";
import { IActivity } from "../api/models/IActivity";

export class RootStore {
    // тут логин хранить?? или только токен???
    public user: IUser | null = null;
    public mapData: IActivitiesProgress[] | null = null;
    public worldData: IActivity[] | null = null;

    constructor() {
        makeAutoObservable(this, {
            user: observable,
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
}

export const rootStore = new RootStore();
