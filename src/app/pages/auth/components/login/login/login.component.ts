import {ChangeDetectionStrategy, Component, input, OnInit, output} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInput } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { AsyncPipe, NgIf } from '@angular/common';
import { LoginRequest } from '../../../../../core/api-types/auth';

@Component({
  selector: 'sp-login',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInput,
    RouterLink,
    ReactiveFormsModule,
    MatStepperModule,
    NgIf,
    AsyncPipe,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  isLoading = input<boolean>();

  login = output<LoginRequest>()

  validationErrors = '';

  public formGroup = new FormBuilder().group({
    email: new FormControl('test@gmail.com', [
      Validators.required,
      Validators.email,
    ]), //adikbarakov123@gmail.com
    password: new FormControl('123456', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  ngOnInit() {
    console.log(this.isLoading);
  }

  onLogin() {
    if (this.formGroup.valid) {
      const data: LoginRequest = {
        email: this.formGroup.value.email as string,
        password: this.formGroup.value.password as string,
      };
      this.login.emit(data)
    } else {
      this.validationErrors = 'Invalid username or password.';
    }
  }
}
