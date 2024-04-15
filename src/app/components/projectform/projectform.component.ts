import { Component, Inject, PLATFORM_ID } from "@angular/core";
import { ImageuploaderComponent } from "../imageuploader/imageuploader.component";
import { SsrCookieService } from "ngx-cookie-service-ssr";
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { ApiService } from "../../services/api.service";
import { isPlatformBrowser } from "@angular/common";

@Component({
  selector: "projectform",
  standalone: true,
  imports: [ReactiveFormsModule, ImageuploaderComponent],
  templateUrl: "./projectform.component.html",
  styleUrl: "./projectform.component.scss"
})
export class ProjectformComponent {
  constructor(
    private cookieService: SsrCookieService,
    private fb: FormBuilder,
    private api: ApiService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  submitted: boolean;
  postSuccess: boolean;
  token: string;
  image: string;

  form: FormGroup = new FormGroup({
    project: new FormControl(""),
    image: new FormControl(""),
    company: new FormControl(""),
    description: new FormControl(""),
    url: new FormControl("")
  });

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.form = this.fb.group({
        project: ["", [Validators.required, Validators.pattern("^(?!\\s+$)[a-zA-Z .\\-'()`\u00C0-\u017F]*$")]],
        image: [""],
        company: ["", [Validators.required, Validators.pattern("^(?!\\s+$)[a-zA-Z .\\-'()`\u00C0-\u017F]*$")]],
        description: ["", [Validators.required, Validators.pattern("^(?!\\s+$)[a-zA-Z .\\-'()`\u00C0-\u017F]*$")]],
        url: [""]
      });
    }
  }

  setData() {
    this.image = this.form.value.image;
  }

  supplyImageUrl(image: string) {
    this.image = image;
  }

  async submitForm(event: any) {
    event.preventDefault();
    this.submitted = true;

    if (this.form.invalid) return;

    this.token = this.cookieService.get("token");

    const newProject = await this.api.postNewData(this.token, "project", this.form.value);

    if (await newProject) {
      this.form.reset();
      this.postSuccess = true;
      this.submitted = false;
    }
  }
}
