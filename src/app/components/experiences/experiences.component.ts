import { CommonModule } from "@angular/common";
import { Component, Input, OnChanges } from "@angular/core";

@Component({
  selector: "experiences",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./experiences.component.html",
  styleUrl: "./experiences.component.scss"
})
export class ExperiencesComponent implements OnChanges {
  @Input() data: {
    title: string;
    logo: string;
    company: string;
    period: string;
    description: string;
    createdAt: string;
    updatedAt: string;
  }[];

  ngOnChanges(): void {
    if (this.data) this.data = this.data.reverse();
  }
}
