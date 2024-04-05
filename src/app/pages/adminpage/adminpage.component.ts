import { Component } from "@angular/core";
import { CardComponent } from "../../components/card/card.component";
import { AdminComponent } from "../../components/admin/admin.component";

@Component({
  selector: "adminpage",
  standalone: true,
  imports: [CardComponent, AdminComponent],
  templateUrl: "./adminpage.component.html",
  styleUrl: "./adminpage.component.scss"
})
export class AdminpageComponent {}
