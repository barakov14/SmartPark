import {inject, Injectable, signal} from '@angular/core';
import { LocalStorageJwtService } from './local-storage-jwt.service';
import { BehaviorSubject, catchError, Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { CurrentUser } from '../../../core/api-types/user';
import { ApiService } from '../../../core/http/api.service';
import {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
} from '../../../core/api-types/auth';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly localStorageJwtService = inject(LocalStorageJwtService);
  private readonly apiService = inject(ApiService);
  private readonly router = inject(Router);
  public $isLoading = signal<boolean>(false)

  public currentUser$ = new BehaviorSubject<CurrentUser | null>(null);

  public login(data: LoginRequest): Observable<AuthResponse> {
    this.$isLoading.set(true)
    return this.apiService.post<AuthResponse, LoginRequest>(
      '/security/login',
      data,
    ).pipe(
      tap((res: AuthResponse) => {
        this.localStorageJwtService.setItem(res.token)
        this.router.navigate(['/my'])
        this.$isLoading.set(false)
      })
    )
  }

  public register(data: RegisterRequest): Observable<AuthResponse> {
    return this.apiService.post<AuthResponse, RegisterRequest>(
      '/security/register',
      data,
    );
  }
  public logout(): void {
    this.localStorageJwtService.removeItem();
    this.router.navigate(['/login']);
  }

  public getCurrentUser(): Observable<CurrentUser> {
    return this.apiService.get<CurrentUser>('/api/auth/info').pipe(
      tap(res => {
        this.currentUser$.next(res);
      }),
      catchError(error => of()),
    );
  }
}
