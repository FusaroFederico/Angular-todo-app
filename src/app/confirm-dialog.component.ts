import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';

// Componente per la finestra di dialogo di conferma
@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
  template: `
    <h2 mat-dialog-title style="color: pink;">Conferma</h2>
    <mat-dialog-content>
      Sei sicuro di voler eliminare: "{{ data.taskName }}" ?
    </mat-dialog-content>
    <div style="display: flex; justify-content: flex-end; gap: 8px;">
      <button mat-button (click)="onCancel()">Annulla</button>
      <button mat-raised-button color="warn" (click)="onConfirm()">Elimina</button>
    </div>
  `
})
export class ConfirmDialogComponent {
  constructor(private dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { taskName: string }
  ) {}

  onConfirm() {
    this.dialogRef.close(true);
  }

  onCancel() {
    this.dialogRef.close(false);
  }
}