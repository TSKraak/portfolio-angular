import { Component } from "@angular/core";
import { CardComponent } from "../../components/card/card.component";

@Component({
  selector: "contactpage",
  standalone: true,
  imports: [CardComponent],
  templateUrl: "./contactpage.component.html",
  styleUrl: "./contactpage.component.scss"
})
export class ContactpageComponent {}
