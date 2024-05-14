import {ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {ParkReviewService} from "../../services/park-review.service";
import {ParkReviewComponent} from "../park-review/park-review.component";

@Component({
  selector: 'park-review-container',
  standalone: true,
  imports: [
    ParkReviewComponent
  ],
  templateUrl: './park-review-container.component.html',
  styleUrl: './park-review-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ParkReviewService]
})
export class ParkReviewContainerComponent implements OnInit{
  private readonly route = inject(ActivatedRoute)
  private readonly destroyRef = inject(DestroyRef)
  private readonly parkReviewService = inject(ParkReviewService)

  ngOnInit() {
    this.route.params.pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe((params) => {
      this.parkReviewService.getParkReviews(params['id']).pipe(
        takeUntilDestroyed(this.destroyRef)
      ).subscribe()
    })
  }
}
