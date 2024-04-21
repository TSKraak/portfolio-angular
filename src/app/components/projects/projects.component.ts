import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { ProjectData } from "../../interfaces/interfaces";

@Component({
  selector: "projects",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./projects.component.html",
  styleUrl: "./projects.component.scss"
})
export class ProjectsComponent {
  @Input() data: ProjectData[];
}
