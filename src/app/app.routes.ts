import { RouterModule, Routes } from "@angular/router";
import { HomepageComponent } from "./pages/homepage/homepage.component";
import { NgModule } from "@angular/core";
import { AdminpageComponent } from "./pages/adminpage/adminpage.component";

export const routes: Routes = [
  {
    path: "",
    component: HomepageComponent
  },
  {
    path: "admin",
    component: AdminpageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
