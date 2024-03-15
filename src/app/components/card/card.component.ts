import { Component, Input } from "@angular/core";

@Component({
  selector: "card",
  standalone: true,
  imports: [],
  templateUrl: "./card.component.html",
  styleUrl: "./card.component.scss"
})
export class CardComponent {
  @Input() type: string;

  @Input() data: {
    project: string;
    image: string;
    company: string;
    description: string;
    url: string;
    createdAt: string;
    updatedAt: string;
  }[];
}
