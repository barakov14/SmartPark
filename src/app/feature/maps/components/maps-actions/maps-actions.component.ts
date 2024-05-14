import {ChangeDetectionStrategy, Component, input, output} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {
  ParkCreateButtonComponent
} from "../../../park-create/components/park-create-button/park-create-button.component";
import {NgIf} from "@angular/common";

@Component({
  selector: 'maps-actions',
  standalone: true,
  imports: [
    MatButton,
    ParkCreateButtonComponent,
    NgIf
  ],
  templateUrl: './maps-actions.component.html',
  styleUrl: './maps-actions.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapsActionsComponent {
  findPark = output<void>()
  visibleCreateParkButton = input<boolean>()
  isDisabled = input<boolean>()


  onFindPark() {
    this.findPark.emit()
  }
}
