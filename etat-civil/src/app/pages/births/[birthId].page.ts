import { AsyncPipe } from '@angular/common';
import { Component, inject } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

@Component({
  standalone: true,
  imports: [AsyncPipe],
  template: ` <h1>Birth Details</h1>
    <p>Birth ID: {{ birthId | async}}</p>
  `,
})
export default class BirthPageComponent {
  private readonly route = inject(ActivatedRoute)

  readonly birthId = this.route.paramMap.pipe(map(params => params.get('birthId')))
}
