import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { InstagramService } from '../../../../components/instagram.service';
import { NotificationService } from '../../../../components/notification.service';
import { Subscription, of, Subject, Observable, fromEvent } from 'rxjs';
import { debounceTime, map, distinctUntilChanged } from 'rxjs/operators';



@Component({
  selector: 'app-choose-insta',
  templateUrl: './choose-insta.component.html',
  styleUrls: ['./choose-insta.component.css']
})
export class ChooseInstaComponent implements OnInit {

  imgPerfilUrl = "assets/img/perfilDefault.jpg";
  buttonIsdisabled =true;
  isPerfilPrivate = false;
  jsonData:any;

  @Output() jsonDataEmitter = new EventEmitter<any>(); 

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
    this.readPerfilSubscribe = this.instagramService.authorization(event)
      .subscribe(data => {
       debugger;
       
      });   
    
    this.readPerfilSubscribe = this.instagramService.getPerfil(event)
      .subscribe(data => {
        this.jsonData = data.graphql.user;
        this.imgPerfilUrl = this.jsonData.profile_pic_url;       
        this.isPerfilPrivate = this.jsonData.is_private;
        this.buttonIdDisable();
      });   
      
  }

  choosePerfil(){ 
    this.jsonDataEmitter.emit(this.jsonData);
  }

  buttonIdDisable(){
    if(this.jsonData != undefined && !this.isPerfilPrivate){
      this.buttonIsdisabled = false;
    }
  }

 

 
}
