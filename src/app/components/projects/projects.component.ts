import { CommonModule } from "@angular/common";
import { Component, Input, OnChanges, OnInit } from "@angular/core";
import { ProjectData } from "../../interfaces/interfaces";

@Component({
  selector: "projects",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./projects.component.html",
  styleUrl: "./projects.component.scss"
})
export class ProjectsComponent implements OnChanges {
  @Input() data: ProjectData[];

  ngOnChanges(): void {
    if (this.data) this.data = this.data.reverse();
  }
}
