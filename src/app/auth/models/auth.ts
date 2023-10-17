import { UserRole } from "./user";

export interface LoginCredentials {
  username: string;
  password: string;
  rememberUser: boolean;
}

export interface RegistrationDetails {
  username: string;
  password: string;
  role: UserRole;
}
