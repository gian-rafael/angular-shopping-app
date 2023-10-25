import { AuthGuard } from "./auth.guard";
import { UserLoggedInGuard } from "./user-logged-in.guard";
import { IsAdminGuard } from "./is-admin.guard";

export const guards = [AuthGuard, UserLoggedInGuard, IsAdminGuard];

export * from "./auth.guard"
export * from "./is-admin.guard"
export * from "./user-logged-in.guard"