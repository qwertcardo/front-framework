import { User } from "../model/user.model";

export interface AuthResponse {
    user: User;
    token: string;
}