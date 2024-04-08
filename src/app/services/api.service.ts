import { Injectable } from "@angular/core";
import { SsrCookieService } from "ngx-cookie-service-ssr";
import { TokenService } from "./token.service";

@Injectable({
  providedIn: "root"
})
export class ApiService {
  async fetchData(dataType: string): Promise<any> {
    return fetch(`http://localhost:4500/${dataType}`)
      .then(response => {
        return response.json();
      })
      .catch((error: any) => {
        console.error("Error fetching IP data:", error);
        return "error";
      });
  }

  async fetchToken(username: string, password: string): Promise<string> {
    try {
      const user = {
        username: username,
        password: password
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

      return responseData.token;
    } catch (error: any) {
      if (error.response) {
        console.log(error.response.data.message);
        return "";
      } else {
        console.log(error.message);
        return "";
      }
    }
  }

  async checkToken(token: string): Promise<boolean> {
    try {
      const response = await fetch(`http://localhost:4500/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!response.ok) {
        throw new Error("Token not valid");
      }

      return true;
    } catch (error: any) {

        console.log("ERROR:", error);
        return false;

    }
  }
}
