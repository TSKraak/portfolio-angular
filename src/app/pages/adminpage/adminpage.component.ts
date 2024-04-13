import { Component } from "@angular/core";
import { AdminComponent } from "../../components/admin/admin.component";
import { CardComponent } from "../../components/card/card.component";
import { ImageuploaderComponent } from "../../components/imageuploader/imageuploader.component";

@Component({
  selector: "adminpage",
  standalone: true,
  imports: [CardComponent, AdminComponent, ImageuploaderComponent],
  templateUrl: "./adminpage.component.html",
  styleUrl: "./adminpage.component.scss"
})
export class AdminpageComponent {
  supplyImageUrl(image: string) {
    console.log("Hello", image)
  }
}
