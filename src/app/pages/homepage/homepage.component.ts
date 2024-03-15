import { Component, Inject, Input, OnInit, PLATFORM_ID, StateKey, TransferState, makeStateKey } from "@angular/core";
import { CardComponent } from "../../components/card/card.component";
import { ApiService } from "../../services/api.service";
import { AboutComponent } from "../../components/about/about.component";

@Component({
  selector: "homepage",
  standalone: true,
  imports: [CardComponent, AboutComponent],
  templateUrl: "./homepage.component.html",
  styleUrl: "./homepage.component.scss"
})
export class HomepageComponent implements OnInit {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private transferState: TransferState,
    private api: ApiService
  ) {}

  @Input() about: {
    id: number;
    about: string;
    portrait: string;
    createdAt: string;
    updatedAt: string;
  }[];

  @Input() projects: {
    project: string;
    image: string;
    company: string;
    description: string;
    url: string;
    createdAt: string;
    updatedAt: string;
  }[];

  @Input() experiences: {
    title: string;
    logo: string;
    company: string;
    period: string;
    description: string;
    createdAt: string;
    updatedAt: string;
  }[];

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
      this[dataType as keyof HomepageComponent] = await this.api.fetchData("about");
      this.transferState.set(stateKey, this[dataType as keyof HomepageComponent]);
    }
  }
}
