import { Component } from "@angular/core";
import { AdminComponent } from "../../components/admin/admin.component";
import { CardComponent } from "../../components/card/card.component";

@Component({
  selector: "adminpage",
  standalone: true,
  imports: [CardComponent, AdminComponent],
  templateUrl: "./adminpage.component.html",
  styleUrl: "./adminpage.component.scss"
})
export class AdminpageComponent {}
