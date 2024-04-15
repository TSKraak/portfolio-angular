import { CommonModule } from "@angular/common";
import { Component, Input, OnChanges } from "@angular/core";
import { ExperienceData } from "../../interfaces/interfaces";

@Component({
  selector: "experiences",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./experiences.component.html",
  styleUrl: "./experiences.component.scss"
})
export class ExperiencesComponent implements OnChanges {
  @Input() data: ExperienceData[];

  ngOnChanges(): void {
    if (this.data) this.data = this.data.reverse();
  }
}
