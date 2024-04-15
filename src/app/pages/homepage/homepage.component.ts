import { Component, Input, OnInit, StateKey, TransferState, makeStateKey } from "@angular/core";
import { AboutComponent } from "../../components/about/about.component";
import { CardComponent } from "../../components/card/card.component";
import { ApiService } from "../../services/api.service";
import { ProjectsComponent } from "../../components/projects/projects.component";
import { ExperiencesComponent } from "../../components/experiences/experiences.component";
import { AboutData, ExperienceData, ProjectData } from "../../interfaces/interfaces";

@Component({
  selector: "homepage",
  standalone: true,
  imports: [CardComponent, AboutComponent, ProjectsComponent, ExperiencesComponent],
  templateUrl: "./homepage.component.html",
  styleUrl: "./homepage.component.scss"
})
export class HomepageComponent implements OnInit {
  constructor(
    private transferState: TransferState,
    private api: ApiService
  ) {}

  @Input() about: AboutData[];

  @Input() project: ProjectData[];

  @Input() experience: ExperienceData[];

  ngOnInit(): void {
    this.transferStateData("about");
    this.transferStateData("project");
    this.transferStateData("experience");
  }

  private async transferStateData(dataType: string): Promise<void> {
    const stateKey: StateKey<any> = makeStateKey<any>(dataType);
    const transferData = this.transferState.get(stateKey, null);

    if (transferData) {
      this[dataType as keyof HomepageComponent] = transferData;
    } else {
      this[dataType as keyof HomepageComponent] = await this.api.fetchData(dataType);
      this.transferState.set(stateKey, this[dataType as keyof HomepageComponent]);
    }
  }
}
