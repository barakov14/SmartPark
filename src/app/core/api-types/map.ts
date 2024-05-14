export interface FindPark {
  latitude: number;
  longitude: number;
  radius: number;
  order_by: string;
}

export interface AddPark {
  name: string;
  max_places: number;
  rent_per_hour: number;
  // points: Points[];
}

export interface AddParkRequest {
  name: string;
  max_places: number;
  rent_per_hour: number;
  points: Points[];
}

export interface Points {
  latitude: number;
  longitude: number;
}

export interface PolygonPaths {
  path: google.maps.LatLngLiteral[];
}

export interface FindParkResponse {
  id: number;
  name: string;
  max_places: number;
  free_places: number;
  rent_per_hour: number;
  points: Points[];
}
