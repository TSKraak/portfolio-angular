import { Component, OnInit, StateKey, TransferState, makeStateKey } from "@angular/core";
import { SsrCookieService } from "ngx-cookie-service-ssr";
import { TokenService } from "../../services/token.service";

@Component({
  selector: "admin",
  standalone: true,
  imports: [],
  templateUrl: "./admin.component.html",
  styleUrl: "./admin.component.scss"
})
export class AdminComponent implements OnInit {
  constructor(
    private cookieService: SsrCookieService,
    private tokenService: TokenService,
    private transferState: TransferState
  ) {}

  token: string;
  username: string;
  password: string;

  ngOnInit(): void {
    this.checkToken();
  }

  checkToken = async () => {
    this.token = this.cookieService.get("token");

    if (this.token) {
      try {
        const response = await fetch(`http://localhost:4500/me`, {
          headers: { Authorization: `Bearer ${this.token}` }
        });

        if (!response.ok) {
          throw new Error("Failed to fetch");
        }

        this.cookieService.set("token", this.token);
      } catch (error: any) {
        if (error.response) {
          console.log("ERROR:", error.response.message);
        } else {
          console.log("ERROR:", error);
        }
        // if we get a 4xx or 5xx response, get rid of the token by logging out
        this.token = "";
        this.cookieService.delete("token");
      }
    }
  };

  submitForm = async (event: Event) => {
    event.preventDefault();

    try {
      const user = {
        username: this.username,
        password: this.password
      };

      const response: any = await fetch(`http://localhost:4500/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      });

      if (!response.ok) {
        throw new Error("Failed to fetch");
      }

      const responseData = await response.json();

      this.token = responseData.token;

      const tokenKey: StateKey<any> = makeStateKey<any>("token");
      this.transferState.set(tokenKey, this.token);
      this.tokenService.emitToken(this.token);
      this.cookieService.set("token", this.token);
    } catch (error: any) {
      if (error.response) {
        console.log(error.response.data.message);
      } else {
        console.log(error.message);
      }
    }
  };

  setData(event: any, type: string) {
    type === "username" ? (this.username = event.target.value) : (this.password = event.target.value);
  }
}
