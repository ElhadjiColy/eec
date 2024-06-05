import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { HeaderComponent } from "./components/header.page";
import { SidebarComponent } from "./components/sidebar.page";

@Component({
  selector: "etat-civil-root",
  standalone: true,
  host: {
    class:
      "",
  },
  template: `
  <div>
    <etat-civil-header></etat-civil-header>
    <etat-civil-sidebar></etat-civil-sidebar>
    <div class="justify-center flex pt-1 h-full flex-col text-zinc-900 bg-zinc-50 px-4 pb-32">
      <router-outlet></router-outlet>
    </div>
    <div class="footer">Footer here</div>
  </div>
  `,
  imports: [RouterOutlet, HeaderComponent, SidebarComponent]
})
export class AppComponent {}
