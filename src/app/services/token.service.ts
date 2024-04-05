import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class TokenService {
  private tokenSubject = new Subject<string>();

  token$ = this.tokenSubject.asObservable();

  emitToken(token: string) {
    this.tokenSubject.next(token);
  }
}
