import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
  EventEmitter,
} from "@angular/core";
import { UserDetails, UserRole } from "src/app/auth/models/user";

interface NavRoute {
  name: string;
  path: string;
}
@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  @Input() userIsLoggedIn: boolean = false;
  @Input() user: UserDetails;
  @Output() logout = new EventEmitter();

  readonly userRoutes: NavRoute[] = [
    {
      name: "My Cart",
      path: "/cart"
    },
    {
      name: "My Wishlist",
      path: "/wishlist"
    },
  ]

  readonly adminRoutes: NavRoute[] = [
    {
      name: "Inventory",
      path: "/inventory"
    },
    {
      name: "Sales",
      path: "/sales"
    },
  ]

  constructor() {}

  onLogout() {
    this.logout.emit();
  }
}
