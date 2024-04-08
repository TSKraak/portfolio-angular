import { Component } from "@angular/core";
import { CardComponent } from "../../components/card/card.component";
import { ContactComponent } from "../../components/contact/contact.component";

@Component({
  selector: "contactpage",
  standalone: true,
  imports: [CardComponent, ContactComponent],
  templateUrl: "./contactpage.component.html",
  styleUrl: "./contactpage.component.scss"
})
export class ContactpageComponent {}
