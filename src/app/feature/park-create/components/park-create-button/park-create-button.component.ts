import {ChangeDetectionStrategy, Component, DestroyRef, inject, input} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ParkCreateDialogComponent} from "../park-create-dialog/park-create-dialog.component";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {MapsService} from "../../../maps/services/maps.service";
import {AddPark} from "../../../../core/api-types/map";

@Component({
  selector: 'park-create-button',
  standalone: true,
  imports: [
    MatButton
  ],
  templateUrl: './park-create-button.component.html',
  styleUrl: './park-create-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ParkCreateButtonComponent {
  private readonly dialog = inject(MatDialog)
  private readonly destroyRef = inject(DestroyRef)
  private readonly mapsService = inject(MapsService)

  isVisible = input<boolean>()
  isDisabled = input<boolean>()


  openParkCreateDialog() {
    const dialogRef: MatDialogRef<ParkCreateDialogComponent> = this.dialog.open(
      ParkCreateDialogComponent, {
        hasBackdrop: true
      }
    )
    dialogRef.afterClosed().pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe((data: AddPark) => {
      if(data) {
        this.mapsService.addPark(data).pipe(
          takeUntilDestroyed(this.destroyRef)
        ).subscribe()
      }
    })

  }
}
