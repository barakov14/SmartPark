import {inject, Injectable, signal} from "@angular/core";
import {ApiService} from "../../../core/http/api.service";
import {tap} from "rxjs/operators";

@Injectable()

export class ParkReviewService {
  private readonly apiService = inject(ApiService)
  reviews = signal(null)


  getParkReviews(id: number) {
    return this.apiService.get<any>(`/v1/review/${id}`).pipe(
      tap((res) => {
        this.reviews.set(res)
      })
    )
  }
}
