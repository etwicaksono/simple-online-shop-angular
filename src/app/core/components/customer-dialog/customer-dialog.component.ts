import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-customer-dialog',
  templateUrl: './customer-dialog.component.html',
  styleUrl: './customer-dialog.component.css'
})
export class CustomerDialogComponent {
  constructor(public dialogRef: MatDialogRef<CustomerDialogComponent>) { }
  message = ""

  onCloseClick(): void {
    this.dialogRef.close();
  }
}
