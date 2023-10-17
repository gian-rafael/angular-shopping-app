export type UserRole = "user" | "admin";

export interface User {
  id: number;
  username: string;
  password: string;
  role: UserRole;
}

export interface UserDetails {
  id: number;
  username: string;
  role: UserRole;
}
