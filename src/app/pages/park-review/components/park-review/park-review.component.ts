import {ChangeDetectionStrategy, Component} from '@angular/core';
import {AsyncPipe, NgIf} from "@angular/common";
import {MatFabButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'park-review',
  standalone: true,
  imports: [
    AsyncPipe,
    MatFabButton,
    MatIcon,
    NgIf,
    RouterLink
  ],
  templateUrl: './park-review.component.html',
  styleUrl: './park-review.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ParkReviewComponent {

}
