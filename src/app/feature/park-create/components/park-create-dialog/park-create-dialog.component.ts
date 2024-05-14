import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatFormField, MatInput, MatLabel} from "@angular/material/input";
import {MatButton, MatIconButton} from "@angular/material/button";
import {FormBuilder, FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatIcon} from "@angular/material/icon";
import {AddPark} from "../../../../core/api-types/map";

@Component({
  selector: 'park-create-dialog',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatInput,
    MatFormField,
    MatLabel,
    MatDialogActions,
    MatButton,
    ReactiveFormsModule,
    MatIconButton,
    MatIcon,
    MatDialogClose
  ],
  templateUrl: './park-create-dialog.component.html',
  styleUrl: './park-create-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ParkCreateDialogComponent {
  private readonly dialogRef = inject(MatDialogRef<ParkCreateDialogComponent>)
  public formGroup = new FormBuilder().group({
    name: new FormControl('', [Validators.required]),
    max_places: new FormControl('', [Validators.required]),
    rent_per_hour: new FormControl('', [Validators.required])
  })

  validationErrors = ''

  close() {
    this.dialogRef.close()
  }

  submit() {
    if(this.formGroup.valid) {
      const data: AddPark = {
        name: this.formGroup.value.name as string,
        max_places: Number(this.formGroup.value.max_places),
        rent_per_hour: Number(this.formGroup.value.rent_per_hour)
      }
      this.dialogRef.close(data)
    } else {
      this.validationErrors = 'Data invalid'
    }
  }
}
