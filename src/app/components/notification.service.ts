import { Injectable } from '@angular/core';
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar"

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private snackbar: MatSnackBar) { }

  private configSucces: MatSnackBarConfig = {
    panelClass: ['style-succes'],    
  };

  ShowAlert(msg: string):void {
    this.snackbar.open(msg, '', {
      duration:3000,
      horizontalPosition: "right",
      verticalPosition: "bottom",
      panelClass: ['notify-alert']        
      
    })
  }


  ShowSucces(msg: string):void {
    this.snackbar.open(msg, 'X', {
      duration:3000,
      horizontalPosition: "right",
      verticalPosition: "bottom",
      panelClass: ['notify-succes']        
      
    })
  }

  ShowError(msg: string):void {
    this.snackbar.open(msg, '', {
      duration:3000,
      horizontalPosition: "right",
      verticalPosition: "bottom",
      panelClass: ['notify-error']        
      
    })
  }
}
