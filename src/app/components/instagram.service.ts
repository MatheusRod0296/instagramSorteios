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

  GetPerfil(perfilName:string): Observable<any> {
    
    var url = `https://www.instagram.com/${perfilName}/?__a=1`;
    return this.http.get<any>(url).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  GetPosts(id:string, quantity:number, hash:string): Observable<any> {
 
     var url = `https://www.instagram.com/graphql/query/?query_id=17888483320059182&variables={"id":${id},"first":${quantity},"after":"${hash}"}`;
   
    return this.http.get<any>(url).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  GetComments(shortCode:string, quantity:number, hash:string): Observable<any>{
    var url = `https://www.instagram.com/graphql/query/?query_id=17852405266163336&shortcode=${shortCode}&first=${quantity}&after=${hash}`;
   
    return this.http.get<any>(url).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  errorHandler(e: any): Observable<any> {   
    this.notificationService.ShowError("Ocorreu um erro!");
    return EMPTY;
  }
}
