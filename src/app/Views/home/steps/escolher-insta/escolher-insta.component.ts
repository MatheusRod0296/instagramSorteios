import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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

      // get value
      map((event: any) => {
        return event.target.value;
      })      
      , debounceTime(1000)      
      , distinctUntilChanged()
      // subscription for response
    ).subscribe((text: string) => this.onKey(text))
   

  }


  onKey(event: any) {
    this.readPerfilSubscribe = this.instagramService.read(event)
      .subscribe(data => {
        this.imgPerfilUrl = data.graphql.user.profile_pic_url;
      })
  }

  ngOnDestroy(): void {
    this.readPerfilSubscribe.unsubscribe();
  }

}
