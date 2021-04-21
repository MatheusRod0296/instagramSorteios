import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
import { map, catchError } from "rxjs/operators";
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class InstagramService {

  constructor(
    private http: HttpClient,
    private notificationService: NotificationService) { }

    authorization(perfilName:string): Observable<any> {
      var url = `https://api.instagram.com/oauth/authorize
      ?client_id=666096230647337
      &redirect_uri=https://drawing-insta.herokuapp.com/
      &scope=user_profile
      &response_type=code`;   

      return this.http.get<any>(url).pipe(
        map((obj) => obj),
        catchError((e) => this.errorHandler(e))
      );
    }

  getPerfil(perfilName:string): Observable<any> {
    
    //var url = `https://www.instagram.com/${perfilName}/?__a=1`;
    var url = `https://api.sorteiogram.com/api/get_user_info.php?username${perfilName}`;
    return this.http.get<any>(url).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  getPhotoByShortCode(shortCode:string): Observable<any> {
    
    var url = `https://www.instagram.com/p/${shortCode}/?__a=1`;   
    return this.http.get<any>(url).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  getPosts(id:string, quantity:number, hash:string): Observable<any> {
 
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
      catchError((e) => this.alertHandler(e, "a api do instagram esta congestionada, aguarde ..."))
    );
  }

  errorHandler(e: any): Observable<any> {   
    this.notificationService.ShowError("Ocorreu um erro");
    return Observable.throw(e);
  }

  alertHandler(e: any, msg: string): Observable<any> {   
    this.notificationService.ShowAlert(msg);
    return Observable.throw(e);
  }
}
