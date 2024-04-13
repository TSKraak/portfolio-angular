import { isPlatformBrowser } from "@angular/common";
import { Component, EventEmitter, Inject, Input, OnInit, Output, PLATFORM_ID } from "@angular/core";
import * as cloudinary from "cloudinary";

@Component({
  selector: "imageuploader",
  standalone: true,
  imports: [],
  templateUrl: "./imageuploader.component.html",
  styleUrl: "./imageuploader.component.scss"
})
export class ImageuploaderComponent implements OnInit {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  @Output() imageEmit = new EventEmitter<string>();

  myWidget: any;

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.myWidget = (window as any).cloudinary.createUploadWidget(
        {
          cloudName: "leaves-client",
          uploadPreset: "portfolio",
          folder: "portfolio",
          cropping: true
        },

        (error: any, result: any) => {
          if (!error && result && result.event === "success") {
            this.imageEmit.emit(result.info.secure_url);
            return result.info.secure_url;
          }
        }
      );
    }
  }

  openWidget() {
    this.myWidget.open();
  }
}
