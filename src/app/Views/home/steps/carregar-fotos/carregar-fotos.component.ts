import { Component, OnInit, Input } from '@angular/core';
import { InstagramService } from 'src/app/components/instagram.service';

@Component({
  selector: 'app-carregar-fotos',
  templateUrl: './carregar-fotos.component.html',
  styleUrls: ['./carregar-fotos.component.css']
})
export class CarregarFotosComponent implements OnInit {

  @Input() JsonData: any; 

  imgPerfilUrl = "./../../../../../assets/img/perfilDefault.jpg";
  edges: any[] ;
  end_cursor = "";
  next_page = false;
  idUser= "";
  
  constructor( private instagramService: InstagramService) { }

  ngOnInit(): void {       
    if(this.JsonData == undefined){
      this.imgPerfilUrl= "./../../../../../assets/img/perfilDefault.jpg";
    }

    this.imgPerfilUrl = this.JsonData.profile_pic_url;
    this.idUser = this.JsonData.id;
    this.LoadingPost(); 
  }


  LoadingPost(){
   
    this.instagramService.GetPosts(this.idUser,50, this.end_cursor )
      .subscribe(data => {     
        var user = data.data.user;
        this.end_cursor = user.edge_owner_to_timeline_media.page_info.end_cursor;
        this.next_page = user.edge_owner_to_timeline_media.page_info.has_next_page;
        if(this.edges == undefined){
          this.edges = user.edge_owner_to_timeline_media.edges;
        }else{
         Array.prototype.push.apply(this.edges, user.edge_owner_to_timeline_media.edges);  
        }
       
      });   
  }

}
