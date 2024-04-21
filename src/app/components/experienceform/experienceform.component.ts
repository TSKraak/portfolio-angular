import { isPlatformBrowser } from "@angular/common";
import { Component, Inject, PLATFORM_ID, StateKey, TransferState, makeStateKey } from "@angular/core";
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { SsrCookieService } from "ngx-cookie-service-ssr";
import { ApiService } from "../../services/api.service";
import { ImageuploaderComponent } from "../imageuploader/imageuploader.component";

@Component({
  selector: "experienceform",
  standalone: true,
  imports: [ReactiveFormsModule, ImageuploaderComponent],
  templateUrl: "./experienceform.component.html",
  styleUrl: "./experienceform.component.scss"
})
export class ExperienceformComponent {
  constructor(
    private cookieService: SsrCookieService,
    private fb: FormBuilder,
    private api: ApiService,
    private transferState: TransferState,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  submitted: boolean;
  postSuccess: boolean;
  token: string;
  logo: string;

  form: FormGroup = new FormGroup({
    title: new FormControl(""),
    logo: new FormControl(""),
    company: new FormControl(""),
    description: new FormControl(""),
    period: new FormControl("")
  });

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.form = this.fb.group({
        title: ["", [Validators.required, Validators.pattern("^(?!\\s+$)[a-zA-Z .\\-'()`\u00C0-\u017F]*$")]],
        logo: [""],
        company: ["", [Validators.required, Validators.pattern("^(?!\\s+$)[a-zA-Z .\\-'()`\u00C0-\u017F]*$")]],
        description: ["", [Validators.required, Validators.pattern("^(?!\\s+$)[a-zA-Z .\\-'()`\u00C0-\u017F]*$")]],
        period: ["", [Validators.required, Validators.pattern("^[A-Za-z]+\\s[0-9]+\\s-\\s[A-Za-z]+\\s[0-9]*")]]
      });
    }
  }

  setData() {
    this.logo = this.form.value.logo;
  }

  supplyLogoUrl(logo: string) {
    this.logo = logo;
  }

  async submitForm(event: any) {
    event.preventDefault();
    this.submitted = true;

    if (this.form.invalid) return;

    this.token = this.cookieService.get("token");

    const newProject = await this.api.postNewData(this.token, "experience", this.form.value);

    if (await newProject) {
      this.form.reset();
      this.logo = "";
      this.postSuccess = true;
      this.submitted = false;

      const experienceKey: StateKey<any> = makeStateKey<any>("experience");
      const experiencesData = this.transferState.get(experienceKey, null);

      if (experiencesData) {
        const newProjectsData = [newProject, ...experiencesData];
        this.transferState.set(experienceKey, newProjectsData);
      }
    }
  }
}
