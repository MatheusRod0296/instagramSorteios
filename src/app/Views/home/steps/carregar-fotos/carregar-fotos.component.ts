import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { InstagramService } from 'src/app/components/instagram.service';
import { NotificationService } from '../../../../components/notification.service';

@Component({
  selector: 'app-carregar-fotos',
  templateUrl: './carregar-fotos.component.html',
  styleUrls: ['./carregar-fotos.component.css']
})
export class CarregarFotosComponent implements OnInit {

  @Input() JsonData: any;

  @Output() ShortCodeEmitter = new EventEmitter<any>();

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

    this.instagramService.GetPosts(this.idUser, 50, this.end_cursor)
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

  InserirSortCodeByLink(link: string){  
   debugger;
    var shortCode = link.match(/(?:\w|-){11}(?=\/)/);
    if(shortCode == null || shortCode.length != 1 || shortCode[0] == null){
      this.notificationService.ShowError("Url invalida!");
    }else{
      this.SelecionarFoto(shortCode[0]);
    }

  }



  SelecionarFoto(shortCode: string){   
    this.ShortCodeEmitter.emit(shortCode);
  }

}
