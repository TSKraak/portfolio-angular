import { CommonModule } from "@angular/common";
import { Component, Input, OnChanges, OnInit } from "@angular/core";

@Component({
  selector: "projects",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./projects.component.html",
  styleUrl: "./projects.component.scss"
})
export class ProjectsComponent implements OnChanges {
  @Input() data: {
    project: string;
    image: string;
    company: string;
    description: string;
    url: string;
    createdAt: string;
    updatedAt: string;
  }[];

  ngOnChanges(): void {
    if (this.data) this.data = this.data.reverse();
  }
}
