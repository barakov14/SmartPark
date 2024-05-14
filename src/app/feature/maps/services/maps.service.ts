import {inject, Injectable, signal} from '@angular/core';
import {AddPark, AddParkRequest, FindPark, FindParkResponse, Points, PolygonPaths} from "../../../core/api-types/map";
import {ApiService} from "../../../core/http/api.service";
import {finalize, tap} from "rxjs/operators";
import {BehaviorSubject, catchError, of} from "rxjs";

@Injectable({providedIn: 'root'})
export class MapsService {
  private readonly apiService = inject(ApiService)
  public $isLoading = signal<boolean>(false)
  public $error = signal<Error | null>(null)
  public $parks = signal<PolygonPaths[]>([])
  public $visibleCreateParkButton = signal<boolean>(false)
  public $drawingEnabled = signal<boolean>(false)
  public drawing$ = new BehaviorSubject<google.maps.LatLngLiteral[]>([])
  public $createParkDisabled = signal<boolean>(true)
  public $position = signal<google.maps.LatLngLiteral | null>(null)


  public findPark(data: FindPark) {
    this.$isLoading.set(true)
    return this.apiService.post<FindParkResponse[], FindPark>('/v1/parking/find', data).pipe(
      tap((res) => {
        res.forEach((v) => {
          const updatedData: google.maps.LatLngLiteral[] = [];
          v.points.forEach((point) => {
            updatedData.push({ lat: point.latitude, lng: point.longitude });
          });
          this.$parks.update((polygonPaths: PolygonPaths[]) => {
            return [...polygonPaths, { path: updatedData, id: v.id }];
          });
        });
      }),
      catchError((error) => {
        this.$error.set(error.errors)
        console.log('ошибка когда маппаю и сохраняю в стейт', error.errors)

        return of()
      }),
      finalize(() => {
        this.$isLoading.set(false);
      }),
    )
  }

  public addPark(data: AddPark) {

    const points: Points[] = []
    this.drawing$.value.map((point) => {
      points.push({latitude: point.lat, longitude: point.lng})
    })
    const req: AddParkRequest = {
      name: data.name,
      max_places: data.max_places,
      rent_per_hour: data.rent_per_hour,
      points: points
    }
    return this.apiService.post<void, AddParkRequest>('/v1/parking/create', req)
  }

  public onToggleParkCreating() {
    console.log('onToggleParkCreating')
    this.$visibleCreateParkButton.update(v => !v)
    this.$drawingEnabled.update(v => !v)
  }

  public onDraw(data: google.maps.LatLngLiteral[]) {
    this.drawing$.next(data)
  }

}
