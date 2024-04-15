import { Component, Inject, OnInit, PLATFORM_ID } from "@angular/core";
import { SsrCookieService } from "ngx-cookie-service-ssr";
import { TokenService } from "../../services/token.service";
import { ApiService } from "../../services/api.service";
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup, FormControl, AbstractControl } from "@angular/forms";
import { isPlatformBrowser } from "@angular/common";
import { ProjectformComponent } from "../projectform/projectform.component";

@Component({
  selector: "admin",
  standalone: true,
  imports: [ReactiveFormsModule, ProjectformComponent],
  templateUrl: "./admin.component.html",
  styleUrl: "./admin.component.scss"
})
export class AdminComponent implements OnInit {
  constructor(
    private cookieService: SsrCookieService,
    private fb: FormBuilder,
    private tokenService: TokenService,
    private api: ApiService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  token: string;
  username: string;
  password: string;
  submitted: boolean;
  formType: string;

  form: FormGroup = new FormGroup({
    username: new FormControl(""),
    password: new FormControl("")
  });

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  ngOnInit(): void {
    this.checkToken();

    if (isPlatformBrowser(this.platformId)) {
      this.form = this.fb.group({
        username: ["", [Validators.required, Validators.pattern("^(?!\\s+$)[a-zA-Z .\\-'()`\u00C0-\u017F]*$")]],
        password: ["", [Validators.required, Validators.pattern("^(?!\\s+$)[a-zA-Z .\\-'()`\u00C0-\u017F]*$")]]
      });
    }
  }

  async checkToken() {
    this.token = this.cookieService.get("token");

    if (this.token) {
      const validToken = await this.api.checkToken(this.token);
      if (!validToken) {
        this.token = "";
        this.cookieService.delete("token");
      }
    }
  }

  async submitForm(event: Event) {
    event.preventDefault();
    this.submitted = true;
    if (this.form.invalid) return;

    this.token = await this.api.fetchToken(this.form.value);

    this.tokenService.emitToken(this.token);
    this.cookieService.set("token", this.token);
  }

  setCredentials(type: string) {
    type === "username" ? (this.username = this.form.value.username) : (this.password = this.form.value.password);
  }

  setAddData(type: string) {
    this.formType = type;
  }
}
