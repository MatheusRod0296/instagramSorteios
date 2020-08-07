import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
import { map, catchError } from "rxjs/operators";
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class InstagramService {

  constructor(private http: HttpClient,private notificationService: NotificationService) { }

  read(perfilName:string): Observable<any> {
    
    var url = `https://www.instagram.com/${perfilName}/?__a=1`;
    return this.http.get<any>(url).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  errorHandler(e: any): Observable<any> {
    debugger;

    // var r = JSON.parse(e.error.text.split("window._sharedData = ")[1].split(";</script>")[0]).entry_data.ProfilePage[0].graphql;
    
    this.notificationService.ShowError("Ocorreu um erro!");
    return EMPTY;
  }
}