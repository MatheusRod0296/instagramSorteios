import { Component, OnInit } from '@angular/core';
import { CommentDTO } from '../../components/models/commentDTO';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  LoadDataJson:any;
  
  CommentDTO:CommentDTO;

  step:number = 1;
  constructor() { }

  ngOnInit(): void {
  }

  receivePickedPerfil(data:any){  
    this.LoadDataJson = data;
    this.step =2;
  }

  receivePickedPhoto(commentDTO:CommentDTO){
    this.CommentDTO= commentDTO;
    this.step =3;
  }

}
