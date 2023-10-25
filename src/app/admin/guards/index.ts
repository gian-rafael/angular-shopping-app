import { InventoryGuard } from "./inventory.guard";
import { SalesGuard } from "./sales.guard";
import { UpdateProductGuard } from "./update-product.guard";

export const guards = [InventoryGuard, SalesGuard, UpdateProductGuard];

export * from "./inventory.guard";
export * from "./sales.guard";
export * from "./update-product.guard";
