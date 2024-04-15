import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { AboutData } from "../../interfaces/interfaces";

@Component({
  selector: "about",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./about.component.html",
  styleUrl: "./about.component.scss"
})
export class AboutComponent {
  @Input() data: AboutData[];

  getAge(date: string) {
    var today = new Date();
    var birthDate = new Date(date);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }
}
