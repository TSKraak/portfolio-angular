import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { SsrCookieService } from "ngx-cookie-service-ssr";
import { Subscription } from "rxjs";
import { TokenService } from "../../services/token.service";
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";

@Component({
  selector: "navbar",
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: "./navbar.component.html",
  styleUrl: "./navbar.component.scss"
})
export class NavbarComponent implements OnDestroy, OnInit {
  constructor(
    private cookieService: SsrCookieService,
    private tokenService: TokenService,
    private router: Router
  ) {
    this.tokenSubscription = this.tokenService.token$.subscribe(token => {
      this.token = token;
    });
  }

  private tokenSubscription: Subscription;

  @Input() token: string;

  handleLogout = () => {
    this.cookieService.delete("token");
    this.token = "";
    this.router.navigateByUrl("/", {
      skipLocationChange: false
    });
  };

  ngOnDestroy() {
    this.tokenSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.token = this.cookieService.get("token");
  }
}
