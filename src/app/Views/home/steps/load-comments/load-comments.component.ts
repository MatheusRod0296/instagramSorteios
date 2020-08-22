import { Component, OnInit, Input } from '@angular/core';
import { InstagramService } from '../../../../components/instagram.service';
import { CommentDTO } from '../../../../components/models/commentDTO'
import { Subscription } from 'rxjs';
import { ReversePipe}  from '../../../../components/Pipes/reversePipe'

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

  progress: number = 0;

  buttonIsdisabled = true;

  percentUnit: number = 0;

  private subscribe: Subscription;

  edges: any[];

  winners : any[] ;

  @Input() CommentDTO: CommentDTO;

  constructor(private instagramService: InstagramService) { }

  ngOnInit(): void {
    this.winners =  [];
    this.ImgPicked = this.CommentDTO.ImgUrl;
    this.loadingComments()
  }

  ngOnDestroy(): void {
    this.subscribe.unsubscribe();
  }

  public loadingComments() {
    this.subscribe = this.instagramService.GetComments(this.CommentDTO.ShortCode, 100, this.end_cursor)
      .subscribe(

        data => {

          var comments = data.data.shortcode_media.edge_media_to_comment;
          this.end_cursor = comments.page_info.end_cursor;
          this.next_page = comments.page_info.has_next_page;
          this.totalComments = comments.count;

          if (this.edges == undefined) {
            this.edges = comments.edges;
            this.calculateNumberOfRequests();
            this.addProgress()
          } else {
            Array.prototype.push.apply(this.edges, comments.edges);
            this.addProgress()
          }

          if (this.next_page) {
            this.loadingComments();
          }
        },
        async error => {
         var de = 20000;
          await this.delay(de + 10000);
          this.loadingComments();
        },
        () => {
          // 'onCompleted' callback.
          // No er)
        }
      );

  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private calculateNumberOfRequests() {
    if (+this.totalComments <= 50) {
      this.percentUnit = 100;
    } else {
      this.percentUnit = 5000 / +this.totalComments;
    }
    this.percentUnit = +this.percentUnit.toFixed(2);

  }

  private addProgress() {
   
    this.progress += this.percentUnit;
    if (this.progress > 100 || !this.next_page) {
      this.progress = 100;
    }

    if (this.progress == 100 ) {
      this.buttonIsdisabled = false;
    }

    this.progress = +this.progress.toFixed(0);
  }

  draw(){
    if(this.edges.length <=1){
      this.buttonIsdisabled = true;
    }

    var index = this.generateRandomNumber();

    var edge = this.edges[index]; 
    
    var exist = this.winners.find(element => element.node.id == edge.node.id);

    if(exist != undefined){
      this.draw();
    }else{
      edge.order  = this.winners.length +1
      this.winners.push(edge);
      this.edges.splice(index , 1);
    }


      

  }

  private generateRandomNumber(): number{
    var min = 0;
    var max = this.edges.length ;
    
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }


}
