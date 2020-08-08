import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { InstagramService } from '../../../../components/instagram.service';
import { NotificationService } from '../../../../components/notification.service';
import { Subscription, of, Subject, Observable, fromEvent } from 'rxjs';
import { debounceTime, map, distinctUntilChanged } from 'rxjs/operators';



@Component({
  selector: 'app-escolher-insta',
  templateUrl: './escolher-insta.component.html',
  styleUrls: ['./escolher-insta.component.css']
})
export class EscolherInstaComponent implements OnInit {

  imgPerfilUrl = "./../../../../../assets/img/perfilDefault.jpg";
  buttonIsdisabled =true;
  isPerfilPrivate = false;

  @Output() jsonDataEmitter = new EventEmitter<any>();
  jsonData:any;

  private readPerfilSubscribe: Subscription;

  mySubject = new Subject();

  @ViewChild('movieSearchInput', { static: true }) movieSearchInput: ElementRef;


  public keyUp = new Subject<KeyboardEvent>();

  constructor(
    private instagramService: InstagramService,
    private notificationService: NotificationService) {
  }

  ngOnInit(): void {

    fromEvent(this.movieSearchInput.nativeElement, 'keyup').pipe(      
      map((event: any) => {
        return event.target.value;
      })      
      , debounceTime(1000)      
      , distinctUntilChanged()
     
    ).subscribe((text: string) => this.onKey(text));
   

  }

  ngOnDestroy(): void {
    this.readPerfilSubscribe.unsubscribe();
  }



  onKey(event: any) {
    this.readPerfilSubscribe = this.instagramService.GetPerfil(event)
      .subscribe(data => {
        this.jsonData = data.graphql.user;
        this.imgPerfilUrl = this.jsonData.profile_pic_url;       
        this.isPerfilPrivate = this.jsonData.is_private;
        this.buttonIdDisable();
      });   
      
  }

  EscolherPerfil(){ 
    this.jsonDataEmitter.emit(this.jsonData);
  }

  buttonIdDisable(){
    if(this.jsonData != undefined && !this.isPerfilPrivate){
      this.buttonIsdisabled = false;
    }
  }

 

 
}
