import { PhoneNumber } from "antd-phone-input/types";

export interface ISignUpData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string | PhoneNumber | null;
    password: string;
    username: string;
}
