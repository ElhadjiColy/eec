import { Component } from "@angular/core";

import { AnalogWelcomeComponent } from "./analog-welcome.component";

@Component({
  selector: "etat-civil-home",
  standalone: true,
  imports: [AnalogWelcomeComponent],
  template: ` <etat-civil-analog-welcome /> `,
})
export default class HomeComponent {}
