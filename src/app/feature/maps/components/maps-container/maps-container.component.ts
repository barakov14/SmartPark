import {ChangeDetectionStrategy, Component, DestroyRef, inject, signal} from '@angular/core';
import { MapsComponent } from '../maps/maps.component';
import {MapsActionsComponent} from "../maps-actions/maps-actions.component";
import {MapsService} from "../../services/maps.service";
import {FindPark} from "../../../../core/api-types/map";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {AsyncPipe} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'sp-maps-container',
  standalone: true,
  imports: [MapsComponent, MapsActionsComponent, AsyncPipe],
  templateUrl: './maps-container.component.html',
  styleUrl: './maps-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapsContainerComponent {
  private readonly mapsService = inject(MapsService)
  private readonly destroyRef = inject(DestroyRef)
  private readonly router = inject(Router)

  public $parks = this.mapsService.$parks
  public userPosition = signal<google.maps.LatLngLiteral | null>(null)
  public $visibleCreateParkButton = this.mapsService.$visibleCreateParkButton
  public $drawingEnabled = this.mapsService.$drawingEnabled
  public drawing$ = this.mapsService.drawing$
  public $isDisabled = this.mapsService.$createParkDisabled
  public $position = this.mapsService.$position

  constructor() {
    this.getUserLocation()
  }

  getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.userPosition.set({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        })
      });
    }
  }

  onFindPark() {
    const position = this.$position()? this.$position() : this.userPosition()
    if(position) {
      const data: FindPark = {
        longitude: position.lng,
        latitude: position.lat,
        radius: 500,
        order_by: 'cheapest'
      }
      this.mapsService.findPark(data).pipe(
        takeUntilDestroyed(this.destroyRef)
      ).subscribe()
    }
  }

  onPositionSet(data: google.maps.LatLngLiteral) {
    this.mapsService.$position.set(data)
  }

  polygonPathsSet(data: google.maps.LatLngLiteral[]) {
    this.mapsService.onDraw(data)
    if(data.length > 3 && data.length < 6) {
      this.mapsService.$createParkDisabled.set(false)
    } else {
      this.mapsService.$createParkDisabled.set(true)
    }
  }
  onRedirectToReview(id: number) {
    this.router.navigate(['/park-review', id])
  }
}
