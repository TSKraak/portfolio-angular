import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class ApiService {
  async fetchData(dataType: string): Promise<any> {
    return fetch(`http://localhost:4000/${dataType}`)
      .then(response => {
        return response.json();
      })
      .catch((error: any) => {
        console.error("Error fetching IP data:", error);
        return "error";
      });
  }
}
