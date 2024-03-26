import { Role } from "../common/role.enum";

export default interface UserInterface {
    id: string;
    username: string;
    password?: string;
    firstName: string;
    lastName?: string;
    role: Role;
    active?: number;
}