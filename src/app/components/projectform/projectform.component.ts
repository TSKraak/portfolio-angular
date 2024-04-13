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

  projectData: {
    project: string;
    image: string;
    company: string;
    description: string;
    url: string;
  };

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
        url: ["", [Validators.required]]
      });
    }
  }

  setData(type: string) {
    console.log(type);
    console.log(this.form.value, type);
  }

  supplyImageUrl(image: string) {
    console.log("Hello", image);
    this.image = image;
  }

  async submitForm(event: any) {
    event.preventDefault();
    this.token = this.cookieService.get("token");

    // POST call to API
    this.postSuccess = true;
  }
}
