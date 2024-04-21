import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { ExperienceData } from "../../interfaces/interfaces";

@Component({
  selector: "experiences",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./experiences.component.html",
  styleUrl: "./experiences.component.scss"
})
export class ExperiencesComponent {
  @Input() data: ExperienceData[];
}
