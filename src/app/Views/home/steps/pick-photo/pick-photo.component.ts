import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { InstagramService } from '../../../../components/instagram.service';
import { NotificationService } from '../../../../components/notification.service';
import { CommentDTO } from '../../../../components/models/commentDTO';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pick-photo',
  templateUrl: './pick-photo.component.html',
  styleUrls: ['./pick-photo.component.css']
})
export class PickPhotoComponent implements OnInit {

  @Input() JsonData: any;

  @Output() CommentDTOEmitter = new EventEmitter<CommentDTO>();

  private subscribe: Subscription;

  imgPerfilUrl = "assets/img/perfilDefault.jpg";
  edges: any[];
  end_cursor = "";
  next_page = false;
  idUser = "";

  constructor(private instagramService: InstagramService,
    private notificationService: NotificationService) { }

  ngOnInit(): void {
    if (this.JsonData == undefined) {
      this.imgPerfilUrl = "assets/img/perfilDefault.jpg";
    }

    this.imgPerfilUrl = this.JsonData.profile_pic_url;
    this.idUser = this.JsonData.id;
    this.LoadingPost();
  }


  LoadingPost() {
    this.subscribe = this.instagramService.getPosts(this.idUser, 50, this.end_cursor)
      .subscribe(data => {
        var user = data.data.user;
        this.end_cursor = user.edge_owner_to_timeline_media.page_info.end_cursor;
        this.next_page = user.edge_owner_to_timeline_media.page_info.has_next_page;
        if (this.edges == undefined) {
          this.edges = user.edge_owner_to_timeline_media.edges;
        } else {
          Array.prototype.push.apply(this.edges, user.edge_owner_to_timeline_media.edges);
        }
      });
  }

  insertSortCodeByLink(link: string){ 
  
    var shortCode = link.match(/(?:\w|-){11}(?=\/)/);
    if(shortCode == null || shortCode.length != 1 || shortCode[0] == null){
      this.notificationService.ShowError("Url invalida!");
    }else{
      this.selectPhoto(shortCode[0]);
    }

  }

  selectPhoto(shortCode: string){ 
    var param = new CommentDTO();
    param.ShortCode = shortCode;
    param.UserName = this.JsonData.username;
    param.ImgUrl = this.JsonData.profile_pic_url

    this.CommentDTOEmitter.emit(param);
  }

  ngOnDestroy(): void {
    this.subscribe.unsubscribe();
  }

}
