import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  JsonData:any;
  step:number = 1;
  constructor() { }

  ngOnInit(): void {
  }

  receberPerfilEscolhido(data:any){  
    this.JsonData = data;
    this.step =2;
  }

}
