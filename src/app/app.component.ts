import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import { SsrCookieService } from "ngx-cookie-service-ssr";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { TokenService } from "./services/token.service";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, NavbarComponent],
  providers: [SsrCookieService, TokenService],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss"
})
export class AppComponent {
}
