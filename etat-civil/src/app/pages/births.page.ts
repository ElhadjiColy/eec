import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: "etat-civil-birth",
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <router-outlet></router-outlet>
  `,
})
export default class BirthPageComponent {}
