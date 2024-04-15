import { Injectable } from "@angular/core";
import { AboutData, ExperienceData, ProjectData } from "../interfaces/interfaces";

@Injectable({
  providedIn: "root"
})
export class ApiService {
  async fetchToken(credentials: any): Promise<string> {
    try {
      const response: any = await fetch(`http://localhost:4500/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(credentials)
      });

      if (!response.ok) {
        throw new Error("Failed to login and fetch token");
      }

      const responseData = await response.json();
      return responseData.token;
    } catch (error: any) {
      console.log(error);
      return "";
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
      console.log(error);
      return false;
    }
  }

  async fetchData(dataType: string): Promise<any> {
    try {
      const response = await fetch(`http://localhost:4500/${dataType}`);
      return response.json();
    } catch (error: any) {
      console.error("Error fetching data:", error);
      return null;
    }
  }

  async postNewData(
    token: string,
    type: string,
    data: ProjectData | ExperienceData
  ): Promise<ProjectData | ExperienceData | null> {
    try {
      const response = await fetch(`http://localhost:4500/${type}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error("Failed to post data");
      }

      const responseData = await response.json();
      return responseData;
    } catch (error: any) {
      console.log(error);
      return null;
    }
  }
}
