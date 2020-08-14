import { Component, OnInit, Input } from '@angular/core';
import { InstagramService } from '../../../../components/instagram.service';
import { CommentDTO } from '../../../../components/models/commentDTO'

@Component({
  selector: 'app-load-comments',
  templateUrl: './load-comments.component.html',
  styleUrls: ['./load-comments.component.css']
})
export class LoadCommentsComponent implements OnInit {
  ImgPicked = "../../../../../assets/img/perfilDefault.jpg";

  end_cursor = "";

  next_page = false;

  totalComments = "";

  edges: any[];

  @Input() CommentDTO: CommentDTO;
  
  constructor(private instagramService: InstagramService) { }

  ngOnInit(): void {   
    this.ImgPicked = this.CommentDTO.ImgUrl;
    this.loadingComments()
  }

  private loadingComments(){

    this.instagramService.GetComments(this.CommentDTO.ShortCode, 50, this.end_cursor)
    .subscribe(data => {
      
      var comments = data.data.shortcode_media.edge_media_to_comment;
      this.end_cursor = comments.page_info.end_cursor;
      this.next_page = comments.page_info.has_next_page;
      this.totalComments = comments.count;

      if (this.edges == undefined) {
        this.edges = comments.edges;
      } else {
        Array.prototype.push.apply(this.edges, comments.edges);      
      }

      if(this.next_page){
        this.loadingComments();
      }

    })
  }


}
