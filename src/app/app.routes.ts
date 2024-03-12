import { RouterModule, Routes } from "@angular/router";
import { HomepageComponent } from "./pages/homepage/homepage.component";
import { NgModule } from "@angular/core";

export const routes: Routes = [
  {
    path: "",
    component: HomepageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
