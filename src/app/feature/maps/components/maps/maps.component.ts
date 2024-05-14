import {ChangeDetectionStrategy, Component, Input, input, OnInit, output, signal} from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { MapsActionsComponent } from '../maps-actions/maps-actions.component';
import {AsyncPipe, NgOptimizedImage} from "@angular/common";
import {PolygonPaths} from "../../../../core/api-types/map";
import {BehaviorSubject} from "rxjs";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'sp-maps',
  standalone: true,
  imports: [GoogleMapsModule, MapsActionsComponent, NgOptimizedImage, AsyncPipe, RouterLink],
  templateUrl: './maps.component.html',
  styleUrl: './maps.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapsComponent {
  $parks = input<PolygonPaths[]>()
  $userPosition = input<google.maps.LatLngLiteral | null>()
  $drawingEnabled = input<boolean>();
  drawing = signal<google.maps.LatLngLiteral[]>([])

  position = input<google.maps.LatLngLiteral | null>()
  positionSet = output<google.maps.LatLngLiteral>()

  redirectToReview = output<number>()

  polygonPathSet = output<google.maps.LatLngLiteral[]>()

  private polygonPath: google.maps.LatLngLiteral[] = [];


  onMapClick(event: google.maps.MapMouseEvent) {
    if(this.$drawingEnabled()) {
      this.polygonPath.push(event.latLng!.toJSON());
      this.drawing.update((currentValue) => {
        return [...currentValue, event.latLng!.toJSON()]
      })
      this.polygonPathSet.emit(this.polygonPath)
    } else {
      this.positionSet.emit(event.latLng!.toJSON())
    }
  }

  onPolygonClick(id: number) {
    this.redirectToReview.emit(id)
  }
}
