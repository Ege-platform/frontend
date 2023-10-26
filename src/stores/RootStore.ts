import { makeAutoObservable, observable } from "mobx";
import { IUser } from "../api/models/IUser";

export class RootStore {
    // тут логин хранить?? или только токен???
    public user: IUser | null = null;

    constructor() {
        makeAutoObservable(this, {
            user: observable,
        });
    }

    public setUser() {}
}

// preasure, cofein, sugar, phomo? (screens)
