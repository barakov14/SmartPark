import {ChangeDetectionStrategy, Component, DestroyRef, inject} from '@angular/core';
import {LoginComponent} from "../login/login.component";
import {AuthService} from "../../../services/auth.service";
import {LoginRequest} from "../../../../../core/api-types/auth";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'sp-login-container',
  standalone: true,
  imports: [
    LoginComponent
  ],
  templateUrl: './login-container.component.html',
  styleUrl: './login-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginContainerComponent {
  private readonly authService = inject(AuthService)
  private readonly destroyRef = inject(DestroyRef)

  $isLoading = this.authService.$isLoading

  onLogin(data: LoginRequest) {
    this.authService.login(data).pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe()
  }
}
